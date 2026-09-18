import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import xss from "xss";
import {
  sendInquiryNotificationEmail,
  sendInquiryConfirmationEmail,
} from "@/lib/inquiry-email";
import { rateLimit } from "@/lib/rate-limit";   // ← renamed import

// Helper function for proper case
function toProperCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Validation Schema with Security
const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name")
    .transform((val) => xss(val.trim())),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name")
    .transform((val) => xss(val.trim())),

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email is too long")
    .transform((val) => val.toLowerCase().trim()),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .transform((val) => xss(val.trim())),

  service: z
    .string()
    .min(1, "Please select a service")
    .max(100, "Service name is too long")
    .transform((val) => xss(val.trim())),

  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long")
    .transform((val) => xss(val.trim())),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (Spam protection)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { ok, retryAfter } = rateLimit(`contact:${ip}`);
    if (!ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    // 2. Parse body
    const body = await req.json();

    // 3. Validate with Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { firstName, lastName, email, phoneNumber, service, message } =
      validationResult.data;

    // 4. Spam Detection (Prohibited keywords)
    const spamKeywords = [
      "viagra", "casino", "porn", "xxx", "crypto", "bitcoin",
      "lottery", "cheap", "discount", "free", "click here",
      "earn money", "investment", "profit", "rich", "million",
    ];

    const messageLower = message.toLowerCase();
    const fullNameLower = `${firstName} ${lastName}`.toLowerCase();

    const isSpam = spamKeywords.some(
      (keyword) =>
        messageLower.includes(keyword) || fullNameLower.includes(keyword)
    );

    if (isSpam) {
      console.warn(`Spam detected from IP: ${ip}, Email: ${email}`);
      return NextResponse.json(
        { error: "Message contains prohibited content" },
        { status: 400 }
      );
    }

    // 5. Check if email is valid (additional check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // 6. Save to database with proper case (NO LOGIN REQUIRED)
    let inquiry;
    try {
      const properFullName = toProperCase(`${firstName} ${lastName}`);
      const properService = toProperCase(service);

      inquiry = await prisma.inquiry.create({
        data: {
          fullName: properFullName,
          email: email.toLowerCase().trim(),
          phoneNumber: phoneNumber.trim(),
          subject: properService,
          message: message.trim(),
          isResolved: false,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save inquiry. Please try again." },
        { status: 500 }
      );
    }

    // 7. Send emails with error handling
    try {
      await Promise.all([
        sendInquiryNotificationEmail({
          fullName: inquiry.fullName,
          email: inquiry.email,
          phoneNumber: inquiry.phoneNumber || "",
          service: inquiry.subject,
          message: inquiry.message,
          inquiryId: inquiry.id,
        }),
        sendInquiryConfirmationEmail({
          email: inquiry.email,
          fullName: inquiry.fullName,
          service: inquiry.subject,
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    // 8. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll contact you shortly.",
        inquiry: {
          id: inquiry.id,
          fullName: inquiry.fullName,
          email: inquiry.email,
          subject: inquiry.subject,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to send message. Please try again.",
      },
      { status: 500 }
    );
  }
}
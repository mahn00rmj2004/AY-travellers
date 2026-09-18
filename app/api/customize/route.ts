import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import xss from 'xss';
import {
  sendUmrahNotificationEmail,
  sendUmrahConfirmationEmail,
} from "@/lib/umrah-email";
import { rateLimit } from "@/lib/rate-limit";

// Validation Schema with Security
const umrahSchema = z.object({
  dates: z
    .string()
    .min(1, "Travel dates are required")
    .max(120, "Travel dates too long")
    .transform(val => xss(val.trim())),

  transport: z
    .string()
    .min(1, "Transport is required")
    .max(120, "Transport too long")
    .transform(val => xss(val.trim())),

  hotelCity: z.enum(["makkah", "madina"]),

  hotel: z
    .string()
    .min(1, "Hotel is required")
    .max(160, "Hotel name too long")
    .refine(
      val => val !== "Select a Makkah Hotel" && val !== "Select a Madina Hotel",
      "Please select a hotel"
    )
    .transform(val => xss(val.trim())),

  airline: z
    .string()
    .min(1, "Airline is required")
    .max(120, "Airline name too long")
    .transform(val => xss(val.trim())),

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email is too long")
    .transform(val => val.toLowerCase().trim()),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long")
    .transform(val => val.replace(/[\s\-()]/g, ""))
    .refine(val => /^\+?[0-9]{10,15}$/.test(val), "Invalid phone number format")
    .transform(val => xss(val)),

  city: z
    .string()
    .min(1, "City is required")
    .max(80, "City name too long")
    .transform(val => xss(val.trim())),

  // Honeypot — must be empty (bots fill it)
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { ok, retryAfter } = rateLimit(`umrah:${ip}`);
    if (!ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    // 2. Parse body
    const body = await req.json();

    // 3. Validate with Zod
    const validationResult = umrahSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { dates, transport, hotelCity, hotel, airline, email, phone, city, website } =
      validationResult.data;

    // 4. Honeypot — silently succeed, do nothing
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // 5. Spam Detection
    const spamKeywords = [
      'viagra', 'casino', 'porn', 'xxx', 'crypto', 'bitcoin',
      'lottery', 'earn money', 'click here', 'investment',
    ];

    const combined = `${hotel} ${airline} ${city}`.toLowerCase();
    const isSpam = spamKeywords.some(keyword => combined.includes(keyword));

    if (isSpam) {
      console.warn(`Spam detected from IP: ${ip}, Email: ${email}`);
      return NextResponse.json(
        { error: "Request contains prohibited content" },
        { status: 400 }
      );
    }

    // 6. Build structured message for Inquiry model
    const hotelCityLabel = hotelCity === "makkah" ? "Makkah" : "Madinah";
    const formattedMessage = [
      `Travel Dates: ${dates}`,
      `Transport: ${transport}`,
      `Hotel City: ${hotelCityLabel}`,
      `Hotel: ${hotel}`,
      `Airline: ${airline}`,
      `Client City: ${city}`,
    ].join("\n");

    // 7. Save to Inquiry table
    let inquiry;
    try {
      inquiry = await prisma.inquiry.create({
        data: {
          fullName: "Umrah Client",
          email,
          phoneNumber: phone,
          subject: `Umrah Customization — ${hotelCityLabel}`,
          message: formattedMessage,
          isResolved: false,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save request. Please try again." },
        { status: 500 }
      );
    }

    // 8. Send emails
    try {
      await Promise.all([
        sendUmrahNotificationEmail({
          travelDates: dates,
          transport,
          hotelCity: hotelCityLabel,
          hotel,
          airline,
          email,
          phoneNumber: phone,
          city,
          inquiryId: inquiry.id,
        }),
        sendUmrahConfirmationEmail({
          email,
          hotelCity: hotelCityLabel,
          hotel,
          travelDates: dates,
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    // 9. Success response
    return NextResponse.json(
      {
        success: true,
        message: "Umrah request received! We'll contact you shortly.",
        inquiry: {
          id: inquiry.id,
          email: inquiry.email,
          subject: inquiry.subject,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Umrah form error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to submit request. Please try again.",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import xss from 'xss';
import { sendTicketingNotificationEmail } from '@/lib/ticketing-email';
import { rateLimit } from '@/lib/rate-limit';

const ticketingSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(80, 'Name is too long')
    .transform((val) => xss(val.trim())),

  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email is too long')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val ? val.toLowerCase().trim() : undefined)),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .transform((val) => val.replace(/[\s\-()]/g, ''))
    .refine((val) => /^\+?[0-9]{10,15}$/.test(val), 'Invalid phone number format')
    .transform((val) => xss(val)),

  tripType: z.enum(['One Way', 'Return', 'Multi-City']),

  from: z
    .string()
    .min(1, 'Origin is required')
    .max(80, 'Origin is too long')
    .transform((val) => xss(val.trim())),

  to: z
    .string()
    .min(1, 'Destination is required')
    .max(80, 'Destination is too long')
    .transform((val) => xss(val.trim())),

  departure: z
    .string()
    .min(1, 'Departure date is required')
    .transform((val) => val.trim())
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid departure date'),

  returnDate: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val ? val.trim() : undefined))
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid return date'),

  passengers: z
    .string()
    .min(1, 'Passengers is required')
    .max(50, 'Passengers too long')
    .transform((val) => xss(val.trim())),

  classType: z
    .string()
    .min(1, 'Class is required')
    .max(30, 'Class too long')
    .transform((val) => xss(val.trim())),

  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(req: Request) {
  try {
    // 1. Rate limit
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const { ok, retryAfter } = rateLimit(`ticketing:${ip}`);
    if (!ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    // 2. Parse body
    const body = await req.json();

    // 3. Validate
    const result = ticketingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const {
      name,
      email,
      phone,
      tripType,
      from,
      to,
      departure,
      returnDate,
      passengers,
      classType,
      website,
    } = result.data;

    // 4. Honeypot
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // 5. Spam keywords
    const spamKeywords = [
      'viagra', 'casino', 'porn', 'xxx', 'crypto', 'bitcoin',
      'lottery', 'earn money', 'click here', 'investment',
    ];
    const combined = `${name} ${from} ${to}`.toLowerCase();
    if (spamKeywords.some((k) => combined.includes(k))) {
      console.warn(`Spam detected from IP: ${ip}, Email: ${email || 'n/a'}`);
      return NextResponse.json(
        { error: 'Request contains prohibited content' },
        { status: 400 }
      );
    }

    // 6. Save to FlightInquiry
    let inquiry;
    try {
      inquiry = await prisma.flightInquiry.create({
        data: {
          name,
          email: email || null,
          phone,
          tripType,
          from,
          to,
          departure: new Date(departure),
          returnDate: returnDate ? new Date(returnDate) : null,
          passengers,
          classType,
          status: 'PENDING',
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save request. Please try again.' },
        { status: 500 }
      );
    }

    // 7. Send admin email
    try {
      await sendTicketingNotificationEmail({
        fullName: name,
        email: email || undefined,
        phone,
        tripType,
        from,
        to,
        departure: new Date(departure).toLocaleDateString(),
        returnDate: returnDate ? new Date(returnDate).toLocaleDateString() : undefined,
        passengers,
        classType,
        inquiryId: inquiry.id,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    // 8. Success
    return NextResponse.json(
      {
        success: true,
        message: 'Flight request received! We will contact you shortly.',
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          from: inquiry.from,
          to: inquiry.to,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ticketing form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
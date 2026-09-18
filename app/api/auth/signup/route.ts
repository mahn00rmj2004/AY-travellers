import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Regex Patterns
const nameRegex = /^[a-zA-Z\s]+$/; // Alphabets and spaces only
const phoneRegex = /^\+?[0-9]{12,13}$/; 

// 1. Zod Validation Schema
const signUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .regex(nameRegex, 'First name cannot contain numbers or special characters'),

  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .regex(nameRegex, 'Last name cannot contain numbers or special characters'),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address format'),

  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Phone number must be exactly 13 or 14 digits long (containing country code) digits containing only numbers'),

  city: z
    .string()
    .trim()
    .min(1, 'Please select your city'),

  password: z
    .string()
    .min(8, 'Passwords must have at least 8 characters')
    .refine(
      (val) => {
        let categoriesCount = 0;
        if (/[A-Z]/.test(val)) categoriesCount++;
        if (/[a-z]/.test(val)) categoriesCount++;
        if (/[0-9]/.test(val)) categoriesCount++;
        if (/[^A-Za-z0-9]/.test(val)) categoriesCount++;

        return categoriesCount >= 2;
      },
      {
        message:
          'Password must contain at least two of the following: upper case letters, lower case letters, numbers and symbols.',
      }
    ),

  interest: z
    .string()
    .trim()
    .min(1, "Please select what you're interested in"),

  // CHANGE 1: ADDED
  agreedToTerms: z
    .boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
});

export async function POST(req: Request) {
  try {
    // 2. Parse Incoming JSON Payload
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Invalid or missing JSON payload in request body.',
        },
        { status: 400 }
      );
    }

    // 3. Validate Payload Against Schema
    const validationResult = signUpSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation Failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 } // Unprocessable Entity
      );
    }

    // 4. Extract Validated Data
    const { firstName, lastName, email, phoneNumber, city, password, interest } =
      validationResult.data;

    const normalizedEmail = email.toLowerCase();
    const normalizedPhone = phoneNumber.replace(/\s/g, ''); // Remove spaces if any

    // 5. Check if User Already Exists with Email OR Phone Number
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { phoneNumber: normalizedPhone }
        ]
      }
    });

    if (existingUser) {
      // Determine which field caused the conflict
      if (existingUser.email === normalizedEmail) {
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'An account with this email address already exists.',
          },
          { status: 409 } // Conflict
        );
      } else {
        return NextResponse.json(
          {
            error: 'Conflict',
            message: 'An account with this phone number already exists.',
          },
          { status: 409 } // Conflict
        );
      }
    }

    // 6. Hash Password securely before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // 7. Combine First and Last Name for full_name DB Column
    const fullName = `${firstName} ${lastName}`;

    // 8. Save Record into PostgreSQL / MySQL via Prisma
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        phoneNumber: normalizedPhone,
        city,
        interest,
        // ✅ CHANGE 2: ADDED
        agreedToTerms: true,
        agreedAt: new Date(),
      },
      // Exclude passwordHash from response for security
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        city: true,
        interest: true,
        role: true,
        createdAt: true,
        // ✅ CHANGE 2: ADDED (optional)
        agreedToTerms: true,
        agreedAt: true,
      },
    });

    // 9. Return Created User Success Response
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: newUser,
      },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error('Signup Error:', error);

    // Check for Prisma unique constraint errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      
      // P2002 is the Prisma error code for unique constraint violations
      if (prismaError.code === 'P2002') {
        const target = (error as any).meta?.target;
        
        // Determine which unique field caused the error
        if (target?.includes('email')) {
          return NextResponse.json(
            {
              error: 'Conflict',
              message: 'An account with this email address already exists.',
            },
            { status: 409 }
          );
        } else if (target?.includes('phoneNumber')) {
          return NextResponse.json(
            {
              error: 'Conflict',
              message: 'An account with this phone number already exists.',
            },
            { status: 409 }
          );
        }
      }
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while creating your account.',
      },
      { status: 500 }
    );
  }
}
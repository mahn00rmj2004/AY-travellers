import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { signJwtAccessToken } from '@/lib/jwt';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation Failed', details: validationResult.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { email, password } = validationResult.data;
    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Email or password is incorrect' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials', message: 'Email or password is incorrect' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signJwtAccessToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    // Return user data (excluding password)
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Return successful response even if user not found to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists with that email, a reset link has been sent." },
        { status: 200 }
      );
    }

    // 2. Generate secure token & expiration (15 minutes)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 3. Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // 4. Save new token to DB
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt,
      },
    });

    // 5. Construct reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // 6. Send email (Teeno parameters pass kar diye hain: email, name/firstName, resetUrl)
    const userName = (user as any).firstName || (user as any).name || "there";
    await sendPasswordResetEmail(user.email, userName, resetUrl);
    
    console.log("✅ Password reset email sent to:", user.email);

    return NextResponse.json(
      { message: "If an account exists with that email, a reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
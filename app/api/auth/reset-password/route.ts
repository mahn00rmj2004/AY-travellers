import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your prisma instance
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 1. Retrieve valid token record from DB
    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.json(
        { error: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    // 2. Check token expiration
    if (new Date(existingToken.expiresAt) < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // 3. Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // 4. Update user password and invalidate token in an atomic transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: existingToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.delete({
        where: { id: existingToken.id },
      }),
    ]);

    return NextResponse.json(
      { message: "Password updated successfully. You can now log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
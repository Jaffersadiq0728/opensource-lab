import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/argon2";
import { signToken } from "@/lib/auth/jwt";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({ setupRequired: userCount === 0, userCount });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to check setup status" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Step 1: Detect whether User table is empty
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "403 Forbidden: Initial setup has already been completed for this installation." },
        { status: 403 }
      );
    }

    const { fullName, username, email, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // Step 2: Hash password using Argon2id
    const passwordHash = await hashPassword(password);
    const userEmail = email && email.trim() ? email.trim() : `${username}@tyrotech.local`;

    // Step 3: Create first Administrator account
    const adminUser = await prisma.user.create({
      data: {
        email: userEmail,
        username: username.trim(),
        passwordHash,
        role: "ADMIN",
        bio: fullName ? `System Administrator (${fullName})` : "System Administrator",
      },
    });

    // Step 4: Log Audit Action
    await prisma.auditLog.create({
      data: {
        userId: adminUser.id,
        action: "SYSTEM_INITIALIZATION_ADMIN_CREATED",
        metadata: JSON.stringify({ username: adminUser.username, role: "ADMIN" }),
      },
    });

    // Step 5: Issue Session Token & Cookie
    const token = signToken({
      userId: adminUser.id,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        username: adminUser.username,
        role: adminUser.role,
      },
    });

    res.cookies.set("tyrotech_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Setup initialization failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/argon2";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { email, username, password, role } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check existing
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      return NextResponse.json({ error: "User with this email or username already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const userRole = role === "ADMIN" ? "ADMIN" : "STUDENT";

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        role: userRole,
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        xp: user.xp,
        level: user.level,
      },
    });

    res.cookies.set("tyrotech_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Registration failed" }, { status: 500 });
  }
}

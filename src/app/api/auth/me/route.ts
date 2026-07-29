import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function GET() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.userId },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      xp: true,
      level: true,
      streakDays: true,
      bio: true,
      createdAt: true,
    },
  });

  if (!dbUser) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const completedLabsCount = await prisma.userProgress.count({
    where: {
      userId: dbUser.id,
      status: "COMPLETED",
    },
  });

  return NextResponse.json({
    authenticated: true,
    user: {
      ...dbUser,
      completedLabsCount,
    },
  });
}

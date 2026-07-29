import { NextResponse } from "next/server";
import { runSystemDoctor } from "@/lib/installer/doctor";

export async function GET() {
  const checks = runSystemDoctor();
  return NextResponse.json({ checks });
}

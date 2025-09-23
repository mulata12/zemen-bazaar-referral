import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Read role cookie - MUST AWAIT cookies()
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  
  return NextResponse.json({ role: role || null });
}

export async function POST(request: Request) {
  const { role } = await request.json();
  
  // Set role cookie - MUST AWAIT cookies()
  const cookieStore = await cookies();
  cookieStore.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  
  return NextResponse.json({ success: true });
}
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, AppSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp } = await req.json();

    // Call backend login API
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      }
    );

    const backendData = await backendRes.json();

    if (!backendRes.ok || !backendData.success) {
      return NextResponse.json(
        { success: false, message: backendData.message || "Login failed" },
        { status: backendRes.status }
      );
    }

    // Save token + user in iron-session cookie
    const session = await getIronSession<AppSession>(await cookies(), sessionOptions);
    session.token = backendData.token;
    session.user  = backendData.data;
    await session.save();

    return NextResponse.json({ success: true, user: backendData.data });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

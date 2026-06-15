import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, AppSession } from "@/lib/session";

export async function GET() {
  const session = await getIronSession<AppSession>(await cookies(), sessionOptions);

  if (!session.user || !session.token) {
    return NextResponse.json({ success: false, user: null });
  }

  return NextResponse.json({ success: true, user: session.user });
}

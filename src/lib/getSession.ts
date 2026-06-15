import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, AppSession } from "./session";

export async function getSession() {
  const session = await getIronSession<AppSession>(await cookies(), sessionOptions);
  return session;
}

export async function getSessionUser() {
  const session = await getSession();
  return session.user ?? null;
}

export async function getSessionToken() {
  const session = await getSession();
  return session.token ?? null;
}

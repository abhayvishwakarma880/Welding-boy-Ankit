import { SessionOptions } from "iron-session";

export interface SessionUser {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  profilePhoto?: { url: string };
}

export interface AppSession {
  user?: SessionUser;
  token?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "weldingshop-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

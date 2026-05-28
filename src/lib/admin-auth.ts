import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "montalvex_admin_session";
export const ADMIN_COOKIE_PATH = "/admin";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

type AdminAccessState =
  | { ok: true }
  | { ok: false; reason: "missing_config" | "missing_or_invalid_cookie" };

export function isAdminAccessConfigured() {
  return Boolean(getAdminAccessToken());
}

export async function getAdminAccessState(): Promise<AdminAccessState> {
  const token = getAdminAccessToken();

  if (!token) {
    return { ok: false, reason: "missing_config" };
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!session || !safeEqual(session, sessionValueForToken(token))) {
    return { ok: false, reason: "missing_or_invalid_cookie" };
  }

  return { ok: true };
}

export function validateAdminAccessCode(code: string) {
  const token = getAdminAccessToken();

  if (!token) {
    return { ok: false as const, reason: "missing_config" as const };
  }

  if (!safeEqual(code.trim(), token)) {
    return { ok: false as const, reason: "invalid_code" as const };
  }

  return { ok: true as const, token };
}

export async function setAdminAccessCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, sessionValueForToken(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: ADMIN_COOKIE_PATH,
  });
}

export async function clearAdminAccessCookie() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: ADMIN_COOKIE_PATH,
  });
}

function getAdminAccessToken() {
  const value = process.env.ADMIN_ACCESS_TOKEN?.trim();
  return value ? value : null;
}

function sessionValueForToken(token: string) {
  return `v1.${createHash("sha256").update(token).digest("hex")}`;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

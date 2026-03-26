import { cookies } from "next/headers";
import { getDb } from "./db";
import crypto from "crypto";

const SESSION_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function ensureAdminExists() {
  const db = getDb();
  const envPassword = process.env.ADMIN_PASSWORD || "admin1234";
  const envHash = hashPassword(envPassword);

  const existing = db
    .prepare("SELECT password_hash FROM admin_users WHERE username = 'admin'")
    .get() as { password_hash: string } | undefined;

  if (!existing) {
    db.prepare(
      "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)"
    ).run("admin", envHash);
  } else if (existing.password_hash !== envHash) {
    db.prepare(
      "UPDATE admin_users SET password_hash = ? WHERE username = 'admin'"
    ).run(envHash);
  }
}

export function authenticateAdmin(
  username: string,
  password: string
): boolean {
  const db = getDb();
  ensureAdminExists();
  const user = db
    .prepare("SELECT password_hash FROM admin_users WHERE username = ?")
    .get(username) as { password_hash: string } | undefined;

  if (!user) return false;
  return verifyPassword(password, user.password_hash);
}

export async function setAdminSession() {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();

  const db = getDb();
  db.prepare("DELETE FROM admin_sessions WHERE expires_at < datetime('now')").run();
  db.prepare("INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)").run(
    token,
    expiresAt
  );

  const jar = await cookies();
  jar.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  return token;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_NAME)?.value;
  if (!token) return false;

  const db = getDb();
  const session = db
    .prepare(
      "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
    )
    .get(token) as { token: string } | undefined;

  if (!session) return false;
  return true;
}

export async function clearAdminSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_NAME)?.value;
  if (token) {
    const db = getDb();
    db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
  }
  jar.delete(SESSION_NAME);
}

import { cookies } from "next/headers";
import { getDb } from "./db";
import crypto from "crypto";

const SESSION_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

// Infomaniak OIDC endpoints
const IK_AUTHORIZE = "https://login.infomaniak.com/authorize";
const IK_TOKEN = "https://login.infomaniak.com/token";
const IK_USERINFO = "https://login.infomaniak.com/oauth2/userinfo";

export function getOAuthConfig() {
  const clientId = process.env.INFOMANIAK_CLIENT_ID;
  const clientSecret = process.env.INFOMANIAK_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://1par1000.ch";

  if (!clientId || !clientSecret) {
    throw new Error("Missing INFOMANIAK_CLIENT_ID or INFOMANIAK_CLIENT_SECRET");
  }

  return {
    clientId,
    clientSecret,
    redirectUri: `${baseUrl}/api/admin/callback`,
    authorizeUrl: IK_AUTHORIZE,
    tokenUrl: IK_TOKEN,
    userinfoUrl: IK_USERINFO,
  };
}

export function buildAuthorizeUrl(): string {
  const config = getOAuthConfig();
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: "openid profile email",
    state,
  });

  // Store state for CSRF verification
  const db = getDb();
  db.prepare(
    "INSERT INTO oauth_states (state, expires_at) VALUES (?, datetime('now', '+10 minutes'))"
  ).run(state);

  return `${config.authorizeUrl}?${params.toString()}`;
}

export function verifyOAuthState(state: string): boolean {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT state FROM oauth_states WHERE state = ? AND expires_at > datetime('now')"
    )
    .get(state) as { state: string } | undefined;

  if (row) {
    db.prepare("DELETE FROM oauth_states WHERE state = ?").run(state);
    return true;
  }
  return false;
}

export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string }> {
  const config = getOAuthConfig();

  const res = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function fetchUserInfo(
  accessToken: string
): Promise<{ email: string; name: string }> {
  const config = getOAuthConfig();

  const res = await fetch(config.userinfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Userinfo failed: ${res.status}`);
  }

  const data = await res.json();
  return {
    email: data.email || "",
    name: data.name || data.given_name || "",
  };
}

export async function setAdminSession(email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();

  const db = getDb();
  db.prepare(
    "DELETE FROM admin_sessions WHERE expires_at < datetime('now')"
  ).run();
  db.prepare(
    "INSERT INTO admin_sessions (token, email, expires_at) VALUES (?, ?, ?)"
  ).run(token, email, expiresAt);

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

  return !!session;
}

export async function getSessionEmail(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_NAME)?.value;
  if (!token) return null;

  const db = getDb();
  const session = db
    .prepare(
      "SELECT email FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
    )
    .get(token) as { email: string } | undefined;

  return session?.email ?? null;
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

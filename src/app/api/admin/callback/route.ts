import { NextRequest, NextResponse } from "next/server";
import {
  verifyOAuthState,
  exchangeCodeForToken,
  fetchUserInfo,
  setAdminSession,
} from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://1par1000.ch";

  if (error) {
    console.error("OAuth error from Infomaniak:", error);
    return NextResponse.redirect(`${baseUrl}/admin?error=access_denied`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${baseUrl}/admin?error=missing_params`);
  }

  if (!verifyOAuthState(state)) {
    return NextResponse.redirect(`${baseUrl}/admin?error=invalid_state`);
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    const userInfo = await fetchUserInfo(tokenData.access_token);

    // Restrict access to allowed admin emails
    const allowedEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (
      allowedEmails.length > 0 &&
      !allowedEmails.includes(userInfo.email.toLowerCase())
    ) {
      return NextResponse.redirect(`${baseUrl}/admin?error=not_authorized`);
    }

    await setAdminSession(userInfo.email);

    return NextResponse.redirect(`${baseUrl}/admin/dashboard`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(`${baseUrl}/admin?error=auth_failed`);
  }
}

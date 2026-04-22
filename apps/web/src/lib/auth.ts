import { NextResponse } from "next/server";

import { demoUser } from "./demo-store";

export async function getAppSession() {
  return {
    user: demoUser,
    expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  };
}

export async function authHandler() {
  return NextResponse.json({
    ok: true,
    providers: ["google", "magic-link"],
  });
}

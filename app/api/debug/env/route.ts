import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";

// TEMPORARY diagnostic route — reports env var presence/shape only, never values.
// Delete once the "fetch failed" issue against Supabase is root-caused.
export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  function shape(name: string) {
    const v = process.env[name];
    return {
      present: v !== undefined,
      length: v?.length ?? 0,
      startsWithHttps: name.includes("URL") ? v?.startsWith("https://") ?? false : undefined,
      hasWhitespace: v ? /^\s|\s$|\n/.test(v) : false,
    };
  }

  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: shape("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: shape("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: shape("SUPABASE_SERVICE_ROLE_KEY"),
    ADMIN_PASSWORD: shape("ADMIN_PASSWORD"),
    VERCEL_ENV: process.env.VERCEL_ENV ?? null,
  });
}

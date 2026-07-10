import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Server-only client — uses the service role key to bypass RLS.
// Never import this from a "use client" component or expose serviceRoleKey to the browser.
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceRoleKey || "placeholder"
);

export const isSupabaseAdminConfigured = supabaseUrl.startsWith("https://") && serviceRoleKey.length > 0;

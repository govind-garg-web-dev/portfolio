import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Fallback to placeholder values so the app renders even if env vars aren't set
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-key"
);

export const supabaseConfigured = !!(url && key);

export type AuthUser = Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"];

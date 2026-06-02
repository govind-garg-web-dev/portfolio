import { supabase } from "./supabase";
import { DEFAULT_DATA, type SiteData } from "../store";

const TABLE = "site_data";
const ROW_ID = 1;

/** Load site data from Supabase. Falls back to localStorage then defaults. */
export async function loadFromSupabase(): Promise<SiteData> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ROW_ID)
      .single();

    if (!error && data?.data) {
      // Merge with defaults so any new fields are always present
      const merged = deepMerge(DEFAULT_DATA, data.data) as SiteData;
      // Cache locally for instant next load
      localStorage.setItem("portfolio_data", JSON.stringify(merged));
      return merged;
    }
  } catch {}

  // Fallback: cached localStorage copy
  try {
    const raw = localStorage.getItem("portfolio_data");
    if (raw) return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {}

  return DEFAULT_DATA;
}

/** Save site data to Supabase (requires authenticated session). */
export async function saveToSupabase(siteData: SiteData): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: siteData, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);

  // Also keep localStorage in sync as cache
  localStorage.setItem("portfolio_data", JSON.stringify(siteData));
}

// Simple deep merge — new keys from source win, arrays from source replace entirely
function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(source)) return source;
  if (typeof source === "object" && source !== null && typeof target === "object" && target !== null) {
    const result = { ...(target as Record<string, unknown>) };
    for (const key of Object.keys(source as Record<string, unknown>)) {
      result[key] = deepMerge(
        (target as Record<string, unknown>)[key],
        (source as Record<string, unknown>)[key]
      );
    }
    return result;
  }
  return source ?? target;
}

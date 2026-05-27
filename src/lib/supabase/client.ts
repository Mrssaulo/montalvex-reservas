"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let browserClient: SupabaseClient<Database> | null = null;

function requiredPublicEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient<Database>(
      requiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    );
  }

  return browserClient;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let serverClient: SupabaseClient<Database> | null = null;

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseServerClient() {
  if (!serverClient) {
    serverClient = createClient<Database>(
      requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  return serverClient;
}

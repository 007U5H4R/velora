// Env-gated Supabase client. This is the ONLY place the client is constructed.
//
// When VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are absent (the default,
// committed state — see app/.env.example), `supabase` is `null` and
// `isSupabaseConfigured` is `false`. Nothing downstream touches the network;
// the app runs entirely on the mock seed in `state/store.ts`.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anon);
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anon!)
  : null;

# Velora — Supabase setup (optional)

Velora ships as a fully working demo on **built-in mock data** — no Supabase
project is required to run it. Supabase is an additive, dormant overlay: if
you don't do anything below, the app behaves exactly as it does today.

If you want the app backed by a real Supabase Postgres project instead of
the mock data, do this once:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is enough).

2. **Run the schema.** Open your project's SQL Editor (Project → SQL Editor
   → New query), paste the full contents of `supabase/schema.sql`, and run
   it. This creates 7 tables (`vendors`, `brands`, `rfps`, `bids`,
   `matches`, `chat_threads`, `chat_messages`) with public-read RLS
   policies enabled.

3. **Set your keys.** Copy the example env file and fill it in from your
   project's Settings → API page:
   ```bash
   cp app/.env.example app/.env.local
   ```
   Edit `app/.env.local`:
   - `VITE_SUPABASE_URL` — Project URL
   - `VITE_SUPABASE_ANON_KEY` — anon/public key (safe for the browser bundle)
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role key (**secret** — used only
     by the seed script below, never sent to the browser)

   `app/.env.local` is gitignored — never commit it with real values in it.

4. **Load the mock data into Supabase** (idempotent — safe to re-run):
   ```bash
   npx tsx supabase/seed.ts
   ```
   This reuses the exact same data the app already ships with
   (`app/src/data/*.ts`) and upserts it into your tables via the
   service-role key. It prints a row count per table when done. Requires
   Node ≥ 20.6 (uses `process.loadEnvFile`); this repo was built on Node
   24.

5. **Run the app:**
   ```bash
   cd app && npm run dev
   ```
   With `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` present, the app
   still renders instantly on mock data, then swaps to your live Supabase
   data in the background once the fetch resolves (see
   `src/data/remote.ts` → `hydrateFromSupabase()`, called once from
   `App.tsx`). If the fetch fails for any reason (wrong keys, schema not
   run yet, network), it logs a console warning and silently stays on
   mock data — the demo can't break.

   With `app/.env.local` blank or absent (the default), Supabase is never
   contacted at all — `isSupabaseConfigured` is `false` and the app is
   100% the mock demo.

## Scope notes (by design, for this MVP)

- **No auth, no realtime.** RLS is public-read only; the anon key can
  `select` from every table and nothing else. All writes (the swipe /
  bid / RFP flows) stay client-side in the Zustand store, same as the
  mock — nothing the app does at runtime writes back to Supabase. Only
  the seed script writes, using the service-role key.
- **`inboundLikes` (the "Liked you" row) isn't in the schema.** It has no
  dedicated table and hydration doesn't touch it — it always stays on
  its mock values, configured or not.
- **The live path was built but not run against a real project** — there
  was no Supabase project available while building this. It compiles,
  is fully typed, and is exercised by a fallback test, but the actual
  fetch → hydrate → render sequence against a live database is
  unverified. Steps 1–4 above are exactly what's needed to validate it;
  worth a manual look-check afterward (Role Select → both decks → the
  swipe → match → bid loop) to confirm the live data renders as
  expected.

// Velora MVP — Supabase seed script.
//
// Idempotently upserts the app's existing mock data (app/src/data/*.ts —
// nothing is hand-duplicated here) into a Supabase project via the
// PostgREST REST API, using the service-role key so RLS is bypassed for
// the write.
//
// Deliberately has ZERO npm dependencies of its own (just Node's global
// `fetch` + built-ins): this file lives at the repo root in `supabase/`,
// a sibling of `app/`, not a descendant — so a bare `import
// '@supabase/supabase-js'` here could not resolve to app/node_modules
// (Node's module resolution only walks UP a file's own ancestor
// directories, and `app/` is not an ancestor of `supabase/`). Using
// PostgREST's REST endpoints directly sidesteps that entirely and keeps
// this script runnable with nothing beyond Node itself.
//
// Run (from the repo root), after creating a Supabase project and running
// schema.sql, and after filling app/.env.local (see SUPABASE.md):
//   npx tsx supabase/seed.ts
//
// Requires Node >= 20.6 (uses process.loadEnvFile). Reads
// VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from the environment, or
// from app/.env.local if present. Safe to re-run — every write is an
// upsert keyed on `id`.

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { brands } from '../app/src/data/brands';
import { vendors } from '../app/src/data/vendors';
import { brandRfps, rfpHoodies, rfpJoggers, rfpOvershirts } from '../app/src/data/rfps';
import { bids } from '../app/src/data/bids';
import { matches } from '../app/src/data/matches';
import { chat } from '../app/src/data/chat';
import type { Brand, Vendor, Rfp, Bid, Match, ChatThread } from '../app/src/state/types';

// ---------------------------------------------------------------- env --
const __dirname = dirname(fileURLToPath(import.meta.url));
const envLocalPath = resolve(__dirname, '../app/.env.local');
if (existsSync(envLocalPath)) {
  process.loadEnvFile(envLocalPath);
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing VITE_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Fill app/.env.local (copy from app/.env.example) — see SUPABASE.md — then re-run.'
  );
  process.exit(1);
}

// ------------------------------------------------------------- upsert --
async function upsert(table: string, rows: Record<string, unknown>[]): Promise<number> {
  if (rows.length === 0) return 0;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Upsert into "${table}" failed: ${res.status} ${res.statusText} ${body}`);
  }
  return rows.length;
}

// ------------------------------------------------------ camel -> snake --
// Every mapper below just renames/regroups fields already defined once in
// app/src/data/*.ts — no literal values are re-typed by hand.

const brandRow = (b: Brand) => ({
  id: b.id, name: b.name, tagline: b.tagline, location: b.location,
  trust_score: b.trustScore, on_time_pct: b.onTimePct, terms: b.terms, avatar: b.avatar,
});

const vendorRow = (v: Vendor) => ({
  id: v.id, name: v.name, category: v.category, location: v.location,
  trust_score: v.trustScore, on_time_pct: v.onTimePct, moq: v.moq, lead_days: v.leadDays,
  certs: v.certs, avatar: v.avatar, verified: v.verified,
  identity: v.identity, capability: v.capability, reputation: v.reputation, continuous: v.continuous,
});

const rfpRow = (r: Rfp) => ({
  id: r.id, brand_id: r.brandId, title: r.title, category: r.category, units: r.units,
  budget_min: r.budgetMin, budget_max: r.budgetMax, ship_by: r.shipBy,
  requirements: r.requirements, status: r.status, bid_ids: r.bidIds,
});

const bidRow = (b: Bid) => ({
  id: b.id, rfp_id: b.rfpId, vendor_id: b.vendorId, price_per_unit: b.pricePerUnit,
  moq: b.moq, lead_days: b.leadDays, sample: b.sample, note: b.note, total: b.total, status: b.status,
});

const matchRow = (m: Match) => ({
  id: m.id, with_id: m.withId, kind: m.kind, status: m.status, when: m.when,
});

const threadRow = (t: ChatThread) => ({ id: t.id, with_id: t.withId });

const messageRows = (t: ChatThread) =>
  t.messages.map((m) => ({
    id: m.id, thread_id: t.id, from: m.from, text: m.text, time: m.time,
    bid_card: m.bidCard ?? null,
  }));

// ------------------------------------------------------------- main() --
async function main() {
  // rfps: Noor's own 3 (brandRfps) + the 3 authored other-brand RFPs.
  // Combined here (references, not re-typed values) since app/src/data
  // has no single "all rfps" export — brandRfps/rfpDeck are deliberately
  // different curated subsets for the demo, not the full table.
  const allRfps: Rfp[] = [...brandRfps, rfpHoodies, rfpJoggers, rfpOvershirts];
  const threads = Object.values(chat);

  const counts = {
    brands: await upsert('brands', brands.map(brandRow)),
    vendors: await upsert('vendors', vendors.map(vendorRow)),
    rfps: await upsert('rfps', allRfps.map(rfpRow)),
    bids: await upsert('bids', bids.map(bidRow)),
    matches: await upsert('matches', matches.map(matchRow)),
    chat_threads: await upsert('chat_threads', threads.map(threadRow)),
    chat_messages: await upsert('chat_messages', threads.flatMap(messageRows)),
  };

  console.log('Seed complete (upserted):');
  for (const [table, count] of Object.entries(counts)) {
    console.log(`  ${table.padEnd(14)} ${count}`);
  }
}

main().catch((err: unknown) => {
  console.error('Seed failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});

// Supabase-backed fetchers + row -> app-type mappers, and the single
// hydration entry point that swaps the mock seed for live data.
//
// Every fetcher here is only ever called from hydrateFromSupabase(),
// which itself no-ops unless `isSupabaseConfigured` — so none of this
// touches the network in the default (no-keys) demo.

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { appStore } from '../state/store';
import type { Vendor, Brand, Rfp, Bid, Match, ChatThread, ChatMsg } from '../state/types';

function client() {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase;
}

// ---------------------------------------------------------- row shapes --
// snake_case, as stored in Postgres (see supabase/schema.sql).
interface VendorRow {
  id: string; name: string; category: string; location: string;
  trust_score: number; on_time_pct: number; moq: number; lead_days: number;
  certs: string[]; avatar: string; verified: boolean;
  identity: Vendor['identity']; capability: Vendor['capability'];
  reputation: Vendor['reputation']; continuous: Vendor['continuous'];
}
interface BrandRow {
  id: string; name: string; tagline: string; location: string;
  trust_score: number; on_time_pct: number; terms: string; avatar: string;
}
interface RfpRow {
  id: string; brand_id: string; title: string; category: string; units: number;
  budget_min: number; budget_max: number; ship_by: string;
  requirements: string[]; status: Rfp['status']; bid_ids: string[];
}
interface BidRow {
  id: string; rfp_id: string; vendor_id: string; price_per_unit: number;
  moq: number; lead_days: number; sample: Bid['sample']; note: string;
  total: number; status: Bid['status'];
}
interface MatchRow {
  id: string; with_id: string; kind: Match['kind']; status: Match['status']; when: string;
}
interface ChatThreadRow { id: string; with_id: string }
interface ChatMessageRow {
  id: string; thread_id: string; from: ChatMsg['from']; text: string; time: string;
  bid_card: ChatMsg['bidCard'] | null;
}

// ---------------------------------------------------- row -> app types --
const toVendor = (r: VendorRow): Vendor => ({
  id: r.id, name: r.name, category: r.category, location: r.location,
  trustScore: r.trust_score, onTimePct: r.on_time_pct, moq: r.moq, leadDays: r.lead_days,
  certs: r.certs, avatar: r.avatar, verified: r.verified,
  identity: r.identity, capability: r.capability, reputation: r.reputation, continuous: r.continuous,
});
const toBrand = (r: BrandRow): Brand => ({
  id: r.id, name: r.name, tagline: r.tagline, location: r.location,
  trustScore: r.trust_score, onTimePct: r.on_time_pct, terms: r.terms, avatar: r.avatar,
});
const toRfp = (r: RfpRow): Rfp => ({
  id: r.id, brandId: r.brand_id, title: r.title, category: r.category, units: r.units,
  budgetMin: r.budget_min, budgetMax: r.budget_max, shipBy: r.ship_by,
  requirements: r.requirements ?? [], status: r.status, bidIds: r.bid_ids ?? [],
});
const toBid = (r: BidRow): Bid => ({
  id: r.id, rfpId: r.rfp_id, vendorId: r.vendor_id, pricePerUnit: r.price_per_unit,
  moq: r.moq, leadDays: r.lead_days, sample: r.sample, note: r.note, total: r.total, status: r.status,
});
const toMatch = (r: MatchRow): Match => ({
  id: r.id, withId: r.with_id, kind: r.kind, status: r.status, when: r.when,
});

// -------------------------------------------------------------- fetchers --
export async function fetchVendors(): Promise<Vendor[]> {
  const { data, error } = await client().from('vendors').select('*');
  if (error) throw error;
  return ((data ?? []) as VendorRow[]).map(toVendor);
}

export async function fetchBrands(): Promise<Brand[]> {
  const { data, error } = await client().from('brands').select('*');
  if (error) throw error;
  return ((data ?? []) as BrandRow[]).map(toBrand);
}

export async function fetchRfps(): Promise<Rfp[]> {
  const { data, error } = await client().from('rfps').select('*');
  if (error) throw error;
  return ((data ?? []) as RfpRow[]).map(toRfp);
}

export async function fetchBids(): Promise<Bid[]> {
  const { data, error } = await client().from('bids').select('*');
  if (error) throw error;
  return ((data ?? []) as BidRow[]).map(toBid);
}

export async function fetchMatches(): Promise<Match[]> {
  const { data, error } = await client().from('matches').select('*');
  if (error) throw error;
  return ((data ?? []) as MatchRow[]).map(toMatch);
}

export async function fetchChat(): Promise<Record<string, ChatThread>> {
  const c = client();
  const [threadRes, msgRes] = await Promise.all([
    c.from('chat_threads').select('*'),
    c.from('chat_messages').select('*').order('id', { ascending: true }),
  ]);
  if (threadRes.error) throw threadRes.error;
  if (msgRes.error) throw msgRes.error;

  const messagesByThread = new Map<string, ChatMsg[]>();
  for (const m of (msgRes.data ?? []) as ChatMessageRow[]) {
    const msg: ChatMsg = {
      id: m.id, from: m.from, text: m.text, time: m.time,
      ...(m.bid_card ? { bidCard: m.bid_card } : {}),
    };
    const list = messagesByThread.get(m.thread_id) ?? [];
    list.push(msg);
    messagesByThread.set(m.thread_id, list);
  }

  const chat: Record<string, ChatThread> = {};
  for (const t of (threadRes.data ?? []) as ChatThreadRow[]) {
    // Keyed by withId (the counterparty's id), matching app/src/data/chat.ts's
    // convention — screens look up threads as `chat[vendorId]`.
    chat[t.with_id] = { id: t.id, withId: t.with_id, messages: messagesByThread.get(t.id) ?? [] };
  }
  return chat;
}

// ------------------------------------------------------------- hydration --
// This demo has one fixed brand persona (Noor & Co., seeded as 'b-noor').
// Mirrors app/src/data/rfps.ts's brandRfps filter, so the live-data
// "brand's own RFPs" slice matches what the mock encodes by hand.
const CURRENT_BRAND_ID = 'b-noor';

export async function hydrateFromSupabase(): Promise<void> {
  if (!isSupabaseConfigured) return; // No keys -> stay on the mock seed. No-op.

  try {
    const [vendors, brands, rfps, bids, matches, chat] = await Promise.all([
      fetchVendors(), fetchBrands(), fetchRfps(), fetchBids(), fetchMatches(), fetchChat(),
    ]);
    // fetchBrands() has no matching AppState slice (the store holds no
    // `brands` field — screens read app/src/data/brands.ts directly);
    // it's still fetched here so a broken brands table fails the whole
    // Promise.all fast rather than leaving a half-hydrated store.
    void brands;

    appStore.setState({
      vendorDeck: vendors, vendorIndex: 0,
      rfpDeck: rfps, rfpIndex: 0,
      rfps: rfps.filter((r) => r.brandId === CURRENT_BRAND_ID),
      bids, matches, chat,
    });
  } catch (err) {
    // Any failure (network, missing tables, bad keys, RLS) -> stay on the
    // mock seed. The demo must never break because Supabase is unreachable
    // or misconfigured.
    console.warn('[supabase] hydration failed — staying on mock data:', err);
  }
}

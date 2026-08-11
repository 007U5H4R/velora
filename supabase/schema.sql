-- Velora MVP — Supabase schema
--
-- Run this ONCE in the Supabase SQL editor for a fresh project:
--   Project -> SQL Editor -> New query -> paste this whole file -> Run.
--
-- Derived 1:1 from app/src/state/types.ts. Demo/portfolio scope: no auth,
-- no realtime, no migrations framework. RLS is public-read only — the app
-- never writes to Supabase directly (all mutation stays client-side in the
-- Zustand store for the demo); writes happen only via supabase/seed.ts
-- using the service-role key, which bypasses RLS.
--
-- Table order respects FK dependencies: brands, vendors (no deps) ->
-- rfps (-> brands) -> bids (-> rfps, vendors) -> matches, chat_threads
-- (no deps) -> chat_messages (-> chat_threads).

-- ============================================================== brands --
create table brands (
  id          text primary key,
  name        text not null,
  tagline     text,
  location    text,
  trust_score integer,
  on_time_pct integer,
  terms       text,
  avatar      text
);

alter table brands enable row level security;
create policy "public read" on brands for select using (true);

-- ============================================================= vendors --
create table vendors (
  id          text primary key,
  name        text not null,
  category    text,
  location    text,
  trust_score integer,
  on_time_pct integer,
  moq         integer,
  lead_days   integer,
  certs       text[],
  avatar      text,
  verified    boolean,
  -- Vendor.identity/capability/reputation/continuous — the 4 trust pillars.
  identity    jsonb,
  capability  jsonb,
  reputation  jsonb,
  continuous  jsonb
);

alter table vendors enable row level security;
create policy "public read" on vendors for select using (true);

-- ================================================================ rfps --
create table rfps (
  id           text primary key,
  brand_id     text references brands (id),
  title        text,
  category     text,
  units        integer,
  budget_min   numeric,
  budget_max   numeric,
  -- Kept as text (not date): drafts can carry an empty ship-by string.
  ship_by      text,
  requirements text[],
  status       text check (status in ('live', 'draft', 'closed')),
  -- Denormalized convenience copy of Rfp.bidIds; bids.rfp_id is the
  -- normalized source of truth.
  bid_ids      text[]
);

alter table rfps enable row level security;
create policy "public read" on rfps for select using (true);

-- ================================================================ bids --
create table bids (
  id              text primary key,
  rfp_id          text references rfps (id),
  vendor_id       text references vendors (id),
  price_per_unit  numeric,
  moq             integer,
  lead_days       integer,
  sample          text check (sample in ('free', 'paid', 'none')),
  note            text,
  total           numeric,
  status          text check (status in ('sent', 'accepted'))
);

alter table bids enable row level security;
create policy "public read" on bids for select using (true);

-- ============================================================= matches --
-- with_id is a polymorphic reference (a vendor id or a brand id, per
-- `kind`) so it is intentionally NOT a foreign key.
create table matches (
  id      text primary key,
  with_id text,
  kind    text check (kind in ('vendor', 'brand')),
  status  text check (status in ('submit_bid', 'bid_received', 'messaged')),
  -- "when" is a reserved SQL keyword (CASE ... WHEN) — must stay quoted.
  "when"  text
);

alter table matches enable row level security;
create policy "public read" on matches for select using (true);

-- ======================================================== chat_threads --
-- with_id is polymorphic (see matches) — not a foreign key.
create table chat_threads (
  id      text primary key,
  with_id text
);

alter table chat_threads enable row level security;
create policy "public read" on chat_threads for select using (true);

-- ======================================================= chat_messages --
create table chat_messages (
  id        text primary key,
  thread_id text references chat_threads (id),
  -- "from" is a reserved SQL keyword (SELECT ... FROM) — must stay quoted.
  "from"    text check ("from" in ('me', 'them')),
  text      text,
  time      text,
  -- ChatMsg.bidCard? -> jsonb null (only present on bid-share messages).
  bid_card  jsonb
);

alter table chat_messages enable row level security;
create policy "public read" on chat_messages for select using (true);

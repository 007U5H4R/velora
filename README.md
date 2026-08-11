# Velora

> **A trusted ecosystem where every supply-chain relationship carries value, credibility, and confidence.**

Velora is a trust-first **B2B apparel sourcing marketplace** — a mobile-first web app where fashion **brands** and garment **manufacturers** discover each other, match, and negotiate deals through a fast, swipe-driven flow. Every profile carries a **portable trust score**, so credibility travels with you into every new relationship.

---

## The idea

Sourcing apparel manufacturing is slow, opaque, and gated by who you already know. Velora reframes it as a two-sided discovery marketplace with trust at its core:

- **Brands** swipe through verified factories that fit their values, capacity, and certifications.
- **Manufacturers** swipe through live RFPs from brands looking for exactly what they make.
- A **match** opens the door to chat and structured bidding.
- **Trust scores** — built from *Identity, Capability, Reputation,* and *Continuous* signals — make credibility legible and portable across the network.

## Highlights

- 🤝 **Swipe → Match → Bid** — the full two-sided loop, closing end-to-end.
- 🔁 **Dual role** — flip between Brand and Manufacturer and the whole app re-orients: deck, navigation, and persona.
- 🛡️ **Portable trust** — a signature trust gauge on every card, plus a detailed Trust Profile (four pillars + certifications).
- 📝 **RFPs & structured bids** — brands post RFPs; manufacturers bid with price, MOQ, lead time, and sample terms.
- 💬 **In-app chat** with inline bid cards.
- 🎨 **Distinct craft aesthetic** — dark neumorphism with Kalighat *pat-chitra* folk-art avatars and an Indian sourcing context (₹, lakh-grouped numbers).
- 📱 **Phone-framed, responsive, and motion-rich** — swipe physics, an animated trust gauge, a match celebration, and page transitions, all reduced-motion aware.

## Screens

Role Select · Discover (Brand & Manufacturer decks) · Trust Profile · It's a Match · Matches · RFPs · Create RFP · Submit Bid · Bids Received · Chat · Profile — **12 in all.**

## Tech stack

| Layer | Choice |
|---|---|
| UI | **React 19** + **TypeScript** |
| Build | **Vite** |
| Routing | **React Router 7** (data router) |
| State | **Zustand 5** — the swipe / match / bid loop |
| Motion | **Framer Motion** — swipe deck, gauge, match, transitions |
| Styling | **CSS Modules** + a custom-property design-token system |
| Tests | **Vitest** |
| Backend | **Supabase** *(optional, pluggable — mock fallback keeps the demo running without keys)* |

## Getting started

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build
npm run test     # unit tests (Vitest)
```

The app runs on built-in **mock data** out of the box — no backend or keys required.

## Supabase (optional)

Velora ships a **pluggable data layer**: with no keys it runs on mock seed data; add a Supabase project and it hydrates from your database instead — the demo never breaks either way. See **[SUPABASE.md](./SUPABASE.md)** for the five-step setup (create project → run `supabase/schema.sql` → fill `app/.env.local` → seed → run).

## Project structure

```
Velora/
├── app/                    # the React app (Vite)
│   └── src/
│       ├── screens/        # the 12 screens
│       ├── components/     # design-system parts (Gauge, SwipeDeck, TrustCard, …)
│       ├── state/          # Zustand store + domain types
│       ├── data/           # mock seed data + Supabase fetchers
│       ├── lib/            # env-gated Supabase client
│       └── motion/         # page transitions
├── supabase/               # schema.sql + seed script
├── docs/                   # design specs & implementation plans
├── PRD.md                  # product requirements
├── design-system.md        # tokens · type · color · motion
└── SUPABASE.md             # backend setup
```

## Status

A happy-path **MVP / interactive prototype**. Both roles and the complete swipe→match→bid loop work on mock data; the Supabase path is built and type-checked (validated live once you create a project). Not yet production-hardened — no authentication, row-level write policies, or real-time sync.

## Design

Dark-neumorphic UI with a Kalighat *pat-chitra* folk-art identity, built from a documented token system (see [`design-system.md`](./design-system.md)). Typeset in **Fraunces** (display) and **Inter** (UI).

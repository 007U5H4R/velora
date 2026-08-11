# Velora — React MVP Build — Technical Design Spec

**Date:** 2026-08-11 · **Owner:** Tushar · **Status:** Draft for sign-off
**Companion docs:** `PRD.md` (approved product spec), `design-system.md` (canonical dark-neumorphic tokens), Figma file `AwWhewtdrQAGoS9jCs3uXi` page "Velora — Mockups" (the approved, source-of-truth mockups).

> This is the **build/architecture spec** that turns the already-approved Figma mockups + PRD into a running React app. It feeds `writing-plans` next. Product requirements are settled in `PRD.md`; this document is about *how the build is structured*, not *what the product is*.

---

## 1. Goal

Build the **happy-path MVP** of Velora as a **mobile-web React app** that reproduces the 12 approved Figma frames **pixel-faithfully** (dark premium neumorphism), with the **card-swipe, pagination, trust-gauge, match-celebration, and screen-transition motion intact**, using the existing GIF/MP4 motion assets and Figma's own design values. No backend; hand-authored mock data; single-session in-memory state.

**Confirmed scope decisions (user, 2026-08-11):**
- **Full 11-screen app**, both Brand & Manufacturer roles, working role-switch, 5-tab nav, the complete swipe→match→bid loop — wired for the **success path only** (no error/empty/edge states, no auth, no backend).
- **Presentation:** phone-framed, centered on a dark backdrop for tablet/desktop (pixel-faithful to the 390px Figma). Responsive gate = no horizontal scroll / usable / readable at 375px.

## 2. Source-of-truth Figma frames (page 0:1, 390px wide)

| # | Screen | Node ID | Role |
|---|---|---|---|
| 01 | Role Select | `3:4` | entry |
| 02 | Buyer Discover (swipe vendors) | `7:2` | Brand · hero |
| 03 | Trust Profile (vendor detail) | `13:2` | Brand |
| 04 | Match (celebration modal) | `14:2` | shared |
| 05 | Buyer Matches | `22:2` | Brand |
| 06 | Buyer RFPs | `23:2` | Brand |
| 06b | Create RFP | `24:2` | Brand |
| 07 | Vendor Discover (swipe RFPs) | `16:2` | Manufacturer · hero |
| 08 | Submit Bid | `17:2` | Manufacturer |
| 09 | Bids Received | `18:2` | Brand |
| 10 | Chat | `27:2` | shared |
| 11 | Profile (role switch) | `28:2` | shared |

Design System page: `11:29`. All frames are on one page and already 100% dark-premium and visually consistent.

## 3. Build approach — Hybrid (Approach C)

Build the **token + shared-component layer by hand** from `design-system.md` (coherent, DRY, animation-ready), then for **each screen read exact values from Figma** via `get_design_context` (spacing, positions, copy, hex, font sizes) and compose the screen from shared components. Figma is the precise source of every value — honoring "use Figma's code" — while the codebase stays clean and animatable. This was chosen over (A) pasting Figma codegen wholesale (verbose, absolutely-positioned, no shared components) and (B) pure hand-build from screenshots (more manual pixel-matching). User-visible result is identical; C is the least brittle path to reproducing the motion.

## 4. Tech stack

- **Vite + React 18 + TypeScript**
- **React Router v6** — tab routes + detail/stack routes + modal overlay routes
- **Framer Motion** — all interactive motion (drag/swipe, deck, gauge, transitions, micro)
- **Plain CSS + CSS custom properties** — the neumorphic token system (multi-layer shadows are cleaner as CSS vars than utility classes); CSS Modules per component
- **Zustand** — one lightweight in-memory store (chosen over Context to avoid re-render churn on the swipe deck)
- **Vitest + React Testing Library** — unit tests for store/loop logic
- No backend, no data persistence (single session, per PRD).

## 5. Project layout

```
Velora/app/
  index.html
  vite.config.ts   tsconfig.json   package.json
  src/
    main.tsx  App.tsx  router.tsx
    styles/  tokens.css  global.css        # tokens from design-system.md §1–§7
    state/   store.ts   types.ts           # Zustand store + domain types
    data/    vendors.ts rfps.ts bids.ts brands.ts chat.ts matches.ts   # seeded mock data
    components/                             # shared, reused across screens
      PhoneFrame/ Button/ TrustCard/ Gauge/ BottomNav/ SegmentedControl/
      Chip/ CertBadge/ StatRow/ Toggle/ Stepper/ Avatar/ StatusBar/ MandalaBg/
    motion/  SwipeDeck.tsx  useSwipe.ts  Celebration.tsx  pageTransitions.ts
    screens/ RoleSelect/ BuyerDiscover/ TrustProfile/ Match/ BuyerMatches/
             RFPs/ CreateRFP/ VendorDiscover/ SubmitBid/ BidsReceived/ Chat/ Profile/
    assets/  # symlink/copy of ../../assets + Figma-exported illustrations & icons
```

The app lives in `Velora/app/` so the design docs, PPTX, and source images at the Velora root stay separate from the code.

## 6. Design-system layer (from `design-system.md` — canonical)

CSS custom properties mirror the token tables verbatim:
- **Surfaces:** `--canvas #1C1D22` · `--raised #26272C` · `--well #1F2025`
- **Text:** `--text-1 #E8E9ED` · `--text-2 #8A8C94` · `--text-3 #B9BBC3` · `--on-ember #FFF7F2`
- **Ember gradient:** `#FF6A00 → #E8420A` · **gold** `#E3AC49` · **sage** `#8FAF6A`
- **Status gradients** (2-stop, wide): red / blue / amber / mint per §1.
- **Shadow recipes A–D** (§3) as reusable `box-shadow` var strings: A raised, B colored-glow CTA, C sunken/deboss, D ambient-glow hero. Every neumorphic surface uses a *pair*, never a single shadow.
- **Type:** Fraunces (display: hero numbers + headline names only) + Inter (everything else), role split enforced. Sizes/tracking per §2.
- **Radii:** card 28 · pill/circle 999 · dock tile 20 · well 16 · avatar 50%.
- Fonts self-hosted (woff2) — no external CDN.

**Shared components** (each = one clear purpose, CSS-module styled, motion-ready):
`PhoneFrame`, `StatusBar`, `Button` (variants: ember-CTA, secondary, pillow-action ×4 colors), `SegmentedControl`, `TrustCard`, `Gauge` (mini + hero), `CertBadge`, `StatRow`, `Chip`, `Toggle` (role switch), `Stepper`, `Avatar` (gold-ring recipe D), `BottomNav` (5 tiles + count badge), `MandalaBg`.

## 7. Navigation & state model

- **Role-aware 5-tab bottom nav.** Tabs: Discover · Matches · RFPs/Bids · Trust · Profile. Labels/targets swap by role per PRD §4 table.
- **Role switch** in Profile flips the whole app Brand↔Manufacturer (store `role` field; routes + data selectors read it).
- **Router:** tab routes at top level; detail routes (Trust Profile, Submit Bid, Bids Received, Chat) pushed over a tab; Match rendered as an overlay route with `AnimatePresence`.
- **Store (Zustand), in-memory, seeded:** `role`, `vendorDeck`+`vendorIndex`, `rfpDeck`+`rfpIndex`, `matches[]`, `inboundLikes[]`, `rfps[]`, `bids[]`, `saved[]`/`shortlist[]`, `chatThreads{}`. Actions: `swipeVendor(dir)`, `swipeRfp(dir)`, `createRfp(payload)` (adds to list), `submitBid(payload)` (adds to that RFP's received bids), `switchRole()`, `openMatch(vendor)`. Loop closure: a submitted bid appears in the brand's Bids Received for that RFP (PRD success criterion 5).

## 8. Mock data

Seeded modules under `data/`, apparel-realistic (Indian sourcing hubs, cert badges, trust scores). ~10 vendors + 4 RFPs + bids + matches + one seeded chat thread. **Exact copy/values are read from the Figma frames at build time** (via `get_design_context`) so the data matches the mockups — e.g. Loomcraft (94, Tiruppur, 97% on-time, MOQ 300, 42d, GOTS/OEKO-TEX/SMETA), Noor & Co. RFP (Organic Cotton Tees, 500 units, ₹180–240, 15 Oct). Do not invent values that contradict a frame.

## 9. Motion system (core requirement — reproduce faithfully)

**Interactive (code — Framer Motion):**
1. **Card swipe (02, 07):** top card `drag`, rotation ∝ x-offset, velocity fling off-screen past threshold → `Pass` (left) / `Shortlist` (right); snap-back under threshold; the 4 action buttons fire the same programmatic fling; next card scales up from the deck (`stack-layer` peek behind top card, per design-system §7 z-order).
2. **Pagination (07 dots / 02 deck):** active indicator animates as the deck advances.
3. **Trust gauge (03):** ring arc sweeps 0→score on mount (SVG stroke-dashoffset), Fraunces number counts 0→value.
4. **Match celebration (04):** medallions scale-in + settle; **embed the real assets** `handshake.mp4` (poster `handshake_still.png`), overlay `confetti.gif` + `flower-rain.gif`, ring `ring_dark.gif`; CTAs rise in. Identical to Figma because it *is* the Figma art.
5. **Screen transitions:** `AnimatePresence` — tab change slide/fade; card→detail shared-element morph via `layoutId` (approximates Figma smart-animate); Match = scale/dissolve overlay; back closes.
6. **Micro:** neumorphic button press-in, tab icon ember-fill, role-toggle thumb slide, stepper, chip/segment select, idle top-card tilt nudge.

**Embedded motion graphics (existing assets, reused verbatim):** `assets/handshake/{handshake.mp4,handshake.gif,handshake_still.png,ring_dark.gif,ring_card.gif}`, `assets/confetti/confetti.gif`, `assets/flower-rain/flower-rain.gif`. Static art: `mandala-gold.png`, `wave-circle-ember.png`, `kalighat-parrot*.png`, `cert-badge-gold.png`.

**Fidelity note (explicit):** hero moments (swipe, pagination, gauge, celebration) are reproduced faithfully. Per-element smart-animate parity on *every* screen change is **approximated** with tasteful transitions, not a 1:1 morph of every layer. `prefers-reduced-motion` respected (crossfade fallback).

## 10. Asset pipeline

- **Reuse** everything under `Velora/assets/` (gifs/mp4/pngs above).
- **Export from Figma** the illustrations/icons not yet local: Role Select garment + sewing-machine illos, per-vendor and per-brand avatars (Kalighat-style), cert medallions, and the line-icon set (nav, action buttons) — via `download_assets`/screenshot-export at 2×, background-removed where needed, saved to `app/src/assets/`.
- Icons follow design-system §5 (stroke-only, ROUND caps, contrast-aware color). Where an exact Figma icon export isn't clean, substitute a matched `lucide-react` glyph tuned to the same weight/color.

## 11. Presentation & responsive (mandatory gate)

- `PhoneFrame` centers the app at ~390px (max ~430px) on `--canvas` backdrop for tablet/desktop; a subtle device bezel on ≥768px. App content is fluid *within* the phone column.
- Viewport meta set; touch + mouse drag both drive the swipe deck.
- **Done gate (per global rule):** verified at **375 / 390 / 768px** — no horizontal page scroll, nav reachable/usable, content readable without pinch-zoom; desktop shows the centered frame unchanged.

## 12. Build workflow (Superpowers chain)

PRD approved; this spec approved next → `writing-plans` produces fine-grained atomic tasks (exact file paths, interfaces, verification gate per task) → `subagent-driven-development` executes in an **isolated git branch/worktree** (repo will be `git init`-ed at `Velora/`, since none exists), with a progress ledger, one fresh implementer per task, two-stage per-task review (spec-compliance then clean-code), a bounded fix loop, explicit per-task model assignment, and a final whole-branch review before `finishing-a-development-branch`.
- **Testing gate:** Vitest/RTL red→green for store/loop logic (swipe, createRfp, submitBid, role switch, loop closure). For pixel-matching and motion, **manual visual verification** against Figma screenshots is the documented equivalent gate.
- **Human-in-the-loop:** subjective look-checks vs. Figma; motion feel; responsive spot-check.

## 13. Success criteria (from PRD §7, mapped to this build)

1. Pick a role at splash → land in that role's Discover. 2. Brand: swipe ≥10 vendor cards, open a full Trust detail, trigger Match, reach Submit-Bid/Message. 3. Brand RFPs: view seeded RFPs + create one that appears in the list. 4. Vendor: swipe RFP cards, open an RFP, submit a structured Bid tied to it. 5. Loop closes: submitted bid appears in brand's Bids Received. 6. Role switch flips the whole app. 7. Chat opens from a match. 8. Responsiveness gate passes at 375/768. **Plus:** swipe, pagination, gauge, and match-celebration motion present and faithful.

## 14. Out of scope (this build)

Real auth/accounts/backend/DB; real verification APIs; payments/contracts/escrow; real-time chat/push (chat is a seeded static thread); native packaging; error/empty/edge states beyond what a frame shows; tablet/desktop *reflow* layouts (phone-framed instead); any redesign of the approved frames.

## 15. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Figma codegen too messy to reuse | Approach C uses it as a *values reference*, composing from clean shared components — not pasted wholesale |
| Swipe deck re-render/perf jank | Zustand (not Context) for deck state; animate only the top 1–2 cards; `will-change`/transform-only motion |
| GIF celebration heavy / loops forever | Play-once handling (swap to still after one cycle); mp4 for handshake with gif fallback; lazy-load celebration assets |
| Smart-animate parity expectations | Fidelity note (§9) sets "faithful hero moments, approximated generic transitions" up front |
| Asset export drift from Figma | Export at 2×, background-remove, spot-check against frame screenshots |
| Pixel drift from mockups | Per-screen `get_design_context` read of exact values; visual diff gate per screen |

## 16. Open assumptions (flag if wrong)

- App code lives in `Velora/app/`; repo `git init`-ed at `Velora/`. *(my call)*
- Zustand + React Router + Framer Motion are acceptable deps. *(my call within the approved stack)*
- Exact seed copy comes from the Figma frames; where a frame is silent, apparel-realistic values are authored. *(assumed)*
- Single-session demo; no persistence across reload. *(PRD)*

# Velora React MVP Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the happy-path Velora MVP as a phone-framed React web app that reproduces the 12 approved Figma frames pixel-faithfully (dark neumorphism) with card-swipe, pagination, trust-gauge, and match-celebration motion intact.

**Architecture:** Hybrid (Approach C) — a hand-built token + shared-component layer (from `design-system.md`), then each screen composed from those components with exact values read live from Figma (`get_design_context`). One in-memory Zustand store drives the swipe→match→bid loop; Framer Motion drives all interactive motion; the existing GIF/MP4 assets drive the celebration. No backend.

**Tech Stack:** Vite · React 18 · TypeScript · React Router v6 · Framer Motion · Zustand · plain CSS + CSS custom properties (CSS Modules) · Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-11-velora-react-mvp-build-design.md` · **Design system:** `design-system.md` · **Figma:** `AwWhewtdrQAGoS9jCs3uXi` page "Velora — Mockups".

## Global Constraints

- **App root:** `Velora/app/`. **Repo:** `git init` at `Velora/` before Phase 1; work on branch `build/mvp` (never `main` directly).
- **No external network at runtime:** self-host fonts (Fraunces, Inter as woff2); no CDN/analytics.
- **Tokens (verbatim, `design-system.md` §1):** canvas `#1C1D22`, raised `#26272C`, well `#1F2025`; text `#E8E9ED`/`#8A8C94`/`#B9BBC3`/on-ember `#FFF7F2`; ember `#FF6A00→#E8420A`; gold `#E3AC49`; sage `#8FAF6A`; status gradients red `#FF8A80→#C62828`, blue `#82C4FF→#0D47A1`, amber `#FFE082→#FF8F00`, mint `#8FF5DC→#0A8F72`.
- **Shadow recipes A–D** exactly as `design-system.md` §3 (always a pair, never single). **Radii:** card 28 · pill/circle 999 · dock tile 20 · well 16 · avatar 50%.
- **Type role split (strict):** Fraunces SemiBold = hero numbers + headline names ONLY; Inter = everything else. Sizes/tracking per §2. (Fraunces style string `"SemiBold"` no space; Inter `"Semi Bold"` with space.)
- **Icons:** stroke-only, ROUND caps, contrast-aware color (§5).
- **Presentation:** `PhoneFrame` centers content at 390px (max 430px) on canvas backdrop; device bezel ≥768px. **Responsive gate:** no horizontal scroll / nav usable / readable at 375, 390, 768px.
- **Mock data only**, single-session, no persistence. Exact copy/values come from the Figma frames — never contradict a frame.
- **Motion fidelity:** hero moments (swipe, pagination, gauge, celebration) faithful; generic screen changes get tasteful transitions (approximated smart-animate). Respect `prefers-reduced-motion`.
- **Per-screen verification:** side-by-side vs the frame's screenshot; the accepted card-stack "peek" overflow is intentional (design-system §9/§10).

---

## File Structure

```
Velora/app/
  index.html                      # viewport meta, root div, font preloads
  package.json  vite.config.ts  tsconfig.json  vitest.config.ts
  src/
    main.tsx                      # mount, Router provider
    App.tsx                       # PhoneFrame + <Routes>
    router.tsx                    # route table (tabs, details, match overlay)
    styles/
      tokens.css                  # all CSS custom properties (§1–§4, §6)
      global.css                  # reset, font-face, base body/canvas
      shadows.css                 # recipe A–D box-shadow var strings
    state/
      types.ts                    # Role, Vendor, Rfp, Brand, Bid, Match, Chat*
      store.ts                    # Zustand store + actions (the loop)
    data/
      vendors.ts rfps.ts brands.ts bids.ts matches.ts chat.ts  # seeded
    components/                   # shared, one responsibility each
      PhoneFrame/  StatusBar/  Button/  SegmentedControl/  BottomNav/
      TrustCard/  Gauge/  CertBadge/  StatRow/  Chip/  Avatar/  Toggle/
      Stepper/  MandalaBg/
    motion/
      useSwipe.ts                 # drag physics + fling + threshold
      SwipeDeck.tsx               # generic stacked deck (vendors & rfps)
      Celebration.tsx             # match confetti/handshake asset layer
      transitions.ts              # AnimatePresence variants
    screens/
      RoleSelect/ BuyerDiscover/ TrustProfile/ Match/ BuyerMatches/
      RFPs/ CreateRFP/ VendorDiscover/ SubmitBid/ BidsReceived/ Chat/ Profile/
    assets/                       # Figma exports + copied ../../assets gifs/mp4
```

**Responsibilities (one line each):** `store.ts` = single source of truth for the loop; `SwipeDeck` = reusable stacked-card deck, agnostic to card content; `Gauge` = animated trust ring (mini + hero); `PhoneFrame` = fixed-width centered device shell + responsive backdrop; each `screens/*` = one frame, composed from components, values matched to its Figma node.

---

## Phase Overview (build order, each phase = one checkpoint / session)

| Phase | Deliverable | Depends on |
|---|---|---|
| **1 · Foundation** | Scaffold + tokens + store + data + static shared components render in a gallery route; dev server runs; store logic unit-tested | — |
| **2 · Buyer core** | TrustCard + animated Gauge + SwipeDeck; Buyer Discover (02) swipe+pagination works; Trust Profile (03) gauge sweeps; Match (04) celebration plays | 1 |
| **3 · Buyer lists** | Buyer Matches (05), RFPs (06), Create RFP (06b) — create adds to list | 1, 2 |
| **4 · Manufacturer** | Vendor Discover (07) reuses SwipeDeck; Submit Bid (08) submits; Bids Received (09) shows the submitted bid (loop closes) | 1, 2 |
| **5 · Shared + nav** | Chat (10), Profile (11), role-switch flips whole app, role-aware tab nav, page transitions | 1–4 |
| **6 · Polish** | Micro-interactions, reduced-motion, responsive gate 375/768, full 12-frame visual diff, final whole-branch review | 1–5 |

Human-in-the-loop checkpoints: end of Phase 2 (motion feel), Phase 4 (loop closure), Phase 6 (final look vs Figma + responsive).

---

## Phase 1 — Foundation (fully atomic)

### Task 1.1: Scaffold app + repo + dev server

**Files:** Create `Velora/app/*` (Vite scaffold), `Velora/.gitignore`.

- [ ] **Step 1:** From `Velora/`, run `git init && printf 'node_modules\ndist\n.DS_Store\n' > .gitignore && git add -A && git commit -m "chore: docs + design system baseline"` then `git checkout -b build/mvp`.
- [ ] **Step 2:** `npm create vite@latest app -- --template react-ts`; `cd app && npm i`.
- [ ] **Step 3:** Add deps: `npm i react-router-dom framer-motion zustand`; dev deps `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom`.
- [ ] **Step 4:** Configure `vitest.config.ts` (jsdom env, setup file with jest-dom). Add `"test": "vitest"` to scripts.
- [ ] **Step 5:** Replace `App.tsx` with a placeholder `<div>Velora</div>`; run `npm run dev` and confirm it serves; run `npm test` (0 tests) and confirm the runner starts.
- [ ] **Step 6:** Commit `feat: scaffold vite react-ts app with router/motion/zustand/vitest`.

### Task 1.2: Token + style layer

**Files:** Create `src/styles/tokens.css`, `src/styles/shadows.css`, `src/styles/global.css`; self-hosted fonts in `src/assets/fonts/`; import all in `main.tsx`.

**Interfaces — Produces:** CSS custom properties consumed by every component: `--canvas --raised --well --text-1..3 --on-ember --ember-a --ember-b --gold --sage`, status gradient vars, `--sh-raised --sh-cta --sh-sunken --sh-hero` (recipe A–D), `--r-card:28px` etc.

- [ ] **Step 1:** Write `tokens.css` with every value from Global Constraints as `:root` custom properties (colors, radii, font-family vars). Include the two gradient transforms as documented (§6) as reusable classes.
- [ ] **Step 2:** Write `shadows.css` translating recipes A–D to `--sh-*` multi-`box-shadow` strings (white-highlight + dark-shadow pair; CTA glow uses the element's own dark stop via a `--glow` var; hero adds centered accent glow).
- [ ] **Step 3:** Write `global.css`: CSS reset, `@font-face` for Fraunces SemiBold + Inter (Regular/Medium/SemiBold/Bold) from local woff2, `body{background:var(--canvas);color:var(--text-1);font-family:Inter}`.
- [ ] **Step 4:** Import the three CSS files + confirm in the browser that `getComputedStyle(document.documentElement).getPropertyValue('--ember-a')` returns `#FF6A00`. Commit `feat: dark-neumorphic token + shadow + font layer`.

### Task 1.3: Domain types + Zustand store (the loop) — TDD

**Files:** Create `src/state/types.ts`, `src/state/store.ts`, `src/state/store.test.ts`. Consumes seed data (Task 1.4) via injectable initial state so tests don't depend on the full seed.

**Interfaces — Produces:**
```ts
export type Role = 'brand' | 'manufacturer';
export type SwipeDir = 'pass' | 'like';
export interface Vendor { id:string; name:string; category:string; location:string;
  trustScore:number; onTimePct:number; moq:number; leadDays:number; certs:string[];
  avatar:string; verified:boolean;
  identity:{ verified:boolean; note:string }; capability:{ score:number; note:string };
  reputation:{ score:number; note:string }; continuous:{ status:string; note:string }; }
export interface Brand { id:string; name:string; tagline:string; location:string;
  trustScore:number; onTimePct:number; terms:string; avatar:string; }
export interface Rfp { id:string; brandId:string; title:string; category:string;
  units:number; budgetMin:number; budgetMax:number; shipBy:string;
  requirements:string[]; status:'live'|'draft'|'closed'; bidIds:string[]; }
export interface Bid { id:string; rfpId:string; vendorId:string; pricePerUnit:number;
  moq:number; leadDays:number; sample:'free'|'paid'|'none'; note:string;
  total:number; status:'sent'|'accepted'; }
export interface Match { id:string; withId:string; kind:'vendor'|'brand';
  status:'submit_bid'|'bid_received'|'messaged'; when:string; }
export interface ChatMsg { id:string; from:'me'|'them'; text:string; time:string;
  bidCard?:{ pricePerUnit:number; leadDays:number; total:number }; }
export interface ChatThread { id:string; withId:string; messages:ChatMsg[]; }

// store shape
interface AppState {
  role:Role; switchRole():void;
  vendorDeck:Vendor[]; vendorIndex:number; swipeVendor(dir:SwipeDir):void;
  rfpDeck:Rfp[]; rfpIndex:number; swipeRfp(dir:SwipeDir):void;
  rfps:Rfp[]; createRfp(input:Omit<Rfp,'id'|'brandId'|'status'|'bidIds'>):string;
  bids:Bid[]; submitBid(input:Omit<Bid,'id'|'total'|'status'>):Bid;
  matches:Match[]; inboundLikes:Match[];
  saved:string[]; toggleSave(vendorId:string):void;
  activeMatch:Vendor|null; openMatch(v:Vendor):void; closeMatch():void;
  chat:Record<string,ChatThread>;
}
```

- [ ] **Step 1: Write failing tests** in `store.test.ts`:
```ts
import { createStore } from './store';
test('swipeVendor(like) opens a match and advances the deck', () => {
  const s = createStore({ vendorDeck:[v('a'),v('b')] });
  s.getState().swipeVendor('like');
  expect(s.getState().vendorIndex).toBe(1);
  expect(s.getState().activeMatch?.id).toBe('a');
});
test('swipeVendor(pass) advances without a match', () => {
  const s = createStore({ vendorDeck:[v('a'),v('b')] });
  s.getState().swipeVendor('pass');
  expect(s.getState().vendorIndex).toBe(1);
  expect(s.getState().activeMatch).toBeNull();
});
test('createRfp prepends a live RFP and returns its id', () => {
  const s = createStore({ rfps:[] });
  const id = s.getState().createRfp({ title:'Tees', category:'Tees & knits',
    units:500, budgetMin:180, budgetMax:240, shipBy:'2026-10-15', requirements:['GOTS'] });
  expect(s.getState().rfps[0].id).toBe(id);
  expect(s.getState().rfps[0].status).toBe('live');
});
test('submitBid computes total and attaches bid to its RFP (loop closes)', () => {
  const s = createStore({ rfps:[rfp('r1',500)], bids:[] });
  const b = s.getState().submitBid({ rfpId:'r1', vendorId:'v1', pricePerUnit:220,
    moq:500, leadDays:40, sample:'free', note:'' });
  expect(b.total).toBe(110000);
  expect(s.getState().rfps.find(r=>r.id==='r1')!.bidIds).toContain(b.id);
});
test('switchRole toggles brand<->manufacturer', () => {
  const s = createStore({ role:'brand' });
  s.getState().switchRole();
  expect(s.getState().role).toBe('manufacturer');
});
```
(with tiny `v()`, `rfp()` factory helpers at the top of the test file.)
- [ ] **Step 2:** Run `npm test store` → expect FAIL (`createStore` undefined).
- [ ] **Step 3:** Implement `store.ts`: `createStore(partial)` returns a vanilla Zustand store merged over defaults; implement each action. `submitBid` total = `pricePerUnit * moq`; push bid id to the RFP's `bidIds`. `swipeVendor('like')` sets `activeMatch = vendorDeck[vendorIndex]` then `vendorIndex++`. Export a default `useStore` bound to the full seed (Task 1.4).
- [ ] **Step 4:** Run `npm test store` → expect PASS (5/5).
- [ ] **Step 5:** Commit `feat: domain types + in-memory store with tested swipe/create/bid/role loop`.

### Task 1.4: Seeded mock data

**Files:** Create `src/data/{vendors,rfps,brands,bids,matches,chat}.ts` + a `src/data/index.ts` barrel that builds the store's initial state. **Consumes:** types (1.3).

- [ ] **Step 1:** Transcribe values from the Figma frames (read via `get_design_context` on nodes `7:2,13:2,22:2,23:2,16:2,18:2,27:2,28:2`): ~10 vendors (Loomcraft 94/Tiruppur/97%/MOQ300/42d/GOTS,OEKO-TEX,SMETA; Indigo Mills 88; Saanjh Textiles 91; Kadwa Weaves 86; Nadi Knits 90; +5), 4 RFPs (Organic Cotton Tees 500u ₹180–240 15 Oct; Linen Shirt Run 300u ₹420–520 30 Nov; Ribbed Tank Tops draft 800u; +1), brands (Noor & Co. 91/D2C/Mumbai), seed bids (Loomcraft ₹220/40d, Indigo ₹205/48d, Saanjh ₹235/35d), matches list + inbound likes (Aarav/Mira/Kate/Rhea), one Loomcraft chat thread with the seeded messages + bid card.
- [ ] **Step 2:** Write a shape test `data.test.ts`: assert ≥10 vendors, 4 rfps, every vendor has 4 pillar objects + ≥1 cert, the seed chat thread has ≥4 messages and one `bidCard`. Run → PASS.
- [ ] **Step 3:** Wire `index.ts` initial state into `useStore`. Commit `feat: apparel-realistic seed data matched to Figma frames`.

### Task 1.5: PhoneFrame + StatusBar + gallery route

**Files:** Create `components/PhoneFrame/`, `components/StatusBar/`; temporary `screens/Gallery/` route listing built components; wire `router.tsx` + `App.tsx`.

- [ ] **Step 1:** `PhoneFrame`: fixed 390px (max 430) column, `min-height:100dvh` on mobile, centered on `--canvas` with a subtle bezel ≥768px (CSS only). `StatusBar`: 9:41 + signal/100% row matching frame top (`3:5`).
- [ ] **Step 2:** RTL test: `PhoneFrame` renders children; renders at 375px without overflow (assert `scrollWidth <= clientWidth` on a mocked width). Run → PASS.
- [ ] **Step 3:** `Gallery` route renders StatusBar + a swatch of tokens (color chips, shadow recipes) for visual QA. Commit `feat: phone-frame shell + status bar + component gallery`.

### Task 1.6–1.10: Static shared components (one task each)

Each task: build the component to match its Figma node + the named `design-system.md` recipe, add an RTL smoke test (renders + variants), add it to the Gallery, verify against a `get_screenshot` of the source node, commit.

- [ ] **1.6 `Button`** — variants `ember` (CTA, recipe B ember glow), `secondary` (amber gradient, frame 04), `pillow` ×4 (pass/details/save/shortlist circles 64/76px, recipe B, status gradients, §5 icon contrast). Node ref: `7:2` action row, `14:2` CTAs.
- [ ] **1.7 `SegmentedControl` + `Chip`** — segmented (ember vertical-gradient selected, §6/§8.6) for Vendors/RFPs & Open RFPs/Brands toggles (`7:2`,`16:2`); `Chip` for category/requirement/sort chips (`24:2`,`09`). 
- [ ] **1.8 `Avatar` + `CertBadge` + `MandalaBg`** — `Avatar` circular + gold hairline + recipe D (`13:2`); `CertBadge` gold medallion image fill (`assets/cert-badge-gold.png`); `MandalaBg` absolute `mandala-gold.png` at opacity 0.25 behind content.
- [ ] **1.9 `StatRow` + `Stepper` + `Toggle`** — `StatRow` plain icon+label / bold value, shared-slot aligned (§7); `Stepper` −/+ pillows around a debossed count well (`24:2`); `Toggle` role switch debossed trough + ember thumb (`28:2`).
- [ ] **1.10 `BottomNav`** — 5 raised tiles (60×60 r20 recipe A), active = debossed well (recipe C) + ember icon + near-white label, inactive muted, count badge on Matches; role-aware labels/targets. Node: `7:104` region across frames.

**Phase 1 gate:** Gallery shows every component matching its Figma source; `npm test` green; dev server clean. → checkpoint.

---

## Phase 2 — Buyer core flow + hero motion (task inventory)

> Expand each into atomic TDD/verify steps at session start. Every task ends with a visual diff vs the named node + a commit.

- **2.1 `Gauge`** — Consumes tokens. Produces `<Gauge value size variant='mini'|'hero'/>`. SVG ring, sage→gold arc, on-mount sweep 0→value (stroke-dashoffset, Framer), Fraunces number count-up. Match nodes `7:2` (mini 94), `13:2` (hero 94). Test: renders final value; reduced-motion renders final state instantly. Gate: gauge sweep visually matches.
- **2.2 `TrustCard`** — Consumes Avatar, Gauge(mini), StatRow, CertBadge, Chip. Produces `<TrustCard vendor onPass onLike onDetails onSave/>`. Compose to node `7:2`: arch/circle avatar, name (Fraunces 20), category/location, mini gauge, 3-stat row, cert row, "Similar to your best supplier" pill. Gate: card hierarchy matches.
- **2.3 `useSwipe` + `SwipeDeck`** — Produces generic `<SwipeDeck items renderCard onSwipe pagination/>`: top card `drag`, rotation ∝ x, velocity fling past threshold → onSwipe('pass'|'like'), snap-back under threshold, next card scales up from behind (stack peek), idle tilt nudge, dot/'●○○' pagination indicator. Tests (RTL + logic): threshold + direction math unit-tested; buttons fire same fling. Gate: swipe feels physical, pagination advances (nodes `7:2` deck, `16:2` dots).
- **2.4 Screen `BuyerDiscover` (02, `7:2`)** — top nav (logo + SegmentedControl + avatar), MandalaBg, `SwipeDeck` of `TrustCard`s, 4-pillow action row wired to `swipeVendor`, `BottomNav` Discover active. Like → `openMatch`. Gate: full frame diff at 390px.
- **2.5 Screen `TrustProfile` (03, `13:2`)** — header avatar (arch) + name + Verified, hero `Gauge` sweep, "High Trust", 4 pillar cards (Identity/Capability/Reputation/Continuous), cert medallion row, chat button + ember "Shortlist" CTA. Reached via Details from 02 (shared-element `layoutId` on avatar). Gate: gauge is the hero; diff matches.
- **2.6 Screen `Match` (04, `14:2`) + `Celebration`** — overlay route with `AnimatePresence` dissolve/scale-in; two gold-rim medallions scale-in; embed `handshake.mp4` (poster `handshake_still.png`) + overlay `confetti.gif` + `flower-rain.gif` (play-once then settle to still); match chips + matched-RFP card; ember "Submit Bid" → 08, amber "Send a message first" → 10. Gate: celebration matches Figma, assets play, CTAs route.

**Phase 2 gate + checkpoint:** brand can swipe ≥10 cards, open Trust detail, trigger Match with celebration, reach Submit-Bid/Message. Human look-check on motion feel.

---

## Phase 3 — Buyer lists + RFPs (task inventory)

- **3.1 `BuyerMatches` (05, `22:2`)** — search well; "Liked you" avatar rail over MandalaBg; "Your matches" rows (avatar, name, mini score, status pill: Submit bid / Bid received / Messaged, timeago); BottomNav Matches active + badge. Rows read `matches`/`inboundLikes` from store. Gate: diff.
- **3.2 `RFPs` (06, `23:2`)** — "Your RFPs" + `New` button + Active/Drafts/Closed tabs; RFP cards (LIVE/DRAFT chip, units/budget/shipBy, bids count); ember FAB "+" → CreateRFP. Reads `rfps`. Gate: diff.
- **3.3 `CreateRFP` (06b, `24:2`)** — form: title input, category `Chip` group, `Stepper` quantity, budget range, ship-by (date), requirement chips; "Post RFP" → `createRfp` then back to 06 with the new card visible (loop). Test: submitting adds a row. Gate: diff + create works.

**Phase 3 gate:** brand RFP tab complete; create adds to list.

---

## Phase 4 — Manufacturer flow + loop closure (task inventory)

- **4.1 `VendorDiscover` (07, `16:2`)** — reuse `SwipeDeck` with an RFP-card renderer (brand mark in arch frame, order/budget/timeline/requirements, "Matches your capacity & certs" pill), Open RFPs/Brands SegmentedControl, dot pagination, 4-pillow row → `swipeRfp`, BottomNav Discover active. Gate: diff + swipe works.
- **4.2 `SubmitBid` (08, `17:2`)** — RFP context card; big ember-outlined price/unit input (+ "In range" check), MOQ + lead-time wells, sample-offer segmented (Free/Paid/No), note textarea, "Your Trust Score travels" note, live TOTAL = price×units, "Send Bid" → `submitBid` then → 09. Test: total recomputes; submit attaches bid. Gate: diff.
- **4.3 `BidsReceived` (09, `18:2`)** — RFP header + bids count; sort chips (Best match active); bid cards (Best-match badge, vendor+score, price/lead/total, sample tag, View/Accept). Reads that RFP's bids **including the one just submitted** (loop closes). Gate: submitted bid appears.

**Phase 4 gate + checkpoint:** vendor swipes RFPs, submits a structured bid, and it shows in the brand's Bids Received. Human check on loop closure.

---

## Phase 5 — Shared screens + role switch + transitions (task inventory)

- **5.1 `Chat` (10, `27:2`)** — header (avatar, Active now, score); "You matched" pill; received (debossed) + sent (ember) bubbles from seed thread; in-chat bid card (Review & accept); input well + ember send (appends a local message, happy-path only). Reached from Match/Matches. Gate: diff.
- **5.2 `Profile` (11, `28:2`)** — profile card (Verified, edit); "You're browsing as" `Toggle` role switch; stats (Matches/RFPs/Saved); settings rows (Trust 94, Company, Payment, Notifications, Help); Sign out; BottomNav Profile active. Gate: diff.
- **5.3 Role-switch wiring** — `switchRole` flips tab labels/targets and Discover deck (vendors↔RFPs) and all tab content across the app. Test: after switch, Discover renders RFP deck; nav labels swap. Gate: whole app flips.
- **5.4 Page transitions** — `transitions.ts` variants; wrap routes in `AnimatePresence` (tab crossfade/slide, detail push, match dissolve, back). Respect reduced-motion. Gate: transitions smooth, no layout jump.

**Phase 5 gate:** whole app navigable in both roles; role switch flips everything; chat opens from a match.

---

## Phase 6 — Polish, responsive, final review (task inventory)

- **6.1 Micro-interactions** — neumorphic button press-in, tab icon ember-fill, toggle thumb slide, stepper/chip select feedback across all screens.
- **6.2 Reduced-motion pass** — every animation has a `prefers-reduced-motion` fallback (final state / crossfade).
- **6.3 Responsive gate** — verify 375 / 390 / 768px on all 12 screens: no horizontal scroll, nav usable, readable; desktop shows centered frame. Fix overflows (keep the intentional stack peek).
- **6.4 Full visual-diff pass** — screenshot all 12 built screens, compare to the Figma frames side-by-side; fix drift.
- **6.5 Final whole-branch review** — `superpowers:requesting-code-review` on `build/mvp`; single fix wave; then `superpowers:finishing-a-development-branch` (merge / PR / keep options).

**Phase 6 gate:** all PRD §7 success criteria pass with evidence (screenshots + green tests); motion faithful; responsive gate green.

---

## Self-Review (against the spec)

**Spec coverage:** every spec section maps to tasks — §4 stack→1.1; §6 tokens/components→1.2,1.5–1.10,2.1–2.3; §7 nav/state→1.3,5.3–5.4; §8 data→1.4; §9 motion→2.1,2.3,2.6,5.4,6.1–6.2; §10 assets→1.8,2.6 + exports noted per task; §11 responsive→1.5,6.3; §13 success criteria→Phase 2/3/4/6 gates. No gaps.

**Placeholder scan:** Phase 1 is fully atomic with real test code; Phases 2–6 are deliberately task-inventories (per the budget-aware phasing stated up front) to be expanded to atomic steps at each phase's session — each already carries files, interfaces, the exact Figma node, deliverable, and a verification gate. This is a stated phasing decision, not a TBD.

**Type consistency:** action/type names (`swipeVendor`, `createRfp`, `submitBid`, `switchRole`, `openMatch`, `bidIds`, `SwipeDir`, `SwipeDeck`, `Gauge`, `TrustCard`) are used identically across the store interface (1.3) and the screens/motion tasks that consume them.

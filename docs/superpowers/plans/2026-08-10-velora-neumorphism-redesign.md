# Velora Neumorphic Figma Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Figma-task adaptation:** the "test cycle" per task = scripted change → `get_screenshot` / read-back verification → fix. No git commits (not a repo); Figma version history + this file's checkboxes are the ledger. Every `use_figma` call REQUIRES the `figma:figma-use` skill loaded first; illustration tasks require Recraft MCP tools (`mcp__recraft__*`).

> ## ⚠️ DESIGN PIVOT (2026-08-11) — DARK PREMIUM, not ivory
> The warm-ivory neumorphism below is **superseded** for the buyer flow. Frame **02 · Buyer Discover** was redesigned to a **dark premium** theme and is now the canonical reference. Frames **05 · Buyer Matches**, **06 · Buyer RFPs**, and **06b · Create RFP** were converted to match it. The ivory tokens/constraints in this plan are historical — build new/updated frames against the dark tokens below.
>
> **Dark token map (extracted from Frame 02):**
> - Surfaces: page/canvas `#1c1d22` · raised card/pill/tile `#26272c` · debossed well `#1f2025` · neutral placeholder `#2f3036`
> - Text: primary `#e8e9ed` · muted/secondary `#8a8c94` · tertiary `#b9bbc3`
> - Accents: gold (rings/hairlines/mandala) `#e3ac49` · primary orange gradient `#ff6a00 → #e84218` (CTAs, active nav icon, FAB) · orange link/badge text `#ff7a45`/`#ff6a00` · light sage (Verified/Trust) `#8faf6a`
> - Raised effect: DROP_SHADOW `#ffffff` a0.05 (−6,−6) r14 **+** DROP_SHADOW `#000000` a0.65 (8,8) r16
> - Debossed effect: INNER_SHADOW `#000000` a0.60 (5,5) r10 **+** INNER_SHADOW `#ffffff` a0.06 (−5,−5) r10
> - Colored-button raised (FAB/primary): DROP_SHADOW `#ffffff` a0.15 (−4,−4) r10 **+** DROP_SHADOW `#e84218` a0.55 (6,6) r18
> - Radii unchanged: cards 28 · pills/circles 999 · wells 16–20 · nav active-well 14. Fonts unchanged: Fraunces (display), Inter (UI).
>
> **Bottom nav:** five individual raised tiles (60×60, `#26272c`, r20, raised) — **no** surrounding dock bar; active tile = 36×36 debossed well + orange-gradient icon + `#e8e9ed` label; inactive = muted `#8a8c94` icon/label; `6` count badge on Matches (`#26272c` fill, `#ff6a00` a0.55 rim, `#ff6a00` numeral). Cloned from Frame 02 (`7:104`) into F5/F6; pin as `layoutPositioning:'ABSOLUTE'`, y=636 (these frames are VERTICAL auto-layout + clipsContent, so a flow-positioned nav overflows the clip).
> - **Mandala motif:** Frame 02's `motif-mandala-gold` image, cloned as an absolute-positioned top bloom behind content at **opacity 0.25** (0.5 was too strong over transparent content rows).
> - Clay illustrations (illo/*) are preserved as-is on dark cards; only surrounding UI was recolored.

**Goal (historical — ivory):** Restyle all 12 Velora mockup frames in place to premium warm-ivory neumorphism with Indian heritage layer, clay illustrations, keyframe micro-motion, and re-wired prototype.

**Architecture:** Rebuild the "Design System" page first (variables + effect styles + component masters), then restyle frames top-down from those shared styles so all 12 screens inherit one material system. Illustrations generated once as a consistent Recraft style, uploaded, and placed per-frame. Motion + prototype wiring last, after all frames are static-final.

**Tech Stack:** Figma MCP (`use_figma`, `get_screenshot`, `get_metadata`, `upload_assets`), Recraft MCP (`generate_image`, `create_style`, `remove_background`), keyframe motion API (account-gated).

**Figma file:** `AwWhewtdrQAGoS9jCs3uXi` · page "Velora — Mockups" (frames: 01 Role Select, 02 Buyer Discover, 03 Trust Profile, 04 Match, 05 Buyer Matches, 06 Buyer RFPs, 06b Create RFP, 07 Vendor Discover, 08 Submit Bid, 09 Bids Received, 10 Chat, 11 Profile) · page "Design System".

## Global Constraints

- Base canvas everywhere: ivory `#EFE6D8`. No dark surfaces anywhere.
- Raised effect (style name `neu/raised`): DROP_SHADOW white #FFFFFF 75%, offset (−6,−6), blur 14, spread 0 + DROP_SHADOW #C9B49A 50%, offset (6,6), blur 14, spread 0.
- Debossed effect (style name `neu/debossed`): INNER_SHADOW #C9B49A 55%, offset (5,5), blur 10 + INNER_SHADOW #FFFFFF 80%, offset (−5,−5), blur 10.
- Terracotta raised (style name `neu/raised-terracotta`): DROP_SHADOW #FFFFFF 60% (−4,−4) blur 10 + DROP_SHADOW #A34428 45% (6,6) blur 14.
- Colors: terracotta `#C15B3C` (primary CTA), sage `#61734E` (Verified/Trust only), gold `#C08A2D` (hairlines/motifs/accents), espresso `#17130F` (text), taupe shadow `#C9B49A`, white highlight `#FFFFFF`.
- Corner radius: cards 28, buttons/pills 999 (full), wells/inputs 16–20, nav dock 24.
- Fonts: Fraunces (display), Inter (UI) — do not change text styles' families.
- Gold is spent sparingly: hairlines only on trust ring, Verified medallion, cert badges, match medallions, logo mark.
- All frames stay on the single "Velora — Mockups" page (cross-page reactions are impossible).
- Never attempt shader fills. If motion API throws "not a supported API", skip motion tasks and note it.
- Verification per frame: `get_screenshot` at frame level; check (a) effects render soft not muddy, (b) text contrast intact, (c) no element overflows frame bounds.

---

## Phase 1 — System, Illustrations, Hero Frames

### Task 1: Design System page — variables + effect styles

**Files (Figma):** page "Design System" — 16 existing color variables; add 3 effect styles.
**Interfaces — Produces:** effect styles `neu/raised`, `neu/debossed`, `neu/raised-terracotta`; updated variable values (`surface/base`=EFE6D8 etc.) consumed by every later task.

- [ ] Step 1: Load `figma:figma-use` skill; `get_metadata` on Design System page to map variable IDs + existing component masters.
- [ ] Step 2: Via `use_figma`, update color variables: surface base cream→`EFE6D8`; keep terracotta/sage/gold/espresso as-is; retire dark-surface variables by repointing them to `EFE6D8` (do not delete — instances may reference them).
- [ ] Step 3: Create the 3 effect styles with exact values from Global Constraints:

```js
const raised = figma.createEffectStyle();
raised.name = 'neu/raised';
raised.effects = [
  {type:'DROP_SHADOW', color:{r:1,g:1,b:1,a:0.75}, offset:{x:-6,y:-6}, radius:14, spread:0, visible:true, blendMode:'NORMAL'},
  {type:'DROP_SHADOW', color:{r:0.788,g:0.706,b:0.604,a:0.5}, offset:{x:6,y:6}, radius:14, spread:0, visible:true, blendMode:'NORMAL'},
];
// analogous for neu/debossed (INNER_SHADOW pair) and neu/raised-terracotta (#A34428 = r:0.639,g:0.267,b:0.157)
```

- [ ] Step 4: Verify — read back `figma.getLocalEffectStyles()` names + screenshot a test rectangle with each style applied; delete the test rect.

### Task 2: Recraft clay illustration set (6 pieces)

**Files:** generate → `~/Code/Case Study 3/Velora/assets/clay/*.png`; upload into Figma via `upload_assets`.
**Interfaces — Produces:** 6 background-removed PNGs placed on Design System page as named components: `illo/handshake`, `illo/fabric-bolts`, `illo/sewing-machine`, `illo/thread-spools`, `illo/marigold`, `illo/kurta`.

- [ ] Step 1: Load Recraft tools; `create_style` seeded with one master prompt: "soft 3D clay render, matte plasticine, warm ivory background, terracotta sage and muted gold palette, soft studio light, rounded forms, minimal, premium".
- [ ] Step 2: Generate all 6 subjects with that style (handshake with gold bangle; stacked fabric bolts; vintage sewing machine; three thread spools; marigold flowers + loose petals; folded kurta with hang tag). 1024×1024 each.
- [ ] Step 3: `remove_background` on each; save PNGs to `assets/clay/`.
- [ ] Step 4: Consistency gate — view all 6 side by side; regenerate any outlier (different finish/palette) with the same style ID. Max 2 regen rounds, then accept best.
- [ ] Step 5: `upload_assets` into the Figma file; wrap each as a component named `illo/<name>` on the Design System page.
- [ ] Step 6: Verify — screenshot of Design System illustration row; all 6 share palette + finish.

### Task 3: Rebuild core component masters (buttons, nav, inputs, chips)

**Files (Figma):** Design System page component masters.
**Interfaces — Consumes:** Task 1 styles. **Produces:** updated masters — `btn/primary` (terracotta pill, `neu/raised-terracotta`), `btn/secondary` (ivory pill, `neu/raised`), `btn/pillow` (64px circle, `neu/raised`, icon variants: pass ✕ espresso / details 👁 espresso / save ★ gold / shortlist 🤝 terracotta fill 76px), `nav/dock` (raised r24 bar, 5 slots; active slot = 44px debossed rounded-rect + terracotta icon), `input/well` (`neu/debossed` r16, floating Inter label), `chip/stat` (embossed mini pill), `toggle/role` (debossed trough 64×36 + raised terracotta thumb 28).

- [ ] Step 1: For each master: set fill `EFE6D8` (or terracotta for primary/shortlist), apply effect style, set radius per Global Constraints, restyle text layers (Inter; espresso).
- [ ] Step 2: Instance-check — screenshot 2 frames that consume these masters (02, 11); confirm overrides survived (labels intact, no layout breakage).
- [ ] Step 3: Fix any broken instance layouts (auto-layout padding may need +4–8px for shadow breathing room: shadows need ≥14px clearance from frame edges).

### Task 4: Trust Card + gauge components

**Files (Figma):** Design System masters `card/trust`, `gauge/mini`, `gauge/hero`, `badge/cert`, `frame/mehrab`.
**Interfaces — Consumes:** Tasks 1, 3. **Produces:** `frame/mehrab` (arch-top photo mask: rect + top semicircle boolean union, inset in debossed well, 1px gold hairline inside); `gauge/mini` (56px: debossed ring track + sage→gold angular-gradient arc stroke-cap ROUND + Fraunces score); `gauge/hero` (200px: debossed circular well 220 + raised inner disc 160 + gradient ring + Fraunces 48 number); `badge/cert` (32px gold-rimmed circle medallion, Inter 8 caps label); `card/trust` (r28 `neu/raised`, mehrab photo top, name/category/location, mini gauge right, 3 stat chips row, cert badge row).

- [ ] Step 1: Build `frame/mehrab` + `badge/cert` + `gauge/mini` masters.
- [ ] Step 2: Build `gauge/hero`; arc = ARC ellipse with `arcData {startingAngle:-Math.PI*0.75, endingAngle: computed}`, stroke weight 12, ROUND caps, gradient sage→gold.
- [ ] Step 3: Rebuild `card/trust` composing them; verify vendor-photo fills survive as instance overrides.
- [ ] Step 4: Verify — screenshot master + one instance in frame 02; gauge arc renders smooth, arch mask clips photo correctly.

### Task 5: Frame 01 — Role Select

**Interfaces — Consumes:** Tasks 1–3 (`illo/fabric-bolts`, `illo/sewing-machine`, `btn/primary`).

- [ ] Step 1: Canvas → `EFE6D8`; two choice cards → r28 `neu/raised` ivory, each with its clay illo (160px, soft cast shadow: DROP_SHADOW #C9B49A 35% (0,10) blur 24), Fraunces title, Inter subtitle.
- [ ] Step 2: Embossed mandala corner relief: import/draw mandala arc vector top-right, fill `EFE6D8` (same as canvas), apply `neu/raised` at 40% opacity effects — shadow-only relief. If muddy at screenshot check, delete it.
- [ ] Step 3: Logo mark: Fraunces "Velora" + 1px gold hairline underline.
- [ ] Step 4: Verify screenshot: reliefs legible-or-removed, cards breathe (≥20px gaps), no overflow.

### Task 6: Frame 02 — Buyer Discover

**Interfaces — Consumes:** Tasks 3–4 (`card/trust`, `btn/pillow` row, `nav/dock`, `gauge/mini`).

- [ ] Step 1: Canvas ivory; swap old vendor card for `card/trust` instance (keep existing vendor mock data text via overrides).
- [ ] Step 2: Action row: 4 `btn/pillow` instances (pass/details/save/shortlist), shortlist 76px terracotta; spacing 20px; row floats 16px below card.
- [ ] Step 3: `nav/dock` instance, Discover slot active (debossed + terracotta icon); dock floats 12px off bottom.
- [ ] Step 4: Verify screenshot: card hierarchy reads (photo → name → gauge → chips → certs), pillows look pressed-out not flat.

### Task 7: Frame 03 — Trust Profile

**Interfaces — Consumes:** Task 4 (`gauge/hero`, `badge/cert`, `frame/mehrab`).

- [ ] Step 1: Header: vendor photo in `frame/mehrab` (120px) + name (Fraunces 24) + Verified medallion (sage + gold hairline).
- [ ] Step 2: `gauge/hero` centered with score; 4 pillar cards (Identity/Capability/Reputation/Continuous verification) as r20 raised cards in 2×2 grid, each: Inter 11 caps label, Fraunces 20 sub-score, thin debossed progress track (4px).
- [ ] Step 3: Cert medallion row (`badge/cert` × GOTS/OEKO-TEX/SMETA/WRAP); bandhani embossed dot-grid strip under section header (2px circles, `EFE6D8` fill, minimal inner shadow, 40% opacity).
- [ ] Step 4: Mandala relief bottom-left corner (same recipe as Task 5 Step 2, same drop-if-muddy rule).
- [ ] Step 5: Verify screenshot: gauge is the clear hero; scroll-content fits frame or frame uses vertical auto-layout consistent with original.

### Task 8: Frame 04 — Match

**Interfaces — Consumes:** Tasks 2–3 (`illo/handshake`, `illo/marigold`, `btn/primary`, `btn/secondary`).

- [ ] Step 1: Full ivory celebration canvas; two 96px circular medallions (brand logo + vendor photo) with `neu/raised` + 1px gold hairline, overlapping 16px, centered upper third.
- [ ] Step 2: `illo/handshake` (200px) centered between/below medallions with cast shadow.
- [ ] Step 3: Scatter 7–9 marigold/petal elements (from `illo/marigold`, scaled 24–56px, rotated variously) around upper half; opacity 90%.
- [ ] Step 4: Copy: Fraunces 32 "It's a Match!" (keep existing copy if different — restyle only); Inter subtitle; CTAs: `btn/primary` "Submit Bid" + `btn/secondary` "Message".
- [ ] Step 5: Verify screenshot: celebration reads joyful-premium, not cluttered; medallion gold rims visible.

### Task 9: Phase 1 checkpoint — user review

- [ ] Step 1: Screenshot frames 01–04 + Design System page; present to user in chat with what's verified vs pending.
- [ ] Step 2: **HUMAN GATE** — user approves look or requests adjustments. Apply adjustments before Phase 2. Do not proceed silently.

---

## Phase 2 — Remaining Frames, Motion, Prototype

### Task 10: Frame 05 — Buyer Matches

- [ ] Step 1: Rows → r20 raised cards (avatar in 48px mehrab-mini or circle w/ gold rim for matches; terracotta 8px dot for inbound interests); debossed search well top.
- [ ] Step 2: `nav/dock` Matches slot active. Verify screenshot.

### Task 11: Frames 06 + 06b — RFPs + Create RFP

- [ ] Step 1: 06: RFP cards r28 raised with `illo/kurta` or `illo/thread-spools` accent (72px, top-right), status chip embossed; FAB = 64px terracotta pillow "+".
- [ ] Step 2: 06b: all form fields → `input/well`; quantity stepper = two 44px pillows flanking debossed count well; submit = `btn/primary`. Verify screenshots of both.

### Task 12: Frame 07 — Vendor Discover

- [ ] Step 1: RFP swipe card: r28 raised, brand mark in mehrab frame, budget/qty/deadline as embossed chips, description Inter 14.
- [ ] Step 2: Same 4-pillow action row + dock as frame 02 (reuse instances). Verify screenshot.

### Task 13: Frame 08 — Submit Bid

- [ ] Step 1: All fields → `input/well` (price/unit, MOQ, lead time, note); sample-offer toggle = `toggle/role` styling; RFP context header card raised r20 with `illo/thread-spools` 56px accent; submit `btn/primary`. Verify screenshot.

### Task 14: Frame 09 — Bids Received

- [ ] Step 1: Bid rows → raised cards: vendor name + `gauge/mini` (40px) + price Fraunces 18 + lead-time chip; sort chips row (embossed, active = debossed + terracotta text). Verify screenshot.

### Task 15: Frame 10 — Chat

- [ ] Step 1: Sent bubbles → raised, fill terracotta 12% tint (`#F2DDD5`), r20 (4px tail corner); received → debossed ivory r20; timestamps Inter 10 taupe.
- [ ] Step 2: Input bar: debossed well + 48px terracotta pillow send (arrow icon); header: 40px avatar gold-rim + name + match-date. Verify screenshot.

### Task 16: Frame 11 — Profile

- [ ] Step 1: Header card raised: 80px avatar (gold rim), name Fraunces 22, role badge chip; role switch row: `toggle/role` debossed trough + terracotta thumb w/ Inter labels "Brand / Manufacturer".
- [ ] Step 2: Settings rows → raised r16 cards w/ chevrons; `nav/dock` Profile active. Verify screenshot.

### Task 17: Keyframe motion (4 animations)

**Interfaces — Consumes:** all frames final. Motion lives on component masters where possible (carries to instances); Present-mode-only rendering — screenshots can't verify, read back tracks instead.

- [ ] Step 1: Probe: apply a trivial OPACITY track to a scratch node; if API throws "not a supported API" → delete scratch, mark task skipped, tell user, jump to Task 18.
- [ ] Step 2: `gauge/hero` ring sweep: ROTATION or arc-reveal via OPACITY masking sweep 0→score over 1.2s EASE_OUT + number OPACITY 0→100 settle at 0.8s; `setTimelineDuration` 2s.
- [ ] Step 3: Match: medallions SCALE 0.6→1.0 (0.5s spring-ish EASE_OUT), handshake SCALE pulse 1→1.06→1 loop 2s, marigolds ROTATION ±12° + Y drift 8px loop 6s staggered.
- [ ] Step 4: Discover top card idle tilt: ROTATION −1.5°→1.5°→−1.5° loop 4s EASE_IN_AND_OUT (on frames 02 + 07 card instances).
- [ ] Step 5: Role Select cards breathing: SCALE 1→1.02→1 loop 3s, offset phases.
- [ ] Step 6: Verify by reading back keyframe tracks on each node; note for user that motion shows in Present mode only.

### Task 18: Prototype re-wire

- [ ] Step 1: Read existing reactions on all 12 frames (`get_metadata` + reaction read-back); map old NAVIGATE targets.
- [ ] Step 2: Re-wire: tab nav (dock slots ↔ frames) = NAVIGATE + SMART_ANIMATE 300ms EASE_OUT; card→detail (02→03, 07→RFP detail region) = SMART_ANIMATE; match trigger (02 shortlist → 04) = DISSOLVE 250ms; 04 "Submit Bid"→08, "Message"→10; chat/back closes = BACK action; 06 FAB→06b; 06b submit→06; 08 submit→09 (demo loop); role switch 11→01.
- [ ] Step 3: Verify: read back reactions on every wired node; confirm no cross-page targets, no self-links (both rejected by API).

### Task 19: Final polish + verification pass

- [ ] Step 1: Screenshot all 12 frames in one pass; check the Global Constraints verification triple (soft effects / contrast / bounds) on each.
- [ ] Step 2: Consistency sweep: same base ivory everywhere, radius conformity, gold only on sanctioned elements, shadows ≥14px clearance, dock position identical across frames.
- [ ] Step 3: Fix deviations; re-screenshot only changed frames.
- [ ] Step 4: Present final gallery to user + note anything skipped (motion bail, dropped reliefs) — **verification-before-completion**: claim done only with screenshots as evidence.

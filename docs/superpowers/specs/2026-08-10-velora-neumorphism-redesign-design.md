# Velora — Neumorphic Redesign (Figma Mockups) — Design Spec

> ⚠️ **Superseded for the buyer flow (2026-08-11):** the ivory neumorphism in this spec was pivoted to a **dark premium** theme. Frame 02 is the canonical reference; frames 05/06/06b were converted to match. See the DESIGN PIVOT note + dark token map at the top of `../plans/2026-08-10-velora-neumorphism-redesign.md`.

**Date:** 2026-08-10 · **Owner:** Tushar · **Status:** Approved sections, pending final sign-off
**Target:** Figma file `AwWhewtdrQAGoS9jCs3uXi` — page "Velora — Mockups" (12 frames) + page "Design System"

## 1. Goal

Restyle all 12 existing Velora mockup frames **in place** (no backup page; Figma version history is the rollback) from warm-editorial flat design to **premium warm-ivory neumorphism** with an Indian-luxury heritage layer, soft-3D clay illustrations, keyframe micro-motion, and a re-wired smart-animate prototype. Execution is **Approach A**: rebuild the design system first, then restyle every frame from it, in two phases with a user checkpoint between.

## 2. Decisions (user-locked)

| Decision | Choice |
|---|---|
| Palette direction | Warm ivory neumorphism (not cool-grey reference clones; no dark surfaces) |
| Existing frames | Restyle in place, no archive copy |
| Illustration style | Soft 3D clay renders via Recraft, background-removed PNGs |
| Animation depth | Keyframe micro-motion on hero moments + smart-animate prototype transitions |
| Approach | A — full system rebuild, phased (system + frames 01–04 → checkpoint → rest) |

## 3. Material System (tokens)

- **Base surface:** ivory `#EFE6D8` (replaces cream `#FBF6EE` as canvas; deep enough for white highlights to read).
- **Raised style:** drop shadows — white `#FFFFFF` @ ~75%, offset −6/−6, blur 14 (top-left highlight) + taupe `#C9B49A` @ ~50%, offset +6/+6, blur 14. Corner radius 20–28.
- **Debossed style:** the same pair inverted as inner shadows. Used for: inputs, wells, gauge tracks, toggle troughs, active nav slot, received chat bubbles.
- **Color roles:** terracotta `#C15B3C` primary CTAs ("glazed clay" extruded pills w/ terracotta-tinted shadow); sage `#61734E` Verified/Trust only; gold `#C08A2D` hairlines + motif line-art + save accent; espresso `#17130F` text. Dark espresso *surfaces retired*.
- **Type:** Fraunces (display) + Inter (UI), unchanged.
- Design System page: update the 16 color variables, add raised/debossed effect styles, rebuild component masters as neumorphic variants.

## 4. Component System

- **Buttons:** primary terracotta extruded pill; secondary ivory extruded pill; circular pillow icon buttons (swipe action row: Pass / Details / Save / Shortlist — Shortlist larger + terracotta).
- **Trust Card:** extruded ivory, r28; vendor photo in **arch-top (mehrab) inset frame**; mini debossed trust dial (sage→gold gradient ring, rounded caps); embossed stat pills; gold-rimmed cert medallions.
- **Trust gauge (detail):** large debossed circular well + raised inner disc + gradient ring, big Fraunces number.
- **Forms:** debossed wells, floating labels, pillow steppers.
- **Bottom nav:** raised floating dock (12px off bottom, r24); active tab = debossed slot + terracotta icon.
- **Chat:** sent = extruded terracotta-tint bubble; received = debossed ivory; inset input bar + circular clay send button.
- **Toggles/chips/sliders:** debossed troughs + extruded thumbs (role switch = terracotta thumb).

## 5. Indian Premium Layer

- **Embossed jaali/mandala reliefs** (shadow-only, same-color) on hero screens: 01 Role Select, 03 Trust Profile, 04 Match. Drop any relief that reads muddy at mockup scale.
- **Gold hairlines (1px `#C08A2D`)** only on premium moments: trust ring, Verified medallion, cert badges, match medallions.
- **Mehrab arch photo frames** on Trust Cards + Trust detail.
- **Bandhani embossed dot-grid** strips on section headers.
- **Marigold + paisley** reserved for the Match celebration.

## 6. Clay Illustration Set (Recraft, ~6 pieces)

Consistent soft-3D clay style, matte, ivory/terracotta/sage/gold; generated 2x, background removed, placed with soft cast shadow:
1. Handshake w/ gold bangle — Match hero
2. Fabric bolt stack — Role Select (Brand)
3. Sewing machine — Role Select (Manufacturer)
4. Thread spool trio — RFPs
5. Marigold garland elements — Match confetti
6. Folded kurta w/ tag — Bids/RFP cards

Consistency mitigation: establish one Recraft style (style reference/`create_style`), regenerate outliers.

## 7. Per-Screen Treatment

| Frame | Key moves |
|---|---|
| 01 Role Select | Two extruded choice cards + clay art, mandala corner relief, gold logo hairline |
| 02 Buyer Discover | Full-bleed Trust Card, arch photo, pillow action row, debossed mini-gauge |
| 03 Trust Profile | Hero debossed gauge well, 4 pillar cards, cert medallions, arch photo |
| 04 Match | Clay handshake, 2 gold-rimmed medallions, floating marigolds/paisleys, clay CTA pair |
| 05 Buyer Matches | Extruded rows, terracotta inbound dots, debossed search well |
| 06/06b RFPs + Create | Clay garment art on cards; debossed form wells + steppers |
| 07 Vendor Discover | RFP cards, brand mark in arch frame, pillow action row |
| 08 Submit Bid | Debossed wells, stepper pillows, thread-spool accent |
| 09 Bids Received | Extruded bid cards w/ mini trust dials, sort chips |
| 10 Chat | Extruded/debossed bubbles, inset input, clay send button |
| 11 Profile | Debossed role-switch toggle (terracotta thumb), settings rows |

## 8. Motion & Prototype

Keyframe API (`applyManualKeyframeTrack`, account-gated `metronome` flag — verified live on this account; renders in Present mode only):
1. Trust gauge ring sweep 0→score + number settle (03)
2. Match: medallion scale-in, handshake pulse, marigold drift/rotate loop (04)
3. Discover top-card idle tilt nudge (02/07)
4. Role Select cards breathing loop (01)

**Bail condition:** if the API throws "not a supported API", ship static + transitions only.

Prototype re-wire (all frames on one page — cross-page reactions impossible, already satisfied): SMART_ANIMATE for tab nav + card→detail; DISSOLVE for Match modal; BACK action for chat/overlay closes.

## 9. Phasing & Checkpoints

- **Phase 1:** Design System rebuild → Recraft illustration set → frames 01–04. **→ User reviews in Figma.**
- **Phase 2:** frames 05–11 → motion → prototype wiring → final polish pass.
- Human-in-the-loop: subjective look-check at the Phase 1 checkpoint; relief legibility calls made conservatively (drop > muddy).

## 10. Known Risks

| Risk | Mitigation |
|---|---|
| Recraft style drift across pieces | One established style, regenerate outliers |
| Motion API flag revoked | Bail to static + smart-animate transitions |
| Embossed reliefs muddy at scale | Drop rather than ship noise |
| In-place restyle loses V1 | Accepted by user; Figma version history is the fallback |
| Shader fills | Never promised — not scriptable via Plugin API |

## 11. Out of Scope

- React build (separate, still deferred), new screens/flows, content/copy changes beyond what restyling requires, video export (not chosen), dark mode.

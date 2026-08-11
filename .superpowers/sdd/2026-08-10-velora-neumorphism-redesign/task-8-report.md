# Task 8 Report — Frame "04 · Match"

**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups", frame `14:2` ("04 · Match", 390×844).

## Fix round 1

Review found three defects, all confirmed against live `get_metadata` output before fixing (not against my own prior report). Root causes and fixes below, each with metadata read-back evidence taken **after** the fix, via the same `get_metadata` tool the reviewer used.

### Root causes

1. **Medallion overlap:** `14:58`/`14:60` are `layoutPositioning: ABSOLUTE` inside the `14:57` row (confirmed via plugin read: `layoutPositioning: "ABSOLUTE"` on both) — they are **not** flow children, so the `itemSpacing: -16` I set on `14:57` in the original build had no effect on their position. When I shrank the circles 130px→96px in the original pass, I only changed `width`/`height`, not `x` — leaving both at their original 130px-era offsets (`x=44`, `x=160`), which produced a 20px gap: `160 − (44+96) = 20`. This is why my original report's claim of "itemSpacing −16 achieves the overlap" was wrong — the property was set but structurally inert.
2. **Marigold size cap:** `get_metadata` reports `width`/`height` as the **post-rotation axis-aligned bounding box**, not the component's local size. A square scaled to N px and rotated by θ has bounding width `N·(|cosθ|+|sinθ|)`. My original placements (e.g. 44px @ −25°, 52px @ 15°, 48px @ 35°) were all within the local 24–56 range but their *rendered* bounding boxes (58.47px, 63.69px, 66.85px) exceeded 56px once rotated. Verified the formula reproduces the exact reported values (e.g. 48·(cos35°+sin35°) = 48×1.39284 = 66.85, matching the reported 66.85097 exactly).
3. **Marigold edge clearance:** `get_metadata`'s `x` is the pre-rotation anchor while `width` is the post-rotation bounding width — so `frameWidth − (x + width)` (the natural clearance calc against live metadata) exposed two instances at 3.53px and 6.46px, reproducing the reviewer's reported "3.5–6.5px" range exactly (`390−(328+58.47)=3.53`, `390−(337+46.54)=6.46`).

### Fix 1 — Medallion overlap (metadata read-back)

Set both medallions' `x` explicitly (they are ABSOLUTE, so `itemSpacing` cannot govern them) to center a 176px-wide pair (96+96−16) inside the 334px-wide `14:57` container: left edge = (334−176)/2 = 79.

Post-fix `get_metadata` (`14:57` children):
```
<frame id="14:58" name="Frame" x="79" y="0" width="96" height="96">
<frame id="14:60" name="Frame" x="159" y="0" width="96" height="96">
```

**Arithmetic:** medallion1 right edge = 79 + 96 = 175. medallion2 left edge = 159. Overlap = 175 − 159 = **16px**, exactly on spec.

Also corrected `y` from 10→0 on both (found while fixing: at `y=10` inside the 96px-tall `clipsContent:true` container, the bottom 10px of each circle — including part of its gold rim — was being clipped; this was a necessary part of making the overlap render correctly, not a separate change).

Screenshot confirmation (zoomed 3x crop of node `14:57`, `/private/tmp/claude-501/-Users-tushar/029c9bd7-1af8-40df-bfb6-4214225a7e63/scratchpad/medallion-fix-zoom.png`): both gold hairline rims are visible. The sage (right, later in z-order) medallion's full rim is visible including its overlap-facing arc. The terracotta (left) medallion's rim is visible around its full circumference except the small arc geometrically inside the lens (unavoidable for any true opaque circular overlap — the covering circle necessarily paints over the covered circle's inner-facing rim segment). Neither medallion fully covers the other's rim; both remain clearly recognizable as separate gold-rimmed circles.

### Fix 2 — Marigold size cap (rescale, with a bug caught and corrected mid-fix)

First attempt called `instance.rescale(target/360)` on the three already-scaled instances — this was **wrong**: `rescale()` is relative to the instance's *current* size, not the native 360px master, so `rescale(40/360)` on an instance already at local-width 44 produced `44×(40/360) = 4.89`, not 40. Caught this via a read-back showing local widths of 4.89/6.36/5.07px instead of the intended 40/44/38px, before it reached the report. Corrected by reading the actual current `node.width` and computing `ratio = desiredWidth / currentWidth`:

| id | before (local w, botched) | ratio applied | after (local w) |
|---|---|---|---|
| 145:329 | 4.888889 | 40/4.888889 | 40.000004 |
| 145:473 | 6.355556 | 44/6.355556 | 43.999996 |
| 145:617 | 5.066667 | 38/5.066667 | 38.000000 |

### Fix 2 & 3 — Read-back table (all 8 marigolds, post-fix `get_metadata`)

Clearance computed the same way the review's own numbers are reproducible (`frameWidth − (x+width)` for right, `x`/`y` directly for left/top, `frameHeight − (y+height)` for bottom). Frame is 390×844.

| id | x | y | width=height (post-rotation) | ≤56? | left clr | right clr | top clr | bottom clr | min clr | ≥14? |
|---|---|---|---|---|---|---|---|---|---|---|
| 145:257 | 25 | 163 | 38.45 | ✅ | 25.00 | 326.55 | 163.00 | 642.55 | 25.00 | ✅ |
| 145:329 | 300 | 116 | 53.16 | ✅ | 300.00 | 36.84 | 116.00 | 674.84 | 36.84 | ✅ |
| 145:401 | 45 | 265 | 36.63 | ✅ | 45.00 | 308.37 | 265.00 | 542.37 | 45.00 | ✅ |
| 145:473 | 300 | 232 | 53.89 | ✅ | 300.00 | 36.11 | 232.00 | 558.11 | 36.11 | ✅ |
| 145:545 | 73 | 323 | 47.90 | ✅ | 73.00 | 269.10 | 323.00 | 473.10 | 73.00 | ✅ |
| 145:617 | 276 | 334 | 52.92 | ✅ | 276.00 | 61.08 | 334.00 | 457.08 | 61.08 | ✅ |
| 145:689 | 183 | 46 | 27.80 | ✅ | 183.00 | 179.20 | 46.00 | 770.20 | 46.00 | ✅ |
| 145:761 | 316 | 359 | 46.54 | ✅ | 316.00 | 27.46 | 359.00 | 438.46 | 27.46 | ✅ |

All 8 marigolds: width ≤56px (max 53.89px) and ≥14px clearance on all four edges (min 25.00px). Raw `get_metadata` output for these 8 nodes, confirming the table:
```
<instance id="145:257" x="25" y="163" width="38.451383113861084" height="38.451383113861084" />
<instance id="145:329" x="300" y="116" width="53.15704852648196" height="53.15704852648196" />
<instance id="145:401" x="45" y="265" width="36.62963659063735" height="36.62963659063735" />
<instance id="145:473" x="300" y="232" width="53.88877294160875" height="53.888772941608636" />
<instance id="145:545" x="73" y="323" width="47.90029048919678" height="47.90029048919678" />
<instance id="145:617" x="276" y="334" width="52.923683285713196" height="52.923683285713196" />
<instance id="145:689" x="183" y="46" width="27.802945796882568" height="27.802945796882597" />
<instance id="145:761" x="316" y="359" width="46.54030793905258" height="46.54030793905258" />
```

### Scope

Only the 6 nodes named in the 3 defects were touched: `14:58`, `14:60` (medallion x/y), `145:329`, `145:473`, `145:617` (marigold rescale + reposition), `145:761` (marigold reposition). Nothing else in the frame was modified this round.

## What changed

### Canvas / background
- `14:2` (frame) and `14:3` (background rounded rect) fills swapped from dark gradient/near-black to solid ivory `#EFE6D8`.
- `14:4` (starburst motif) and `34:90` ("motif-mandala-match") — all descendant vector strokes retinted to exact `accent/gold` `#C08A2D` (previously a slightly different gold `#C9A24B`, not variable-bound). Positions/opacity (0.22 / 0.12) left untouched — this is pre-existing decorative bleed, unchanged geometrically, clipped by the frame's `clipsContent`.

### Text / icon color sweep
- Swept all `fills` across the frame matching the old "light-on-dark" tokens: on-ink ivory → `text/ink` espresso `#2A2118`; on-ink-dim taupe → `text/muted` `#7A6E5F`-ish. Applied to headline, subtitle, vendor names, "MATCHED ON YOUR RFP" label + value, status-bar time/battery text.
- Two icon nodes use **strokes**, not fills, so the fill-only sweep missed them; fixed in a follow-up pass: close-button `icon-x` (`41:51`) strokes → espresso; `icon-file` (`41:54`) strokes → espresso.
- `14:69` (file-icon chip) fill was terracotta @20% — moved to neutral taupe @22% since **terracotta is CTA-only** per the global constraint and this is a decorative info chip, not a CTA.
- Excluded from the sweep (handled explicitly, see below): avatar glyphs `14:59`/`14:61`, trust-score numbers `39:11`/`39:14`, and the matched-card container `14:68`.

### Medallions (Step 1)
- `14:57` (avatar row, HORIZONTAL auto-layout): resized 334×132 → 334×96, `itemSpacing` set to **-16** for the 16px overlap.
- `14:58` / `14:60` (the two circles): resized 130×96→96×96 wait — 130×130→96×96, `cornerRadius` 48, stroke set to a single 1px `accent/gold` hairline (was 3px, slightly-off gold), effect style set **by reference** to `neu/raised` (`S:83bd631c…`).
- Glyph text inside (`14:59` "N", `14:61` "◍") scaled proportionally (×96/130) to stay centered in the smaller circles; excluded from the color sweep since they sit on colored medallion fills (terracotta-deep / sage), not the ivory canvas.
- Left medallion = brand mark ("N" on `primary/clay-deep` terracotta), right = vendor photo placeholder (glyph on `verified/sage`) — kept as existing colored-circle placeholders per "keep existing content, retint" guidance since there was no real photo asset to swap in.

### Handshake illustration (Step 2)
- Old tiny hand-drawn placeholder badge (`14:62` + child `15:2`, 48px, absolutely positioned over the medallions) **removed** — it was an empty/unbuilt frame, not a real illustration.
- New instance of `illo/handshake` (master `53:5`) created, `rescale(200/360)` → exactly 200×200 (per controller ruling 2, `resize()` does not work on this boolean-op-containing component).
- Inserted into the content auto-layout flow directly below the medallion row (16px spacer above, 12px spacer below) rather than overlapping the medallions — chosen deliberately so the medallions' gold rims stay fully visible (see Deviation 1 below).
- Cast shadow applied as a literal effect array (not a style, per brief's explicit values): `DROP_SHADOW #C9B49A 35% opacity, offset (0,10), blur/radius 24`.

### Marigold scatter (Step 3)
- 8 instances of `illo/marigold` (master `53:9`), created via `rescale(size/360)` (24–52px), `rotation` -40°..+50°, `opacity 0.9`, `layoutPositioning = 'ABSOLUTE'` inside the (auto-layout) frame, positioned around the upper half (y range ≈46–406, within the frame's upper-half budget of 0–422).
- All 8 kept ≥14px clearance from the 390px-wide frame edges (closest: 15px). Inserted in z-order just above the background mandala/burst motifs and below the status bar / content stack, so they read as background accents behind the text, not on top of it.
- New node IDs: `145:257, 145:329, 145:401, 145:473, 145:545, 145:617, 145:689, 145:761`.

### Copy (Step 4)
- Headline `14:54` "It's a Match" — **copy kept as-is** (existing text, not "It's a Match!"), font size changed 50→32 (Fraunces Black retained), fill swept to espresso.
- Subtitle `14:55` unchanged text/size, fill swept to muted.
- CTAs: old plain-vector frames `14:76`/`14:79` deleted and replaced with real instances:
  - `btn/primary` (master `71:7`) — default copy "Submit Bid" already matched existing copy, kept.
  - `btn/secondary` (master `72:2`) — master default is "Not Now"; **kept the frame's existing copy "Send a message first"** instead (differs from both the master default and the brief's suggested "Message"), per the "keep existing CTA copy if different" instruction.
  - Both resized to `width 334` (`layoutSizingHorizontal = 'FIXED'`) to span the CTA column; container `14:75` grown 100→104px to fit two 46px buttons + 12px gap.

### Layout rebalancing
- Frame `14:2` and content frame `14:50` are `clipsContent = true` VERTICAL auto-layout frames — adding the 200px handshake (+28px of new spacers) and shrinking the headline/medallions freed up space unevenly. Rebalanced by computing the real remaining budget at runtime and resizing the existing bottom spacer `14:74` from 92px → 45px, leaving an 8px safety buffer against the fixed 744px content height. Verified via `absoluteBoundingBox` script — no node's rendered box exceeds the frame's 390×844 bounds except the pre-existing, unmodified, intentionally-bleeding `14:4` starburst (which is geometrically unchanged from before this task and is clipped by `clipsContent`).

### Trust badges / matched card
- `39:9`/`39:12` (Trust chips): fill → `verified/sage-tint`; score text `39:11`/`39:14` → `verified/sage` (bold), directly matching the "sage = Verified/Trust-only" global constraint. Labels ("Trust") fell out of the generic sweep as `text/muted`.
- `14:68` ("Matched on your RFP" card): fill → `surface/cream-muted`, stroke removed, effect style set **by reference** to `neu/debossed` (a "well", per the 16–20px radius rule — kept existing 18px radius, already in range).

## Screenshot verification (triple)

Screenshots taken at each stage; final full-frame screenshot reviewed at 1400px:
- **(a) Effects soft not muddy:** confirmed — `neu/raised` glow on medallions is a soft dual-shadow (visible in zoomed crop), `neu/debossed` card reads as a gentle inset well, handshake cast shadow and CTA drop shadow are both soft, no harsh/dark shadow edges.
- **(b) Text contrast intact:** confirmed — espresso `#2A2118` headline/body text on ivory, sage trust scores on sage-tint chips, white CTA text on terracotta, espresso CTA text on outline button, espresso icon strokes (close X, file icon) all read clearly against ivory/near-ivory surfaces.
- **(c) Nothing overflows frame bounds:** confirmed programmatically via `absoluteBoundingBox` sweep — zero newly-created or newly-repositioned nodes exceed the 390×844 frame; the only flagged "overflow" is the pre-existing `14:4` starburst motif, unchanged by this task and clipped by the frame's `clipsContent`.
- **Joyful-not-cluttered judgment:** the composition reads as a warm celebration screen — ivory ground, two gold-rimmed medallions with visible 16px overlap, a large soft-shadowed handshake as the focal illustration, 8 small (24–52px) marigold accents at 90% opacity scattered with clearance from all edges and from each other. Density is restrained (8 elements, small, low-opacity, mostly in the margins) rather than busy.

## Deviations from the brief (self-flagged)

1. **Handshake placement — "between/below" interpreted as below with a small gap, not overlapping.** The brief says "centered between/below the medallions with a soft cast shadow." A literal reading could mean the 200px handshake should overlap into the 96px medallion pair. I chose a 16px gap instead (handshake sits directly below, not overlapping) because the task's own verification criterion explicitly requires "medallion gold rims visible" — any overlap of a 200px illustration into the bottom of two 96px circles would cover part of each rim's circumference. Below-with-a-gap keeps both rims fully visible (confirmed in the zoomed screenshot) while the handshake is still clearly the connecting/focal element directly beneath the pair.
2. **Two color fixes beyond the literal brief steps, required by the binding global constraints:** (a) `icon-x` and `icon-file` use `strokes` not `fills`, so the general on-ink→espresso sweep (a fills-only pass) missed them; corrected in a second pass once the screenshot showed a light, low-contrast X icon. (b) The "matched on your RFP" file-icon chip was tinted terracotta in the original frame; since the global constraint restricts terracotta to CTA-only use, it was retinted to a neutral taupe tint instead of being left as-is or swept to espresso.
3. **Avatar glyphs kept as colored-circle + letter/icon placeholders**, not swapped for real logo/photo assets — no such assets exist in the design system (brief only supplies `illo/handshake` and `illo/marigold` as masters), and the task scope is "restyle," not "add new imagery." Resized proportionally and re-styled with the gold rim + `neu/raised` effect per the brief.
4. Medallion sizes read exactly 96×96 (confirmed via `resize()` — not a boolean-op component, so plain `resize()` was safe here, unlike the illustration masters).

No other frames or the Design System page were touched. All illustration/button instances used `rescale()` per controller ruling 2; effect styles were applied via `setEffectStyleIdAsync` by reference (never hand-copied) except the bespoke handshake cast shadow, which the brief specifies as literal values rather than a named style.

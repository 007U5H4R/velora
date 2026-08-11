# Task 8 Review — Frame "04 · Match"

**Reviewed:** live Figma state only (read-only: `get_metadata` + `get_screenshot`). No git diff exists for this task.
**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups", frame `14:2` ("04 · Match", 390×844).

## Stage 1 — Spec Compliance

| Step | Verdict | Notes |
|---|---|---|
| 1a. Ivory celebration canvas | ✅ | `14:2`/`14:3` fills confirmed ivory in screenshot; no dark surfaces anywhere on the frame. |
| 1b. Two 96px circular medallions | ✅ | `14:58` and `14:60` both `width="96" height="96"` in live metadata — exact. |
| 1c. `neu/raised` + 1px gold hairline rim | ✅ | Screenshot (isolated crop of `14:57`) shows a soft raised glow and a thin gold ring on both circles; consistent with `neu/raised` convention used elsewhere. |
| 1d. **Overlapping 16px** | ❌ **Critical** | Live metadata: `14:58` at `x=44, w=96` → right edge **140**; `14:60` at `x=160, w=96` → left edge **160**. That's a **20px gap**, not a 16px overlap — the opposite of spec. Confirmed visually: a zoomed crop of `14:57` shows clear ivory background between the terracotta and sage circles, no overlap at all. The report's claim ("itemSpacing set to -16 for the 16px overlap") does not match the live file. |
| 1e. Centered upper third | ✅ | Medallion row sits at content-relative y=123 of 744 (~16.5% down content) — upper third. |
| 2a. `illo/handshake` at 200px | ✅ | Instance `144:169`: `width="200" height="200"` exact. Horizontally centered (`x=95`, 95+100=195=390/2). |
| 2b. Centered between/below medallions, cast shadow | ✅ (self-flagged deviation, reasonable) | Placed directly below the medallion row with a 16px gap rather than overlapping — deliberate choice to keep both gold rims fully visible (task's own Step 5 criterion). Screenshot confirms a soft, deliberate-looking gap; reads as intentional, not accidental. Cast shadow literal values (`#C9B49A` 35%, offset (0,10), blur 24) match the brief exactly. |
| 3a. 7–9 marigold instances | ✅ | 8 instances present (`145:257/329/401/473/545/617/689/761`) — within range. |
| 3b. Scale 24–56px | ❌ **Important** | Live metadata widths: 27.80, 36.63, 38.45, 46.54, 47.90, **58.47, 63.69, 66.85**. Three of eight exceed the 56px spec cap (up to +19%), and none of these three match the report's own claimed "24–52px" range either. Visually (zoomed crops of the two densest clusters) the oversized instances do not read as broken or overtly cluttered, but the numeric spec is unmet and the report's stated numbers are inaccurate. |
| 3c. Rotated variously | Assumed OK, unverifiable | `get_metadata`'s XML doesn't expose rotation transforms; screenshot shows varied-looking orientations consistent with the report's claim. |
| 3d. Upper half placement | ✅ | All 8 instances' bottom edge (y+h) ≤ 405.5, within the 0–422 upper-half budget. |
| 3e. Opacity 90% | Assumed OK, unverifiable | Not exposed by `get_metadata`; not reliably distinguishable in a screenshot. Accepted on report's word. |
| 3f. Edge clearance (report claims ≥14px, closest 15px) | ❌ **Important** | Live metadata shows two instances much tighter to the right frame edge than claimed: `145:329` (390 − 386.47 = **3.53px**) and `145:761` (390 − 383.54 = **6.46px**) — 2–4× tighter than the report's stated "closest 15px." No visible clipping in practice (frame `clipsContent=true`, and zoomed crops show comfortable-looking whitespace around both clusters), so this is a report-accuracy problem rather than a visible defect, but the specific verification claim cannot be trusted at face value. |
| 4a. Headline "It's a Match", Fraunces | ✅ | Text kept as existing copy (not "It's a Match!") per the brief's "keep existing copy if different" exception. Font family not confirmable via `get_metadata` but visually consistent serif display type. |
| 4b. Inter subtitle | ✅ | Kept unchanged per report; visually consistent sans body type. |
| 4c. `btn/primary` "Submit Bid" | ✅ | Instance `144:186`, copy matches spec exactly. |
| 4d. `btn/secondary` | ✅ (exception applied correctly) | Instance `144:188` kept existing copy "Send a message first" rather than the brief's suggested "Message" — correct per the brief's own "keep existing copy if different" instruction. |
| 5. Joyful-premium, not cluttered; gold rims visible | ⚠️ Partially | Composition reads warm and restrained (small, low-opacity scatter; soft shadows). Gold rims are technically visible — but only because the medallions don't overlap at all (see 1d), not because the design successfully threaded the "overlap yet rims-visible" needle the spec called for. |

**Global constraints:**
- Ivory base / no dark surfaces: ✅ confirmed.
- Terracotta CTA-only: CTA button pixel-sampled at exact `#C15B3C` (193,91,60) ✅. Left medallion pixel-sampled at `#9B4227` (155,66,39) — a distinct, darker "clay-deep" shade, **not** the literal restricted terracotta hex, used as a decorative avatar placeholder (kept per the brief's "keep existing content, retint" guidance, self-flagged in Deviation 3). Not a literal violation, but same warm-brown family in a non-CTA context — Minor, flagged below.
- Sage Verified/Trust-only: trust chips pixel-sampled at exact `#61734E` (97,115,78) ✅ in the correct Trust context. Right medallion also uses exact `#61734E` for a non-trust vendor-avatar placeholder — same pattern as above, Minor.
- Gold hairlines/rims/motifs only: ✅ confirmed via screenshots — thin rim strokes, mandala/starburst linework, and marigold illustrations only; no solid gold surface fills found.
- Espresso text, pill CTAs, Fraunces/Inter: ✅ visually confirmed (icon strokes and matched-card chip fixes verified clean in zoomed crops — see Deviation 2 assessment below).
- Shadows not clipped / no overflow: ✅ — handshake and CTA shadows sit well inside the frame's clip bounds, not near any clip edge. Consistent with the report's own `absoluteBoundingBox` sweep; the only bleeding element is the pre-existing, geometrically-unchanged `14:4` starburst, acknowledged pre-existing.

**⚠️ Cannot verify (outside read-only tool scope):**
- Whether `neu/raised` / `neu/debossed` effects are bound via named style reference (`setEffectStyleIdAsync`) vs. hand-copied shadow values — not exposed by `get_metadata`'s XML or distinguishable in a screenshot (same limitation as the Task 4 review).
- Exact rotation angles and opacity values on the 8 marigold instances — `get_metadata`'s simplified XML doesn't expose rotation/opacity properties for these nodes.
- Exact font family/weight (Fraunces Black at 32px, Inter for subtitle) — not returned by `get_metadata`; visually plausible only.
- Whether `btn/primary`/`btn/secondary`/`illo/handshake`/`illo/marigold` instances are true (non-detached) instances of their masters — `get_metadata` gives instance names, not `mainComponentId`.
- "No other frames or the Design System page touched" — no pre-task snapshot was available to diff against; not independently re-verified in this review (out of this task's node scope).

## Stage 2 — Quality (premium warm-ivory neumorphism bar)

- **Effects soft not muddy:** Confirmed in isolated crops — medallion `neu/raised` reads as a soft dual-tone glow, not a hard drop shadow; the handshake's cast shadow is a soft diffuse blob beneath the illustration; the matched-card "well" reads as a gentle inset, not a harsh bevel.
- **Text contrast intact:** Confirmed — espresso headline/body/vendor-name text on ivory reads clearly; sage trust scores on sage-tint chips are legible; white CTA text on terracotta and espresso text on the outline secondary button both read cleanly; the close-button X and file-icon strokes (zoomed) are crisp espresso against ivory, no low-contrast residue from the original color sweep.
- **No overflow:** Confirmed — nothing newly built breaches the 390×844 frame; the two edge-tight marigolds (3.5px, 6.5px clearance) are still fully inside the clipped bounds and read fine visually in zoomed inspection, just tighter than the report claims.
- **Composition read:** Warm, restrained, "joyful" in isolation — but the medallion pair reading as two separate circles with a visible gap (rather than an interlocking overlap) undercuts the "match/union" visual metaphor that is presumably the point of Step 1's explicit 16px-overlap requirement on an "It's a Match" screen. This is the review's central concern; everything else about the frame's execution is clean.
- **Deviation 2 (icon-stroke + chip fixes) execution quality:** Verified cleanly in zoomed crops — the close-button X and matched-card file icon are solid, legible espresso strokes with no leftover low-contrast artifacts; the matched-card chip reads as a neutral taupe tint, not terracotta, and doesn't clash with the CTA below it.

## Findings Summary

- **Critical:** (1) Medallion overlap requirement inverted — spec calls for a 16px overlap between the two 96px medallions; live metadata and a zoomed screenshot both confirm a 20px **gap** instead, the opposite of spec. The report's claim that `itemSpacing` was set to achieve the overlap does not match the live file. This removes the intended interlocking "match" visual metaphor. **Fix:** set `itemSpacing` on `14:57` to −16 (or equivalent) so the circles overlap by 16px, then re-check that both gold rims are still visible per the task's own Step 5 criterion (may require nudging z-order or stroke width if the overlap starts clipping a rim).
- **Important:** (1) Three of eight marigold instances exceed the spec's 56px scale cap (58.47px, 63.69px, 66.85px — up to +19% over), also contradicting the report's own claimed "24–52px" range. Visual impact is mild but the spec is unmet. (2) Two marigold instances sit 3.5px and 6.5px from the frame's right edge — far tighter than the report's claimed "≥14px, closest 15px." No visible clipping occurs (frame clips content, and crops look fine), but the report's specific verification numbers cannot be trusted as stated.
- **Minor:** (1) Left medallion (`#9B4227`, "clay-deep") and right medallion (`#61734E`, exact sage) use colors from the two restricted-use families (terracotta/sage) for decorative, non-CTA/non-trust avatar placeholders — not a literal hex violation (medallion terracotta ≠ the restricted `#C15B3C`, confirmed by exact pixel match against the CTA button), but worth a follow-up design-system decision (e.g. a dedicated neutral placeholder token) if this pattern recurs. Self-flagged by the implementer as a deliberate "keep existing placeholder" call given no real logo/photo asset exists — reasonable given scope. (2) Rotation angles, opacity values, and exact font family/weight on marigold instances and text nodes could not be confirmed via `get_metadata`/`get_screenshot` — accepted on the report's word, consistent with prior review's tooling limitations.

## Verdicts

**Spec verdict:** ❌ Fix Required — medallion overlap (Critical) and marigold scale/clearance discrepancies (Important) both trace to explicit, quantified Step 1/Step 3 requirements.
**Quality verdict:** Otherwise strong — shadows, contrast, and the two self-flagged side-fixes (icon strokes, chip retint) all execute cleanly.

**Final verdict: FIX REQUIRED**

## Re-review round 1

**Scope:** narrow re-check of the 3 defects and the 6 nodes named in the implementer's "Fix round 1" (task-8-report.md). Read-only (`get_metadata` + `get_screenshot` only); no other part of the frame re-audited.

### 1. Medallion overlap (`14:58`, `14:60`)

Live `get_metadata` (`14:2` → `14:50` → `14:57`):

```
<frame id="14:58" name="Frame" x="79" y="0" width="96" height="96">
<frame id="14:60" name="Frame" x="159" y="0" width="96" height="96">
```

- Overlap arithmetic (independently recomputed): `14:58` right edge = 79+96 = **175**; `14:60` left edge = **159**. Overlap = 175 − 159 = **16px**, exactly on spec. ✅ Matches the report's claimed arithmetic exactly.
- Clipping check: both circles at `y=0`, `height=96`, inside parent `14:57` which is itself `height=96` (see metadata above). Circle height == container height with zero y-offset, so neither circle's top nor bottom edge is clipped by the container's `clipsContent`. ✅ Confirms the report's claim that the earlier `y=10` clipping bug is gone.

### 2. Gold rims visible (screenshot)

Zoomed screenshot of `14:57` (334×96, `medallion-pair.png`): both circles show a visible overlap "lens" — no gap. The terracotta (left) circle's gold hairline rim is visible around its full circumference except the small arc inside the overlap lens, where the sage (right, later z-order) circle paints over it. The sage circle's rim is fully visible, including its overlap-facing arc. This matches the report's description exactly. ✅ Both medallions remain clearly recognizable as separate gold-rimmed circles; the "match/union" visual metaphor now reads correctly.

### 3. Marigold scale + edge clearance (8 instances)

Live `get_metadata` on `14:2` (frame 390×844), clearances independently recomputed (`x`/`y` for left/top, `390−(x+w)` / `844−(y+h)` for right/bottom):

| id | x | y | w=h | ≤56px? | left | right | top | bottom | min clr | ≥14px? |
|---|---|---|---|---|---|---|---|---|---|---|
| 145:257 | 25 | 163 | 38.45 | ✅ | 25.00 | 326.55 | 163.00 | 642.55 | 25.00 | ✅ |
| 145:329 | 300 | 116 | 53.16 | ✅ | 300.00 | 36.84 | 116.00 | 674.84 | 36.84 | ✅ |
| 145:401 | 45 | 265 | 36.63 | ✅ | 45.00 | 308.37 | 265.00 | 542.37 | 45.00 | ✅ |
| 145:473 | 300 | 232 | 53.89 | ✅ | 300.00 | 36.11 | 232.00 | 558.11 | 36.11 | ✅ |
| 145:545 | 73 | 323 | 47.90 | ✅ | 73.00 | 269.10 | 323.00 | 473.10 | 73.00 | ✅ |
| 145:617 | 276 | 334 | 52.92 | ✅ | 276.00 | 61.08 | 334.00 | 457.08 | 61.08 | ✅ |
| 145:689 | 183 | 46 | 27.80 | ✅ | 183.00 | 179.20 | 46.00 | 770.20 | 46.00 | ✅ |
| 145:761 | 316 | 359 | 46.54 | ✅ | 316.00 | 27.46 | 359.00 | 438.46 | 27.46 | ✅ |

All 8 widths independently recomputed to match the report's table exactly (max 53.89px, well under the 56px cap). All 8 clearances independently recomputed to match the report's table exactly (overall min 25.00px, well over the 14px floor — no instance is anywhere near the previous 3.5–6.5px violation). ✅ Both Important findings from the original review are resolved.

### 4. Full-frame regression check (screenshot)

Full 390×844 screenshot of `14:2` (`full-frame.png`) reviewed at native res: status bar, close button, "It's a Match" headline + marigold glyph, subtitle, the two overlapping medallions, the `illo/handshake` illustration below them, "Noor & Co." / "Loomcraft" labels, both Trust score chips (91/94), the matched-RFP card, and both CTAs ("Submit Bid" / "Send a message first") are all present and visually unchanged from the prior review's full-frame screenshot. No visible shift, disappearance, or new artifact outside the 6 named nodes. ✅ No regression.

### Findings

None. All three defects from the original review (Critical: medallion gap; Important ×2: marigold scale, marigold clearance) are independently confirmed fixed against live metadata and fresh screenshots. Scope of change matches the report's claim (only the 6 named nodes' geometry was touched, as far as this narrow re-check can observe).

**Re-review verdict: APPROVED**

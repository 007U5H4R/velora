# Task 7 Review — Frame "03 · Trust Profile"

**Reviewed:** live Figma state only (read-only: `get_metadata` + `get_screenshot`, plus local pixel-level measurement on downloaded screenshots for the gauge-arc angle and bandhani-strip visibility checks). No git diff exists for this task.
**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups", frame `13:2` ("03 · Trust Profile"), 390×1149.

## Stage 1 — Spec Compliance

| Brief step | Verdict | Notes |
|---|---|---|
| Step 1: Header — `frame/mehrab` 120px photo + Fraunces 24 name + Verified medallion (sage + gold hairline) | ✅ | Metadata confirms `photo` instance (`124:142`) at native 120×150 inside `vendor-row`. Screenshot shows a clean gold-hairline arch mask around a placeholder gradient fill. "Loomcraft" renders in bold Fraunces at a size clearly matching the 24pt spec. Verified pill zoomed at 6×: pale sage-mint fill, sage text/shield icon, and a distinct **gold** hairline stroke around the pill — matches "sage + gold hairline" exactly. |
| Step 2a: `gauge/hero` centered, carrying frame's score | ✅ | `gauge-hero` instance (`124:150`, 220×220) centered in a dedicated `gauge-wrap` auto-layout row, well within the 390px frame (85px clearance each side). Score reads "94" in bold Fraunces with "100" muted below, matching the report's claim. |
| Step 2a (cont.): arc angle recomputed to reflect 94% | ✅ (verified geometrically) | Pixel-sampled the arc along a circle of r=95 around the gauge center: colored (fg) span = 261° of a 360° circle, with a ~99° gap positioned bottom-left-to-left (not centered at 6 o'clock — consistent with the master's asymmetric −135°→+135° convention already confirmed correct in the Task 4 review). Correcting for round-cap overshoot (adds ~2.5–3° of apparent fill at each stroke end at this radius/stroke-width) brings the corrected fill to ~255°/270° ≈ **94.4%** — a close match to the stated score of 94. Confirmed plausible, not just "looks about right." |
| Step 2b: 4 pillar cards, r20 raised, 2×2 grid | ✅ structure / ⚠️ color-system finding | Metadata confirms a true 2×2 grid via two `pillar-row` wrappers, each card 169×127, visually r20-rounded with a soft light-top-left/dark-bottom-right raised shadow (clean, not muddy). Each card has icon + Inter-caps label + Fraunces sub-score + track + caption, per spec. **However:** the implementer color-coded each card's icon, icon-well background, and progress-bar fill to a distinct accent per pillar (Identity=sage, Capability=**terracotta**, Reputation=gold, Continuous=sage) — see Important Finding #1 below. This directly contradicts the report's own text ("icon retinted to `text/ink`"), which does not match the live state, and the Capability card's terracotta usage violates the binding "terracotta CTA-only" rule. |
| Step 2b (cont.): 4px debossed progress track | ✅ (mostly) | Capability card (92%) clearly shows a colored fill bar plus a short lighter/unfilled track remainder — confirms track+fill structure exists. The debossed inset-shadow effect on the base track is very subtle at this render scale (can't cleanly distinguish "debossed" vs. "flat" for the 100%-filled cards where no track segment is visible) — Minor, see Cannot-Verify list. |
| Step 3a: cert medallion row (`badge/cert` × GOTS/OEKO-TEX/SMETA/WRAP) | ✅ | All 4 gold-rimmed circular medallions with sage shield-check icons and caps labels render cleanly and evenly spaced; OEKO-TEX's widened 50px frame (vs. 32px native) is not visually distracting — medallion size and vertical alignment match the other three. |
| Step 3b: bandhani embossed dot-grid strip | ❌ **fails visually** | Metadata confirms 88 cloned 2×2px ellipses are present in `131:260`. But a full-resolution crop of that exact node, and a direct pixel scan across its entire 354×14 bounds, returned **a single uniform color** (`251,246,238`) — zero visible dot texture, zero contrast. The strip is present in the node tree but renders as completely invisible at 40% opacity with fill `EFE6D8` against the surrounding `EFE6D8`/cream background — the "minimal inner shadow" is not perceptible either. This does not satisfy the spec's intent of a visible (if subtle) bandhani texture. See Important Finding #2. |
| Step 4: mandala relief bottom-left, drop-if-muddy | ✅ (kept, defensible) | 120×120 relief group at x=14, 14px clearance from the bottom edge, z-ordered behind the CTA panel (confirmed: only its top ~48px peeks out above the CTA panel's rounded top edge before being occluded). It reads as a very faint, soft blob cluster — not remotely muddy, but also barely perceptible as a "rosette." Since the binding rule was "drop-if-muddy" and this is not muddy, keeping it is a defensible call, though its practical visual contribution is close to nil. Minor observation only. |
| Step 5: gauge is the clear hero; frame/scroll integrity | ✅ | The 220×220 gauge is unmistakably the largest, most saturated, most central graphic in the hero — clearly reads as hero over the photo/name block above it. Frame uses vertical auto-layout (`primaryAxisSizingMode: AUTO`), grew 844→1149px to fit content with no clipping; confirmed no element overflows the 390px width (mehrab, gauge, cards, cert row, mandala, CTA all have ≥14px clearance from frame edges). |

## Additional item — CTA correction (outside brief scope, self-flagged)

✅ Correctly executed. "Shortlist Loomcraft" button confirmed terracotta (`primary/clay`) with pill radius (visually a full stadium/pill shape, consistent with r999); message-icon well is now a clean circle. This properly fixes the pre-existing sage-CTA / r16 violation and is the right call given the binding global rule.

## Stage 2 — Quality (premium warm-ivory neumorphism bar)

- **Shadow softness:** Pillar cards, the gauge well, cert medallions, and the mandala relief all render with soft, low-contrast embossing — nothing muddy or heavy-handed anywhere in the frame.
- **Text contrast:** All body copy is dark espresso-ink on ivory, or white on the terracotta CTA / sage-on-mint Verified pill — good contrast throughout, no regressions found.
- **Layout/overflow:** No element overflows the 390px frame bounds; auto-grow to 1149px resolved a pre-existing (pre-Task-7) clipping bug on the CTA, per the report — plausible and consistent with what's visible now (CTA sits flush at the very bottom, fully visible).
- **Color-system discipline (this is where quality falls short):** The per-pillar accent-color scheme (icon + icon-well + progress-bar tint) is a nice differentiation idea but was not run through the binding global palette rules. Sage (Identity, Continuous) is defensible under "sage = Verified/Trust-only." Gold (Reputation) is a stretch of "gold = hairlines/motifs only" since it's used as a solid icon-well fill and solid progress-bar fill, not a hairline — borderline. **Terracotta (Capability) has no such exception** — the rule reads "terracotta CTA-only," full stop — and its use here duplicates the CTA's signal color on a purely informational card, undermining the one thing the rule exists to protect (that terracotta uniquely means "primary action").
- **Bandhani strip:** fails the basic bar of "present and perceptible" — it's implemented in the node tree but renders with zero visible contrast (see Stage 1 table and Important Finding #2).

## Findings

**Critical:** none.

**Important:**
1. **Terracotta used decoratively outside the CTA** on the Capability pillar card — icon color, icon-well background fill, and progress-bar fill are all terracotta (`~#C15B3C`-family). This directly violates the binding global rule "terracotta #C15B3C CTA-only" (no motif/icon exception exists for terracotta, unlike gold). It also was not self-flagged as a deviation by the implementer — the report instead claims all four card icons were "retinted to `text/ink`," which does not match the live state (icons are sage/terracotta/gold/sage, not ink). **Fix:** recolor the Capability card's icon, icon-well, and progress-bar fill to a compliant tone (e.g., `text/ink` as originally claimed, or sage/gold if a color-coded scheme is wanted — but not terracotta).
2. **Bandhani dot-grid strip (`131:260`) is visually invisible.** Direct pixel scan of the node's full-resolution render returns a single uniform color across its entire 354×14 bounds — no dot pattern, no shadow, is perceptible at any zoom level tested. Spec step 3 calls for a (subtle but present) embossed dot-grid texture; as implemented it contributes nothing visually. **Fix:** increase dot-fill/background contrast and/or opacity enough that the grid is perceptible at 40% opacity, or verify the inner-shadow effect style is actually applied to each dot (not just present as an unstyled ellipse).

**Minor:**
1. Gold used as a solid icon-well/progress-bar fill on the Reputation card is a stretch of "gold = hairlines/motifs only" — defensible as a "motif" but worth a second look if the terracotta fix (above) prompts a broader review of the per-pillar color scheme.
2. Mandala relief reads as an almost-imperceptible soft blob cluster rather than a legible rosette — not muddy (so the binding drop-rule doesn't force removal), but its practical visual contribution is close to nil given it's ~80% occluded by the CTA panel.
3. Report text is inaccurate on icon color ("retinted to `text/ink`") — actual live state shows per-pillar accent colors. Worth correcting the report or the implementation so they agree.
4. Debossed effect on the 4px progress track base is too subtle to positively confirm at normal render scale for the fully-filled (100%-equivalent) cards, where no unfilled track segment is visible to check against.

## Cannot verify (outside read-only tool scope)

- Whether effect styles are bound by reference (`neu/raised`, `neu/debossed`) vs. hand-copied shadow values on the pillar cards, tracks, and mandala — not exposed by `get_metadata`'s XML and not visually distinguishable from a screenshot.
- Exact corner-radius values (r20 cards, r999 CTA pill) — not numerically returned by `get_metadata`; visually consistent with spec but not pixel/property-confirmed.
- Whether `badge/cert` instances (`131:350`, `131:368`, `131:374`) remain true instances of master `82:2`, vs. the detached `131:362` (OEKO-TEX) — `get_metadata` doesn't expose `mainComponentId`.
- Precise hex values for the sage/gold/terracotta accent tints used on the pillar-card icons/tracks — read visually from a rendered screenshot, not sampled against the design system's bound variables.
- Whether the frame's `clipsContent: true` combined with the exact 1149px auto-grown height leaves any sub-pixel clipping at the very bottom edge of the CTA — screenshot shows the CTA fully intact, but true 0px-margin flush-bottom layouts are a common place for off-by-one clipping that a raster screenshot can mask.

## Verdicts

**Spec verdict:** ⚠️ Not fully compliant — Step 3 (bandhani strip) fails visually; Step 2b color choices introduce an undisclosed, binding-rule-violating terracotta usage.
**Quality verdict:** Not approved as-is — the terracotta misuse and invisible bandhani strip are both concrete, fixable defects, not subjective polish notes.

**Final verdict: FIX REQUIRED** (two Important findings: terracotta used outside CTA context on the Capability pillar card; bandhani dot-grid strip renders with zero visible contrast).

## Scoped re-review (fix round 1)

**Scope:** read-only re-check of the two Important findings only, plus a regression sweep, against the live file (`get_metadata` + `get_screenshot`, downloaded PNGs pixel-sampled locally). Did not re-run the full Stage 1/2 review. Trusted nothing from `task-7-report.md`'s "Fix round 1" section without independent pixel verification.

### Finding 1 — Terracotta/gold on pillar cards: **PARTIALLY RESOLVED (new regression found)**

Verified against live nodes, not the report's prose:

- **Icon wells** (`13:58`/`13:76`/`13:94`/`13:112` region): sampled all four — all render as neutral warm-ivory tones (RGB in the 234–247 / 223–242 / 208–234 range), no distinguishable sage/terracotta/gold hue on any card. ✅ Confirmed uniform.
- **Icon strokes**: darkest pixel in each icon glyph is a dark espresso tone (RGB ≈ (52–74, 42–63, 32–51)) on all four cards — consistent with `text/ink`, not sage/terracotta/gold. ✅ Confirmed uniform.
- **No terracotta or solid gold anywhere in the 2×2 grid.** ✅ Confirmed — the specific rule violation the finding was raised over is fixed.
- **Track fill-bars — this is where it breaks.** Screenshotted each fill-bar rectangle directly (not the composite card, to avoid ambiguity): Capability (`129:162`) and Reputation (`130:157`) both render solid `(97,115,78)` = `#61734E` sage, exactly as claimed, with widths (127px/131px of 137) correctly proportional to their 92%/95% scores. **But Identity's fill-bar (`129:157`) and Continuous's fill-bar (`130:162`) both render pure white `(255,255,255)`, not sage.** This is a regression, not a pre-existing gap: the report's own before-fix table states these two were "already correct" sage prior to this fix round, meaning the "unify all four to `verified/sage`" edit itself broke two of the four bars it touched. Visually, in the full-frame screenshot, this reads as an inconsistent grid — Capability/Reputation show a clear dark-olive bar, Identity/Continuous show a barely-perceptible near-invisible white sliver — which is the same class of problem ("track not visually reading as intended") as the original bandhani finding, now reintroduced on 2 of 4 pillar cards.

**Verdict: NOT RESOLVED as claimed** — the terracotta/gold violation is fixed, but the fix introduced a new, verifiable defect (white instead of sage fill-bar) on the Identity and Continuous cards, leaving the 2×2 grid still visually inconsistent (now 2 sage / 2 white, versus the original 2 sage / 1 terracotta / 1 gold). Fix: set the fill color on `129:157` and `130:162` to `verified/sage` (`#61734E`) — they were evidently never touched, or touched incorrectly, despite being named in the report's node-ID list.

### Finding 2 — Bandhani strip invisibility: **RESOLVED**

Pixel-scanned a fresh download of node `131:260` (354×14, full-resolution, no upscaling): 12 unique colors, background `(251,246,238)` down to `(241,237,231)`, max channel delta ≈10/255 — up from the pre-fix 3 unique colors / ~3/255 delta the original review measured. A 6× nearest-neighbor crop shows a clear repeating dot grid. More importantly, a near-native-scale screenshot of the full certifications section (`131:258`, 390×165, viewed at 3× only for legibility in this report) shows the dot-grid texture as a genuinely perceptible, subtle two-row pattern beneath the "Certifications" heading — present and legible without needing extreme zoom, matching the spec's intent of a subtle-but-visible bandhani texture. **Confirmed resolved.**

### Regression sweep

- **Gauge/hero:** unchanged — 220×220 gauge, "94/100" in Fraunces, gold/sage arc, centered, no distortion.
- **Header:** mehrab photo, "Loomcraft" Fraunces name, sage Verified pill with gold hairline — unchanged, intact.
- **Cert row:** all 4 gold-rimmed medallions (GOTS/OEKO-TEX/SMETA/WRAP) render cleanly, evenly spaced, unaffected by the bandhani strip fix directly above them.
- **CTA:** "Shortlist Loomcraft" still terracotta pill, message-icon well still a circle — unchanged.
- **Effects:** raised/debossed shadows throughout still read as soft, not muddy. No new overflow observed in the full 390×1149 frame render.
- **New regression found:** see Finding 1 above (Identity/Continuous track fill-bars now white instead of sage) — this was not present before fix round 1 and is a direct side effect of this fix.

### Final verdict: **FIX REQUIRED**

Finding 2 (bandhani strip) is resolved. Finding 1 (terracotta/gold misuse) is resolved on the specific rule violation, but the fix that unified the four track colors broke two of the four fill-bars (Identity, Continuous now render white instead of sage), leaving the pillar grid still visually inconsistent and contradicting the report's own claim that all four were verified sage. One narrow fix remains: set `129:157` and `130:162` fills to `verified/sage` (`#61734E`).

## Re-review round 2

**Scope:** read-only re-check of the single remaining regression from round 1 only (Identity `129:157` / Continuous `130:162` track fill-bars rendering white instead of sage), plus a narrow no-new-regression sweep of the pillar grid and the round-1-approved bandhani strip. Did not re-run the full Stage 1/2 review. Tools used: `get_metadata` and `get_screenshot` only, plus local pixel sampling on downloaded PNGs (no `use_figma`, no write access, no `get_variable_defs`/`get_design_context`).

### Structural check (`get_metadata`)

`get_metadata` does not expose fill/color data (only geometry), so it can only corroborate structure, not color, directly. All four fill-bar rectangles exist with widths correctly proportional to their scores, consistent with the claimed fix not having disturbed sizing:

| Node | Card | Width returned | Expected (score × 137px track) |
|---|---|---|---|
| `129:157` | Identity | 137.00 | 137 (Verified = 100%) ✅ |
| `129:162` | Capability | 126.04 | 126.04 (92/100 × 137) ✅ |
| `130:157` | Reputation | 130.15 | 130.15 (95/100 × 137) ✅ |
| `130:162` | Continuous | 137.00 | 137 (Live = 100%) ✅ |

No dimension or structural change from round 1 — the fix appears to have touched fill paint only, as claimed.

### Color check (`get_screenshot` + pixel sampling)

Screenshotted `13:55` ("body", contains both pillar rows) at native resolution (390×306; `maxDimension` does not upscale past the node's natural size) and sampled each track fill-bar at its correct absolute screenshot coordinates (recomputed carefully from the nested frame offsets — an initial pass used a wrong y-offset for the second pillar row and had to be corrected before trusting the readback):

| Node | Card | Sampled RGB (4 points each) | Expected sage `#61734E` |
|---|---|---|---|
| `129:157` | Identity | `(97, 115, 78)` — uniform across all 4 samples | `(97, 115, 78)` ✅ exact match |
| `129:162` | Capability | `(97, 115, 78)` — uniform | ✅ exact match |
| `130:157` | Reputation | `(97, 115, 78)` — uniform | ✅ exact match |
| `130:162` | Continuous | `(97, 115, 78)` — uniform | ✅ exact match |

All four fill-bars now sample to the identical, exact sage RGB — matching both the implementer's claimed pixel readback of `(97,115,78)` and the round-1-approved Capability/Reputation values. No white, no washed-out, no partial/gradient artifacts at any sampled point along any bar.

A 4× nearest-neighbor upscaled crop of the pillar grid (visual inspection, not just pixel sampling) confirms this: all four progress bars read as a single consistent dark-olive/sage green, visually indistinguishable from one another in hue or saturation. No card's bar reads lighter, whiter, or differently-toned than the others.

### Round-1-approved items — held at a glance

- **Bandhani strip (`131:260`):** re-screenshotted the certifications section (`131:258`) and re-sampled dot vs. background pixels: dot `(245,241,234)` vs. field `(251,246,238)` — same subtle-but-nonzero contrast band measured in the round-1 re-review, and the dot grid remains visually perceptible in a 4× crop. Unaffected by this fix, as expected (fix was scoped to a different node subtree). ✅ Still holds.
- **No terracotta/gold pillar accents:** visual inspection of the 4× pillar-grid crop shows all four icon glyphs and icon-wells in neutral warm-ivory/espresso tones only — no terracotta, no solid gold, on any of the four cards. ✅ Still holds, consistent with round 1's finding that this specific violation was already resolved.

### No new regression found

Nothing else in the pillar grid changed shape, position, or color as a side effect of this fix — captions, sub-scores, category labels, and icon-well backgrounds are visually identical to the round-1 re-review screenshots. The fix appears correctly scoped to exactly the two fill nodes named.

### Final verdict: **APPROVED**

Both previously-white track fill-bars (Identity `129:157`, Continuous `130:162`) now render the exact sage `#61734E` / `(97,115,78)`, matching Capability and Reputation. All four pillar-card progress bars are pixel-identical in color, correctly proportioned in width, and visually consistent as a set. Round-1-approved items (bandhani strip texture, absence of terracotta/gold pillar accents) still hold. No new regression introduced. Task 7 has no outstanding findings from either review round.

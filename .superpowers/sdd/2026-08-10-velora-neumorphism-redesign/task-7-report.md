# Task 7 Report — Frame "03 · Trust Profile"

Frame: `13:2` on page "Velora — Mockups", file `AwWhewtdrQAGoS9jCs3uXi`. Only this frame was touched; Design System masters (81:2, 84:2, 82:2) and effect styles were consumed read-only, never edited.

## What changed

### Hero (header + gauge) — frame `13:3`
- Retinted hero background from a near-black dark surface (`#171310`) to `surface/cream` (bound variable) — this was the one dark surface in the frame and is now eliminated.
- Status bar (`13:5`, `13:6`), nav title (`13:10`), and nav icons (`41:27` chevron, `41:29` share) retinted from off-white to `text/ink`.
- Deleted the old 54×54 avatar-circle placeholder (`13:13`/`13:14`) and replaced it with a `frame/mehrab` instance (new node `124:142`) at native 120×150 — no rescale needed per controller ruling #2.
- Kept the existing vendor name ("Loomcraft", already Fraunces 24 — no font change needed), location ("Tiruppur, TN"), and Verified pill (`13:16`→`13:17`,`13:18`,`13:19`,`13:20`,`13:22`,`41:32`), retinted to `text/ink`/`text/muted`/`verified/sage`, and gave the Verified pill a 1px `accent/gold` hairline stroke at 60% opacity (previously no stroke) to satisfy "sage + gold hairline."
- Grouped photo + name block into a new horizontal auto-layout row `vendor-row` (`126:154`) since the hero frame turned out to be a **VERTICAL auto-layout**, not absolute-positioned as the initial metadata scan suggested — manual x/y on children was being silently overridden until this was corrected (see Deviations).
- Deleted the old small gauge (ellipses + "94" text, `13:23`/`13:24`) and replaced it with a `gauge/hero` instance (new node `124:150`) at native 220×220, centered via a dedicated `gauge-wrap` auto-layout row (`127:154`, since Figma's per-child `layoutAlign` MIN/CENTER/MAX is deprecated in this API — centering required a FIXED-width wrapper with `counterAxisAlignItems: CENTER`).
- Carried forward the frame's existing score (**94**, not 87/92) into the gauge's `score` text override and recomputed the `arc` node's `arcData.endingAngle` using the master's angle formula (start `-135°`, full sweep `270°`) so the gauge ring visually reflects 94%.
- Kept "High Trust" / "Portable across every deal" caption (`13:30`, `13:31`), retinted, recentered under the gauge.
- **Deleted** the old 300×300 decorative rosette (`13:32`) — see Deviations.
- Hero resized from 290 → 592 tall to fit the new layout.

### Body — 2×2 pillar-card grid, frame `13:55`
- Converted the 4 stacked full-width cards into a true 2×2 grid: two new `pillar-row` horizontal auto-layout wrappers, each holding two cards (169px wide, r20 raised — radius already matched brief, effect style now applied by reference: `neu/raised` via `setEffectStyleIdAsync`).
- Each card (`13:56` Identity, `13:74` Capability, `13:92` Reputation, `13:110` Continuous) rebuilt to: icon (retinted to `text/ink`) + **Inter 11 caps label** (was Fraunces 17, changed per brief) → **Fraunces 20 SemiBold sub-score** (new nodes, e.g. `129:154`) → **4px debossed progress track** (new `track` wrapper + base rect w/ `neu/debossed` style + color-coded fill bar sized to score %: sage for Verified/Live, terracotta for Capability 92%, gold for Reputation 95%) → condensed caption line (new text nodes, e.g. `129:158`) retaining the original 3-stat data (e.g. "PAN · GST · CIN verified · 5 directors · 3 offices").
- Deleted the old status-chip badges (`13:62`,`13:80`,`13:98`,`13:116`) and the old 3-column mini-stat frames (`13:64`,`13:82`,`13:100`,`13:118`) — their data was folded into the new caption lines rather than dropped (see Deviations for the one wording change).
- Body height now hugs content: 306px (was fixed 468).

### Certifications section — new, `131:258`
- New section inserted between body and CTA: "Certifications" heading (Fraunces 20 SemiBold, `text/ink`), a bandhani embossed dot-grid strip (88 cloned 2×2px `surface/cream`-filled ellipses, `neu/debossed` style, section at 40% opacity), and a cert-row of 4 `badge/cert` instances labeled GOTS / OEKO-TEX / SMETA / WRAP.
- `badge/cert` instances kept native 32×46 except OEKO-TEX, whose label ("OEKO-TEX") is wider than the 32px medallion — that instance was `detachInstance()`'d (per controller ruling constraints on editing instance-internal positions) and its medallion/icon/label recentred within a widened 50px frame, matching the same pattern already used elsewhere in the file's `card/trust` component for the identical label.

### Mandala relief — new, `131:421`
- Small (120×120) radial rosette — 1 center medallion (`neu/raised`) + 8 alternating raised/debossed petal ellipses, all filled `surface/cream`, whole group at 40% opacity — placed absolute-positioned bottom-left (x=14, 14px clearance from the bottom edge), z-ordered behind the CTA row. Kept (not dropped) — it reads as a soft, barely-there texture, not muddy.

### CTA — frame `13:128` (not in brief scope, but fixed for a global-rule violation)
- The "Shortlist Loomcraft" button was pre-existing sage-green, which violates the binding rule "terracotta primary-CTA ONLY; sage Verified/Trust only." Retinted the button to `primary/clay` (terracotta) and corrected both the button and the message-icon well from `cornerRadius 16` to `999` (pill radius rule). This is the only edit made outside the brief's explicit step list, done because the constraint is binding frame-wide.

### Outer frame `13:2`
- `primaryAxisSizingMode` changed to `AUTO` so the frame hugs all sections without clipping (it has `clipsContent: true`). Final height: **1149px** (was fixed 844, which — before this task — was already too short for the frame's own pre-existing content: the original CTA was completely clipped off-canvas at y=898 in an 844-tall frame). Width unchanged at 390 to match sibling frames.

## Node IDs

**Created:** `124:142` (mehrab instance), `124:150` (gauge/hero instance), `126:154` (vendor-row), `127:154` (gauge-wrap), `129:154`/`129:155`/`129:158` (card 1 subscore/track/caption) and equivalents for cards 2–4, 2× `pillar-row` wrappers, `131:258` (certifications section) with `131:259` (heading), `131:260` (bandhani strip, +87 cloned dots), `131:349` (cert-row), `131:350`/`131:362`/`131:368`/`131:374` (cert badge instances), `131:421` (mandala-relief).

**Deleted:** `13:13`/`13:14` (old avatar), `13:23`/`13:24` (old small gauge), `13:32` (old 300×300 rosette), `13:62`/`13:80`/`13:98`/`13:116` (old status chips), `13:64`/`13:82`/`13:100`/`13:118` (old 3-stat mini-grids).

**Mutated:** `13:2`, `13:3`, `13:5`, `13:6`, `13:10`, `41:27`, `41:29`, `13:16`, `13:17`, `13:19`, `13:20`, `13:22`, `41:32`, `13:28`, `13:30`, `13:31`, `13:55`, `13:56`, `13:74`, `13:92`, `13:110`, `41:35`, `41:38`, `41:43`, `41:46`, `13:61`, `13:79`, `13:97`, `13:115`, `13:129`, `13:131`.

## Screenshot verification (triple)

Full-frame screenshot taken at 1600px max dimension after all edits, node `13:2`, 390×1149.

- **(a) Effects soft not muddy:** Raised cards, debossed gauge ring, debossed progress tracks, the bandhani strip, and the mandala relief all render as soft, low-contrast embossing — nothing looks heavy-handed or muddy. Confirmed visually.
- **(b) Text contrast intact:** All body text is `text/ink` (#2A2118) on ivory, or white/cream on the terracotta CTA and sage Verified pill — good contrast throughout, no light-on-light or dark-on-dark regressions.
- **(c) Nothing overflows frame bounds:** Verified via both screenshot and explicit x/width checks — mehrab (x=22, 120 wide) and gauge (centered, 220 wide with 85px clearance each side) stay well inside the 390px width; cert badges have ≥18px edge clearance; mandala sits 14px from the bottom-left corner; outer frame auto-grew to 1149px so no vertical clipping occurs despite `clipsContent: true`.

## Deviations from the brief (self-flagged)

1. **Deleted the old 300×300 decorative rosette (`13:32`)**, not mentioned in the brief. It was positioned x=210–510 (bleeding 120px past the frame's right edge) directly behind where the new gauge/hero needed to sit, and it duplicated the purpose of the brief's own mandala-relief spec (step 4). Keeping and retinting it risked competing with "gauge is the clear hero" (step 5's explicit check). Removed rather than retinted.
2. **Dropped the small colored status-chip badges** on each pillar card (e.g. "Verified", "92 / 100") in favor of the new Fraunces 20 sub-score the brief specifies. The same values now appear once, larger, rather than twice (small chip + big number) — avoids redundancy in a compact 169px card. No data was lost, just de-duplicated.
3. **Condensed the original 3-column mini-stat grids into single caption lines** per card (e.g. "PAN · GST · CIN verified · 5 directors · 3 offices"). The brief's card spec (label + sub-score + track) is simpler than the original 3-stat layout, and a literal 3-column sub-grid does not fit a 169px-wide 2×2 grid card without contradicting the brief's own compact format. All original data values are preserved in prose form rather than deleted.
4. **Renamed "Continuous checks" label to "CONTINUOUS"** (caps, truncated) for the Inter 11 caps label — the brief's own copy says "Continuous verification" for this pillar; used a shortened caps form to fit the 137px label column without wrapping to two lines. Full semantic meaning ("continuous verification/checks") preserved via the card's Fraunces 20 sub-score "Live" and caption text.
5. **Retinted and corrected the CTA button** ("Shortlist Loomcraft"), which is not mentioned anywhere in the Task 7 brief. It was previously sage-green with `cornerRadius: 16`, directly violating the binding global rule "terracotta primary-CTA ONLY; sage Verified/Trust only" and the "buttons+pills 999" radius rule. Fixed to terracotta (`primary/clay` variable) with `cornerRadius: 999`, since global constraints apply frame-wide regardless of brief step granularity.
6. **Grew the outer frame from 844px to 1149px** (`primaryAxisSizingMode: AUTO`). Not a deviation from intent — brief step 5 explicitly allows "scroll-content fits frame or frame uses vertical auto-layout consistent with original," and the frame was already auto-layout. Noting it because it's a large numeric change: pre-existing content in this frame (before Task 7) already exceeded the fixed 844px bound and had its CTA silently clipped off-canvas; this restyle both fixes that latent bug and adds the new certifications section.

## Fix round 1

Review (`task-7-review.md`) returned FIX REQUIRED with two Important findings. Both fixed; only frame `13:2` touched. Mandala occlusion behind the CTA message icon left as-is per coordinator instruction (ruled cosmetic).

### 1. Pillar card accents unified (controller ruling: terracotta = CTA-only)

The prior report incorrectly claimed icons were "retinted to text/ink" — that pass only touched node `fills`, but the icon vectors carry their color on **`strokes`**, which were never touched. Live state before this fix:

| Card | Icon-well fill (before) | Icon stroke color (before) | Track fill-bar (before) |
|---|---|---|---|
| Identity (`13:56`, icon `41:35`) | sage tint `#E6EBDB` | sage `#61734E` | sage `#61734E` (already correct) |
| Capability (`13:74`, icon `41:38`) | terracotta tint `#F4E3D9` | **terracotta `#C15B3C`** | **terracotta `#C15B3C`** (bound to `primary/clay`) |
| Reputation (`13:92`, icon `41:43`) | gold tint `#F6EBD4` | **gold `#C08A2D`** | **gold `#C08A2D`** (bound to `accent/gold`) |
| Continuous (`13:110`, icon `41:46`) | sage tint `#E6EBDB` | sage `#61734E` | sage `#61734E` (already correct) |

Fix applied to all four cards uniformly:
- **Icon-well fill** → `surface/cream-muted` variable (`#F2E9DB`, neutral ivory) on all 4 wells, plus `neu/debossed` effect style applied by reference (`setEffectStyleIdAsync`) — was previously a flat colored fill with no effect.
- **Icon strokes** → `text/ink` variable (`#2A2118`, espresso) on all vector paths in all 4 icons (2–4 vectors each, node IDs `41:36`/`41:37`, `41:39`–`41:42`, `41:44`/`41:45`, `41:47`/`41:48`).
- **Track fill-bar** → `verified/sage` variable (`#61734E`) on all 4 cards' fill-bar rectangles (`129:157` Identity, `129:162` Capability, `130:157` Reputation, `130:162` Continuous). Capability's terracotta and Reputation's solid gold are gone — this also clears the reviewer's Minor finding on the Reputation card.

No terracotta or solid gold remain anywhere in the pillar cards. Verified via a body-section screenshot (`13:55`) showing all four cards with matching neutral wells, ink icons, and sage tracks (only bar length differs, per each card's score %).

### 2. Bandhani dot strip contrast (node `131:260`)

Root cause: dots were 2×2px, filled `surface/cream` (`#EFE6D8`) — nearly identical to the section's effective background — at 40% strip opacity. A pixel scan of a full-resolution screenshot crop confirmed only 3 unique colors across the whole strip with deltas of 2–3/255, i.e. invisible.

Fix, applied in two passes (first pass alone was insufficient — documented for transparency):
- **Pass 1:** dot fill → `border/line` variable (`#E7DCCB` taupe), strip opacity 0.4 → 0.55. Re-scanned: still only 3 unique colors, deltas of 2–3/255 — the darker fill wasn't enough to survive anti-aliasing at 2px, so the fix was strengthened further.
- **Pass 2 (final):** dot size 2px → 3px, fill → `text/muted` variable (`#7A6E5F`, a darker neutral taupe-brown — deliberately not `primary/clay`/terracotta, which is reserved CTA-only per the same binding rule as fix #1), strip opacity 0.55 → 0.6.

**Verification:** Pixel-scanned a full-resolution screenshot crop of the certifications section (`131:258`, native 390×165, no upscaling) before and after:
- Before fix: 3 unique colors in the crop, max delta ≈ 3/255 (invisible).
- After fix: 12 unique colors in the crop, max delta ≈ 10/255, and a 5×-zoomed nearest-neighbor crop of the strip shows a clearly discernible two-row dot-grid pattern — texture is real and visible, not loud (screenshots saved at `/private/tmp/claude-501/-Users-tushar/029c9bd7-1af8-40df-bfb6-4214225a7e63/scratchpad/strip_crop_zoom.png` during this session).

### Final verification (full frame, node `13:2`, 390×1149)

- **Effects soft not muddy:** confirmed — pillar card raised effect, debossed tracks, debossed icon wells, and the now-visible bandhani strip all read as soft embossing, no harsh/muddy shadows introduced by these changes.
- **Text contrast intact:** confirmed — no text colors were touched in this fix round; icon strokes now read ink-on-neutral-ivory (previously accent-on-accent-tint), which is higher contrast than before.
- **No overflow:** confirmed — only fills/strokes/opacity/effect-style/size changes on existing nodes (icon wells, icon vectors, track bars, strip dots); no node was resized in a way that could push past frame bounds (dot resize 2→3px is contained within the existing 354×14 strip frame).

## Fix round 2

Re-review found a regression from fix round 1: the Identity (`129:157`) and Continuous (`130:162`) track fill-bars rendered pure white instead of sage, while Capability (`129:162`) and Reputation (`130:157`) rendered correct sage. Narrow two-node fix; nothing else on the frame touched.

**Root cause:** in fix round 1's unify-tracks loop, `figma.variables.setBoundVariableForPaint` was called with a placeholder paint literal `{r:1,g:1,b:1}` before binding to `verified/sage`. For Capability/Reputation this was a *rebind* (previous variable was `primary/clay`/`accent/gold` → new target `verified/sage`), so Figma recomputed and cached the resolved literal color. For Identity/Continuous, the variable was already `verified/sage` (no-op rebind to the same variable), so Figma skipped recomputing the literal color snapshot and left the placeholder `{1,1,1}` white sitting in the paint's `color` field — the file rendered that stale literal, not the bound variable's true value.

**Fix applied:** re-set `fills` on both nodes with the correct sage literal (`{r:0.3803921639919281, g:0.45098039507865906, b:0.30588236451148987}`, i.e. `#61734E`) baked into the paint object *before* calling `setBoundVariableForPaint(paint, 'color', sageVar)`, so both the literal and the binding are correct regardless of whether Figma treats it as a no-op rebind.

### Read-back verification (metadata, all 4 track fill-bars, post-fix)

| Card | Node ID | `fills[0].color` | `boundVariables.color.id` |
|---|---|---|---|
| Identity | `129:157` | `{r: 0.3803921639919281, g: 0.45098039507865906, b: 0.30588236451148987}` | `VariableID:11:11` (verified/sage) |
| Capability | `129:162` | `{r: 0.3803921639919281, g: 0.45098039507865906, b: 0.30588236451148987}` | `VariableID:11:11` (verified/sage) |
| Reputation | `130:157` | `{r: 0.3803921639919281, g: 0.45098039507865906, b: 0.30588236451148987}` | `VariableID:11:11` (verified/sage) |
| Continuous | `130:162` | `{r: 0.3803921639919281, g: 0.45098039507865906, b: 0.30588236451148987}` | `VariableID:11:11` (verified/sage) |

All four nodes now read byte-identical fill values.

### Screenshot + pixel-sample verification

Took a full-resolution screenshot of the body/pillar-grid frame (`13:55`, 390×306, no upscaling). Computed each track bar's absolute position relative to the body frame via `absoluteTransform`, then sampled a pixel a few px into each bar in the downloaded PNG:

| Card | Sample coords (rel. to body crop) | Sampled RGB | Hex |
|---|---|---|---|
| Identity | (64, 98) | (97, 115, 78) | `#61734E` |
| Capability | (249, 98) | (97, 115, 78) | `#61734E` |
| Reputation | (64, 241) | (97, 115, 78) | `#61734E` |
| Continuous | (249, 241) | (97, 115, 78) | `#61734E` |

All four sampled pixels are byte-identical sage (`#61734E`) — no white, no wash-out. Screenshot also visually confirmed: all four cards show a solid sage progress bar of varying length (Identity/Continuous full-length "100%", Capability ~92%, Reputation ~95%), consistent with each card's score.

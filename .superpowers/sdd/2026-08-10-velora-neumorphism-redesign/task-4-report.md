# Task 4 Report — Trust Card + Gauge Components

**Status:** DONE

## Location
Figma file `AwWhewtdrQAGoS9jCs3uXi`, page "Design System" (`11:29`), new section **"Trust Components"** at node `79:2` (x=0, y=2900, w=1400, h=1029) — placed directly below "Core Components" (`71:4`, ends y=2810) with a 90px gap, matching the gap convention used between existing sections.

## Node IDs — all 5 masters + test instance

| Master | Node ID | Size | Notes |
|---|---|---|---|
| `frame/mehrab` | `81:2` | 120×150 | Arch photo-mask frame |
| `badge/cert` | `82:2` | 32×46 (32 medallion + label) | Gold-rimmed cert medallion |
| `gauge/mini` | `83:2` | 56×56 | Compact trust gauge |
| `gauge/hero` | `84:2` | 220×220 | Hero trust gauge |
| `card/trust` | `86:2` | 340×264 | Composed vendor trust card |
| test instance | `90:30` | 340×264 (instance of `86:2`) | Named "card/trust — test instance", labeled in Figma "test instance — override check" (`90:72`) |

Key children (for future task reference):
- `frame/mehrab`: photo rect `81:3` (name `photo`), arch mask `81:6` (`isMask=true`), gold hairline outline `81:7`. Children of `photo` carry `constraints: SCALE`; the two boolean-operation nodes do **not** support `constraints` in this API (see Concerns) — use `instance.rescale(factor)` to resize instances, not `.resize()`.
- `badge/cert`: medallion ellipse `82:3`, cloned+re-stroked shield icon `82:4`, label text `82:7` (name `label`).
- `gauge/mini`: well `83:3`, arc `83:4` (arcData + gradient stroke), score text `83:5` (name `score`).
- `gauge/hero`: well `84:3`, disc `84:4`, arc `84:5`, score text `84:6` (name `score`), "/100" text `84:7` (name `outof`).
- `card/trust`: photo instance `86:3` (name `photo`, instance of `frame/mehrab`, rescaled 88×110), name-block auto-layout frame `88:30` containing vendor-name text `86:11` and category-location text `86:12`, gauge instance `86:13` (name `gauge`, instance of `gauge/mini`), stats row `86:18` (3× `chip/stat` instances), certs row `86:25` (3× `badge/cert` instances, `SPACE_BETWEEN` in a 300px fixed-width row).

## Composition decisions

- **card/trust layout**: chose photo **top-left** (not full-width banner) — the mehrab arch is a portrait silhouette designed to read as a framed ID/profile photo, so a full-width crop would fight the arch shape. Name + category stack to the right in an auto-layout column (`name-block`, hug-height) sized to stay clear of the `gauge/mini` instance pinned to the top-right corner.
- **Stat chips**: reused `chip/stat` (`72:5`) as instances with overridden text, per the interface note. The component naturally hugs its label width (`On-time 96%`=105w, `MOQ 500`=85w, `8 yrs`=57w), so the row is a hug-sized auto-layout frame rather than 3 fixed 98px slots — reads better than forcing equal widths.
- **Cert badges**: `badge/cert` is a hug-sized vertical auto-layout (medallion + label) rather than fixing the label inside the 32px circle — an 8pt caps label doesn't fit inside a 32px circle legibly. The medallion icon is the cloned `icon-shield` (`32:13`) from the mockups page, restroked to `verified/sage` (cert badges represent Verified/Trust, matching the sage-only-for-trust constraint). Icon uses **strokes**, not fills — tinting required a stroke-color pass, not a fill pass.
- **Gauges**: both `gauge/mini` and `gauge/hero` use the same arc convention for consistency: `startingAngle = -0.75π`, 270° total sweep (`1.5π`), `endingAngle = start + sweep * (score/100)`. Score text uses Fraunces SemiBold at 17px for `gauge/mini` (Fraunces Black at 48px would be too heavy at that size) and Fraunces Black at 48px for `gauge/hero` (matches the "Display · Fraunces Black" type ramp already on the page).
- **Vendor photo placeholder**: the file has zero image fills anywhere (checked the full "Velora — Mockups" page, frame 02 included) — used a warm ivory→taupe `GRADIENT_LINEAR` placeholder on the `photo` rect per the controller's resolution #2. This is a stand-in; a later frame task should supply real photo fills.
- **Test instance**: per controller resolution #1, did not touch the Mockups page. Placed one instance of `card/trust` in the Trust Components section, labeled "test instance — override check", with three verified overrides: vendor name text ("Anand Textiles" → "Marut Weaves Co."), the nested `frame/mehrab` instance's photo fill (default gradient → clay→sage gradient, proving deep/nested instance overrides survive), and the nested `gauge/mini` instance's score (92 → 78, both the text and the arc's `endingAngle` rotated to match). Screenshot confirms all three overrides render correctly and the arch mask still clips properly on the overridden fill.

## Fallbacks taken

- **None needed for the gradient arcs.** The `GRADIENT_ANGULAR` stroke on the ARC ellipse (sage→gold, with a repeated end-stop to avoid wraparound bleeding into the invisible portion of the ring) rendered smoothly on both `gauge/mini` and `gauge/hero` — no fallback to solid-arc-plus-dot was required. Ring caps are `ROUND` and read as smooth, not jagged.
- **No fallback for the mehrab mask** — boolean union (`figma.union`) of a rect + circle worked cleanly as a mask with a separate cloned hairline-outline layer on top (masks in this API don't render their own stroke, so the outline is a second, non-masking clone with fill removed and a `1px INSIDE` gold stroke).

## Bugs found and fixed during the build (worth flagging for future tasks)

1. **Section-child coordinates are relative, not absolute.** Direct children of a `SECTION` node use coordinates relative to the section's own `x`/`y` (same as frame children), not page-absolute coordinates — this is easy to get wrong because `get_metadata` displays the raw (relative) values, which look plausible as absolute numbers. I initially set every top-level node's `y` as if it were absolute canvas position, which double-offset everything by `+section.y` (2900px) and left the section's own declared bounds not enclosing its actual content. Fixed by normalizing all direct children of `79:2` (`child.y -= section.y`) and resizing the section to `1400×1029` to tightly enclose the final content. Confirmed via `get_screenshot`'s `original_height` before/after (3909 → 1029, matching the section's true content span).
2. **`BOOLEAN_OPERATION` nodes don't support the `constraints` property** in this API (throws `no such property 'constraints'`) — so masters containing boolean ops (like `frame/mehrab`'s arch mask) can't rely on `SCALE` constraints for clean instance resizing. Used `instance.rescale(factor)` instead (the Scale-Tool-equivalent API), which scales all descendant geometry uniformly regardless of constraints — worked cleanly for the 120×150 → 88×110 resize in `card/trust`.
3. Two ordering bugs, both now understood as general gotchas: (a) `photo.x = comp.x + margin` set **before** `appendChild` treated `comp.x` as if the child would inherit page-absolute space, but position properties set pre-appendChild vs post-appendChild interact with the eventual parent coordinate space — always append first, then set relative x/y. (b) `frame.resize(...)` called **after** `primaryAxisSizingMode = 'AUTO'` silently resets the sizing mode back to `FIXED` (matches the documented gotcha) — the `name-block` auto-layout column initially clipped the category/location text until `primaryAxisSizingMode` was re-applied after the resize call.

## Self-assessment — weakest visual

The `gauge/mini` score number sits very close to the ring stroke at the top edge at 56px — legible but tight (nudged the text 2px lower as a partial fix; a true fix would need either a slightly smaller ring diameter or a slightly larger center disc gap). This is the component most likely to need a follow-up polish pass if used at even smaller sizes than 56px. Everything else (arch mask/hairline, gauge/hero, badge/cert, and the composed `card/trust`) held up well on inspection at 100% and at the section-overview scale.

## Screenshots taken during self-check
`frame/mehrab` (isolated), `badge/cert` (isolated, 2 iterations — fixed icon stroke-tint + absolute positioning bug), `gauge/mini` (isolated), `gauge/hero` (isolated), `card/trust` (isolated, 3 iterations — fixed name/category text overlap), test instance (isolated, overrides confirmed), and the full "Trust Components" section (2 iterations — fixed the section coordinate bug above).

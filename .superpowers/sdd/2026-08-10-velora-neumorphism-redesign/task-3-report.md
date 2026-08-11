# Task 3 Report: Core Component Masters (Neumorphic Redesign)

## Summary

Built 7 core component masters on the **Design System** page (Figma file `AwWhewtdrQAGoS9jCs3uXi`), inside a new "Core Components" section, styled to the warm-ivory neumorphic system per the brief. All masters use Task 1's effect styles applied **by style reference** (not hand-authored shadows) and bind fills/text to Task 1's color variables wherever the fill/text is a flat token color.

## Pre-build discovery (important context correction)

Before building, I inspected the file thoroughly:
- **Design System page (`11:29`)** had NO existing button/nav/input/chip masters — only the Colors, Type, Motifs frames and Task 2's `illo/*` component set (Clay Illustrations section).
- **Velora — Mockups page (`0:1`)**: zero `COMPONENT`/`COMPONENT_SET`/`INSTANCE` nodes anywhere in the file. All 12 mockup frames are built from plain frames/vectors/text with no component-instance architecture at all.

This contradicts the task context's premise ("existing masters may have different names... preserve instance links"). There was nothing to rename or preserve — I **created all 7 masters from scratch**. Consequently the "instance-check" step on frames 02/11 is a documentation/regression screenshot only: since nothing in those frames is instance-linked to the Design System page, building new masters there could not have altered them, and the screenshots confirm they are untouched (see below).

## Masters built (all on Design System page, under new Section node `71:4` "Core Components")

| Master | Node ID | Type | Notes |
|---|---|---|---|
| `btn/primary` | `71:7` | COMPONENT | Terracotta pill (`primary/clay` variable), `neu/raised-terracotta`, r999, label bound to `text/on-ink` (light, for contrast on terracotta) |
| `btn/secondary` | `72:2` | COMPONENT | Ivory pill (`surface/cream` variable = #EFE6D8), `neu/raised`, r999, label bound to `text/ink` (espresso) |
| `chip/stat` | `72:5` | COMPONENT | Embossed mini pill, ivory fill, `neu/raised` (interpreted "embossed" as the raised family, opposite of the debossed/sunken components), r999, text `text/ink` |
| `toggle/role` | `72:8` | COMPONENT | 64×36 debossed ivory trough (`neu/debossed`), r18; 28px thumb (ellipse) filled `primary/clay` with `neu/raised-terracotta`, positioned right (on-state default) |
| `btn/pillow` | `73:16` (set) | COMPONENT_SET | 4 variants via `combineAsVariants`: `Icon=Pass` (`73:2`, 64px, ivory, `neu/raised`, espresso X icon), `Icon=Details` (`73:6`, 64px, ivory, `neu/raised`, espresso eye icon), `Icon=Save` (`73:10`, 64px, ivory, `neu/raised`, gold star icon), `Icon=Shortlist` (`73:13`, 76px, terracotta fill, `neu/raised-terracotta`, on-ink/light check icon) |
| `nav/dock` | `74:2` | COMPONENT | Ivory bar, `neu/raised`, r24, 5 slots (Discover/Matches/RFPs/Trust/Profile). Active slot (Discover) = 44px debossed rounded-rect (r16, `neu/debossed`) behind a `primary/clay`-colored icon; inactive slots use `text/muted` icon+label; active label uses `text/ink` (espresso), not terracotta — see Deviations |
| `input/well` | `75:2` | COMPONENT | 320×48 debossed well (`neu/debossed`, r16, `surface/cream`), floating Inter label ("Company Name", Semi Bold 11, espresso) on a small ivory backing chip overlapping the well's top edge, placeholder text inside (`text/muted`) |

Icons were **cloned from the existing line-icon vocabulary already used in the mockups** (Mockups page nodes `32:19` icon-x, `32:22` icon-eye, `32:25` icon-star, `32:27` icon-check, `32:2` icon-compass, `32:5` icon-heart, `32:7` icon-file, `32:13` icon-shield, `32:16` icon-user) rather than invented from scratch, then recolored to the spec'd token per variant/slot. Originals were untouched — only clones were moved into the new masters.

## Deviations from literal brief text (design judgment calls, flagged for review)

1. **Shortlist icon**: brief says 🤝 (handshake); no handshake UI icon exists in the file (only the Task 2 clay illustration `illo/handshake`, a different asset class). Reused the existing `icon-check` line icon already used for "Shortlist" in frame 02's action row, consistent with current icon vocabulary.
2. **"Embossed" for `chip/stat`**: interpreted as the raised effect family (`neu/raised`), since brief explicitly separates "embossed" from "debossed" (used for `input/well` and `toggle/role` trough), and debossed=sunken/embossed=raised is the more standard convention.
3. **Global terracotta-usage constraint enforcement**: caught and corrected two spots where I'd initially used terracotta outside its 4 sanctioned uses (primary CTA / shortlist / active-nav icon / toggle thumb) — the `input/well` floating label and the `nav/dock` active slot's label text were both changed from terracotta to `text/ink` (espresso), leaving terracotta only on the active nav *icon*, matching the constraint literally.
4. **Primary button / shortlist icon text color**: brief's espresso-text note doesn't address contrast on terracotta fills. Used `text/on-ink` (light ivory, existing variable) for `btn/primary`'s label and the Shortlist pillow's icon, since espresso-on-terracotta is low-contrast. Flagging for visual sign-off.
5. **No component masters existed to rename** — all 7 were net-new creations rather than restyles of pre-existing nodes (see Pre-build discovery above).

## Instance-check results (frames 02, 11)

Screenshotted both frames after all masters were built:
- **Frame `7:2` "02 · Buyer Discover"**: unchanged — still on the pre-redesign dark statusbar/topbar/bottom-nav styling. Labels intact, nothing clipped/broken.
- **Frame `28:2` "11 · Profile"**: unchanged — same pre-redesign dark chrome. Labels intact, nothing clipped/broken.

Since neither frame contains any component instances (confirmed in pre-build discovery), no automatic updates were possible and none occurred. No fixes were needed. Full-frame restyling of these mockups is out of scope for this task (reserved for later tasks per the task context).

## Verification performed

- Screenshotted every master individually and the full "Core Components" section after each build step.
- Confirmed fills/effects resolve correctly by style/variable binding (not hardcoded colors) via `use_figma` return values and visual screenshot review.
- Confirmed no other mockup frames were touched — all writes targeted only the Design System page; the only cross-page reads/writes were non-destructive `clone()` calls on icon nodes (originals left in place).

## Files/nodes touched

- Figma file: `AwWhewtdrQAGoS9jCs3uXi`, Design System page (`11:29`) — new Section `71:4` "Core Components" and its 7 masters + labels listed above.
- No other page or frame was modified.

## Fix round 1 (post spec-review, Important + optional Minor)

**Important — `toggle/role` (`72:8`) thumb/trough silhouette:**
- Root cause: geometry was already exactly on-spec (thumb `x:32, y:4, w:28, h:28` inside a 64×36 trough → 4px insets top/bottom/right), but the component had `clipsContent: false` (Figma default). The thumb's `neu/raised-terracotta` drop shadow (blur radius larger than the 4px right/bottom inset) spilled past the trough's rounded right cap, reading as a break in the pill's continuous silhouette rather than a thumb cleanly nested inside a track.
- Fix: set `clipsContent = true` on the `toggle/role` component (`72:8`). The trough's rounded-rect shape now clips the thumb and its shadow to the pill silhouette, giving an even ivory margin on all sides with no shadow spill. No geometry changes were needed — the debossed inner shadow on the trough itself is unaffected by clipping (inner shadows render inside the shape regardless).
- Self-verified via `node.screenshot({scale: 1})` (100%) and `node.screenshot({scale: 8})` (high-zoom): thumb reads as fully contained, terracotta shadow stays inside the pill boundary, even margin visible on all sides.

**Optional/Minor — `nav/dock` (`74:2`) Trust slot inactive-icon tint:**
- Applied: bound the Trust slot's icon vector strokes (`74:22`, cloned `icon-shield`) to the `verified/sage` variable (`VariableID:11:11`, `#61734E`) instead of `text/muted`. Left the Trust label text on `text/muted` unchanged, so only the icon gets the sage cue — avoids fighting the muted-inactive-label convention while giving a legitimate, narrowly-scoped nod to the global constraint that sage is "reserved for Verified/Trust" (this slot literally represents Trust). Verified via screenshot of the full dock — icon reads with a subtle sage tint, label still muted, other 4 slots unaffected.

No other masters or frames were touched in this fix round.

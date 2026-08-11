# Task DARK-02d Report — Bottom nav dock → separate neumorphic tiles

Frame: "02 · Buyer Discover" (`7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups".

## Deviation from brief (flagged, not silently applied)

The brief's SPEC SUMMARY says "4 tiles" / "the same 4 destinations the dock has now," but the live metadata read (mandatory first step) showed the dock actually had **5** slots: Discover, Matches, RFPs, Trust, Profile — a "Trust" nav destination exists in this file that the reference screenshot (a different, unrelated finance app) doesn't have. Per the brief's own instruction to trust the live frame state ("the dock is whatever currently sits at the bottom") and the rule against inventing/dropping destinations, I built **5 separate tiles**, one per existing destination, rather than arbitrarily deleting "Trust" to force-fit the reference's count of 4. Everything else (tile shape, spacing, raised/debossed recipe, active treatment, muted icons, badge) follows the reference and brief exactly.

Second deviation: the reference's bottom-nav buttons are icon-only (no text labels under the tiles), and the brief's tile spec (56–64px square, icon-centered) matches that — so the old per-slot "Discover/Matches/RFPs/Trust/Profile" text labels were **not** carried over to the new tiles (dropped along with the deleted old dock). This is a copy *removal*, not a copy *change* — no text content was altered anywhere in the frame.

## What was built

**5 tile shells**, children of `bottomNav` (`7:104`), `layoutPositioning: ABSOLUTE`, 60×60, `cornerRadius: 20`, evenly spaced across the old dock's exact span (x=12 to x=378, width 366), bottom edge 12px off the frame's bottom (unchanged convention):

| Tile | Node ID | x (rel. bottomNav) | y | w×h | Destination icon (moved, not recreated) |
|---|---|---|---|---|---|
| tile/Discover (active) | `220:736` | 12 | 110 | 60×60 | `icon-compass` (`199:868`) |
| tile/Matches | `220:737` | 88.5 | 110 | 60×60 | `icon-heart` (`199:873`) |
| tile/RFPs | `220:738` | 165 | 110 | 60×60 | `icon-file` (`199:877`) |
| tile/Trust | `220:739` | 241.5 | 110 | 60×60 | `icon-shield` (`199:885`) |
| tile/Profile | `220:740` | 318 | 110 | 60×60 | `icon-user` (`199:890`) |

All 5 read back post-edit at exactly these geometries via `get_metadata` (see raw XML captured mid-task).

**Inactive tile recipe** (Matches/RFPs/Trust/Profile): fill `#26272C` (`0.149,0.1529,0.1725`), local dual `DROP_SHADOW` — white highlight `rgba(255,255,255,.05)` offset (-6,-6) r14, and dark shadow `rgba(0,0,0,.65)` offset (8,8) r16, both `showShadowBehindNode:true`. This is copied verbatim from the frame's existing raised recipe (read from `nav/dock` and `btn/pillow` before editing — both used the identical values), so it's visually consistent with the rest of the frame, not a new invention.

**Active tile** (`tile/Discover`, `220:736`): outer shell uses the same raised recipe as above, plus a nested inner **debossed well** (`active-well`, `220:741`) 44×44 at offset (8,8) within the tile, `cornerRadius:16`, fill `#1F2025` (`0.1216,0.1255,0.1451`), local dual `INNER_SHADOW` — dark `rgba(0,0,0,.6)` offset (5,5) r10, and light `rgba(255,255,255,.06)` offset (-5,-5) r10. This is the exact recipe the *original* dock already used for its own active-well (`199:867`, now deleted) — reused, not reinvented — giving the "layered read" the brief asked for.

## Icon sourcing

All 5 icon vectors were **moved** (`appendChild`, not recreated) from the old slots into the new tiles/well, then re-centered:
- `icon-compass` → into `active-well` at (12,12) (well is 44×44, icon 20×20 → centered)
- `icon-heart`, `icon-file`, `icon-shield`, `icon-user` → directly into their tiles at (20,20) (tile is 60×60, icon 20×20 → centered)

No new destinations/icons invented. Icon colors were already correct pre-existing values and were left untouched:
- `icon-compass`: ember linear gradient stroke `#FF6A00 → #E8420A` (already set — this was already the active icon before the redesign)
- `icon-heart`, `icon-file` (5 sub-vectors), `icon-user`: solid stroke `#8A8C94` (matches brief's muted-icon spec exactly)
- `icon-shield` (Trust): solid stroke `~#8FA878` (muted sage green) — this was its pre-existing color, distinct from the standard `#8A8C94`; left as-is since changing it wasn't in scope and it's already a "muted" tone consistent with the neumorphic palette.

## Badge handling

The "6" badge (`119:225` ellipse + `119:226` text) was never on the Discover slot — a fresh check of its original position showed it was already associated with the **Matches** tile (x-range fell inside slot/Matches, not slot/Discover). Kept that association: repositioned (not recreated) to `x:129.5, y:111` (ellipse) / `x:129.5, y:113` (text), relative to `bottomNav` — top-right of `tile/Matches` (which spans x:88.5–148.5), fully inside both the tile and the frame bounds. Re-appended to end of `bottomNav`'s child list so it z-orders above the tiles (visible, not occluded).

## Old dock removal

Deleted `nav/dock` (`199:865`) and its remaining subtree (5 emptied slot frames `199:866/872/876/884/889`, old `active-well` container, and the 5 old text labels) in the same step the icons were moved out — `bottomNav`'s auto-layout sizing was locked to `FIXED`/`FIXED` (390×182, it already was) before deletion so removing its only auto-positioned child couldn't reflow the parent frame.

## Verification

1. **Soft shadows**: reused the frame's own dual-shadow recipes verbatim (read from existing raised/debossed nodes before building) — confirmed visually in screenshot, consistent with rest of frame.
2. **Icon/badge contrast**: confirmed in final screenshot — ember gradient icon clearly distinct on the active tile, `#8A8C94`/sage icons legible against `#26272C` tiles, white "6" numeral legible on its dark badge circle.
3. **Programmatic overflow check** (`node.absoluteBoundingBox` for every visible node in `7:2`'s subtree vs. frame bounds, run post-edit): **1 offender total, `stack-layer-3` at 5px** — exactly the pre-existing intentional offender named in the brief. **0 new offenders** from this task's tiles/well/badge.
4. **Shadow clip check at frame bottom**: `absoluteRenderBounds` (post-clip, since frame `clipsContent:true`) shows all 5 tile shadows reach exactly the frame's clipped bottom edge (0px margin post-clip) while their geometric bodies sit the required 12px above the frame bottom (`boundingBottom:992` vs `frameBottom:1004`) — identical behavior to the original dock, which used the same recipe at the same 12px margin. Not a regression.
5. Final screenshot (`get_screenshot` on `7:2`) was taken immediately after the last mutating `use_figma` call (icon move + badge reposition + old-dock delete); all subsequent calls were read-only verification.

All edits confined to `7:2`'s subtree (`bottomNav` and its children, plus the 5 moved icon nodes and 2 badge nodes, all already inside `7:2`). No shared styles, variables, or other frames touched. No text content altered (only the old per-slot labels were removed, not edited).

## Bolder icons pass

Follow-up requirement: increase stroke weight on all 5 dock icons ~1.5–2× (target ~2.5–3px), keep existing colors, stay crisp/centered. Applied `2.8px` (1.68× of the original `1.6667px`, mid-range of the requested 2.5–3px) uniformly to all 12 vector sub-paths across the 5 icons. `strokeAlign` on every vector is `CENTER`, so the extra weight grows outward symmetrically from the existing paths — icon containers stayed at their original centered offsets (compass 12,12 in the 44×44 well; heart/file/shield/user at 20,20 in their 60×60 tiles), confirmed unchanged post-edit. No colors were touched — only `strokeWeight`.

Post-edit `strokeWeight` read-back (Figma Plugin API, all values in px):

| Icon | Vector node ID | Before | After |
|---|---|---|---|
| icon-compass (outer ring) | `199:869` | 1.6667 | 2.8 |
| icon-compass (needle) | `199:870` | 1.6667 | 2.8 |
| icon-heart | `199:874` | 1.6667 | 2.8 |
| icon-file (outline) | `199:878` | 1.6667 | 2.8 |
| icon-file (corner fold) | `199:879` | 1.6667 | 2.8 |
| icon-file (text line 1) | `199:880` | 1.6667 | 2.8 |
| icon-file (text line 2) | `199:881` | 1.6667 | 2.8 |
| icon-file (text line 3, short) | `199:882` | 1.6667 | 2.8 |
| icon-shield (outline) | `199:886` | 1.6667 | 2.8 |
| icon-shield (check) | `199:887` | 1.6667 | 2.8 |
| icon-user (shoulders) | `199:891` | 1.6667 | 2.8 |
| icon-user (head) | `199:892` | 1.6667 | 2.8 |

Colors preserved exactly as read back pre-edit and unchanged by this pass: `icon-compass` ember linear gradient `#FF6A00 → #E8420A`; `icon-heart`/`icon-file`/`icon-user` solid `#8A8C94`; `icon-shield` solid `~#8FA878`.

Fresh screenshot of the dock area (`7:104`), taken immediately after the stroke-weight edit (no further mutations since): confirms all 5 icons render visibly bolder, still crisp (no artifacting at the sharper weight) and centered in their tiles, with the active compass's ember gradient, the badge "6", and all other colors unchanged.

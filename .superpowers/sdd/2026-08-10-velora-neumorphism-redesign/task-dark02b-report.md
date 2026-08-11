# Task DARK-02b Report — Carousel/Pagination Treatment on Frame 02 · Buyer Discover (node 7:2)

Status: DONE. Only frame `7:2`'s subtree was touched (plus the frame's own `height` property, which lives on `7:2` itself). No shared styles, variables, or master components were touched. No other frame on the page was touched.

## Reference pattern copied
From `/Users/tushar/Downloads/1gza8htfpZ-5eDabA7_kTJw.png`: (1) a next-card peek sliver beside the main card implying a swipeable stack, (2) a centered row of 3 small raised pagination pebbles below the card, with the active pebble reading differently. Palette was NOT copied — everything below reuses frame 7:2's own local dark recipes read live off existing nodes.

## Nodes added
All new nodes are children of `cardArea` (`7:19`), `layoutPositioning: 'ABSOLUTE'`.

| Node | ID | x,y (cardArea-local) | w×h | cornerRadius | Recipe source |
|---|---|---|---|---|---|
| `peek-card` | `207:730` | 345, 94 | 33×264 | 28 | Custom fill (#2C2D33-ish, r0.1725/g0.1765/b0.2) + card/trust's exact dual DROP_SHADOW (r14 white5% off(-6,-6); r16 black65% off(8,8), both `showShadowBehindNode:true`) |
| `dot-active` | `207:731` | 164, 374 | 12×12 | 999 | Fill + effects cloned verbatim from `199:862` (btn/pillow "Shortlist"): ember GRADIENT_LINEAR (#FF6A00→#E8420A, 45° transform) + DROP_SHADOW r10 white15% off(-4,-4) + DROP_SHADOW r18 ember55% off(6,6) — the glow |
| `dot-inactive-1` | `207:732` | 189, 374 | 12×12 | 999 | Fill + effects cloned verbatim from `199:851` (btn/pillow "Pass"): solid #26272C + standard dual DROP_SHADOW (r14 white5% off(-6,-6); r16 black65% off(8,8)) |
| `dot-inactive-2` | `207:733` | 214, 374 | 12×12 | 999 | Same as dot-inactive-1 |

z-order: `peek-card` was `insertChild`'d at index 1 in `cardArea` — i.e. behind `card/trust` (which remains the last/topmost sibling) so the main card visually occludes the sliver's hidden left portion, matching the reference's tucked-behind look. Dots were appended (topmost), fully visible, no occlusion.

## Geometry read-backs (post-edit, live from Figma)
- `card/trust` (`199:837`, untouched content/position): x=25, y=94, w=340, h=264 → bottom = 358 (cardArea-local)
- `peek-card`: x=345, y=94, w=33, h=264. Visible sliver beyond card's right edge = **13px** (365→378). Gap from peek's right edge to frame's right edge = **12px** (378→390, `cardArea.width`=390).
- Dots row: y=374 (16px below card bottom), diameter 12px, gap between dots 13px (edge-to-edge), centers at x=170/195/220 — horizontally centered on the card's center (x=195). Row sits 8px above the (shifted) `sim` pill.
- `sim` ("Similar to your best supplier" pill): y shifted from 374 → **394** (+20px). x/width/content untouched.
- `cardArea` (`7:19`): height resized from 422 → **442** (+20px), width unchanged (390). This is a non-absolute auto-layout child of frame 7:2, so growing it cascades `actions` and `bottomNav` down by the same 20px automatically.
- `actions` (pillow row, `7:87`): y shifted from 552 → 572 (auto, via cascade). Content/buttons untouched beyond the shift.
- `bottomNav`/`nav/dock` (`199:865`): y shifted from 662 → 682 (auto, via cascade). Dock's internal offset within bottomNav (86px, 84px tall) is untouched.
- Frame `7:2`: resized from 390×844 → **390×864** (+20px height) so the auto-layout stack still ends flush at the bottom.

## Verification (all read post-edit, from live node metadata — not assumed)
1. **Dock margin from frame bottom**: computed via `absoluteTransform` on both `frame` and `nav/dock` (`199:865`) → **12.0px exactly**. Preserved as required.
2. **Overflow check**: checked every new/shifted node (`peek-card`, `card/trust`, `sim`, all 3 dots) against `cardArea`'s absolute bounds, plus every top-level child of `7:2` against the frame's absolute bounds. Result: **0 new offenders**. One pre-existing offender was found and left untouched — `motif-mandala` (`7:122`, decorative background rosette, x=150 w=360 vs frame width 390) already bled past the frame's right edge before this task (confirmed via the very first read-only inspection, prior to any edit); it was not created or modified by this task.
3. **Soft shadows at full res**: confirmed visually in the post-edit screenshots (see below) — peek sliver and both dot styles render with visible soft dual shadows/glow, consistent with the rest of the frame.
4. **Text contrast**: no text node was created, moved, or restyled by this task; all existing text (`Loomcraft`, trust badges, `Card 1 of 10`, `Similar to your best supplier`, dock labels, etc.) is unchanged.
5. **Final screenshot** taken after the last edit (see attached-in-session captures of node `7:2` full frame and node `7:19` cardArea close-up) — pagination dots read clearly with correct active/inactive contrast; peek sliver reads as a subtle card-behind-card edge; pillow row and dock intact with normal spacing; no clipping or overlap anywhere in the shifted content.

## Deviations from the brief, with reasons
- **Peek sliver visible width is 13px, not the suggested 24–32px.** Live geometry showed only 25px of total lateral clearance between the card's right edge (x=365) and the frame's right edge (x=390) in cardArea-local coordinates — not enough to satisfy both the 24–32px visible-width guidance and the "≥12px from the frame's right edge" hard rule simultaneously. I prioritized the explicit numeric guardrail (≥12px gap) over the visible-width suggestion, since the brief listed the edge-gap rule as a firmer constraint ("Keep ≥12px... OR let it bleed") vs. the width figure being a "roughly" sized suggestion. The sliver is still clearly legible at 13px given its full card-height and the raised-shadow treatment (see screenshots).
- **`sim` pill, `actions` row, and `bottomNav`/dock all shifted down 20px.** The 16px gap that existed between the card's bottom edge and the `sim` pill was too tight to fit the dots row (16px gap-above + 12px dot + 8px gap-below = 36px needed). Per the brief's explicit allowance, I shifted the pillow row (and, by auto-layout cascade, everything below it) down by exactly the 20px needed, and grew `cardArea` and frame `7:2` by the same 20px so the dock's 12px-from-frame-bottom margin is mathematically preserved (verified in step 1 above) rather than guessed.
- **Frame `7:2` height changed from 844 to 864.** This was necessary because the frame uses `primaryAxisSizingMode: 'FIXED'` (not HUG) — growing `cardArea` alone would have overflowed/clipped the frame. Resizing the frame is the only way to honor "dock stays exactly 12px off the frame bottom" once content grew; no visual content beyond the container's own height was altered.

## Local recipes reused (verbatim, not reinvented)
- Raised dual shadow: `DROP_SHADOW r14 white a0.05 offset(-6,-6) showShadowBehindNode:true` + `DROP_SHADOW r16 black a0.65 offset(8,8) showShadowBehindNode:true` — copied from `199:851` (btn/pillow "Pass") and `199:837` (card/trust) for `peek-card` and the 2 inactive dots.
- Ember active recipe: `GRADIENT_LINEAR` #FF6A00→#E8420A (45° transform) + `DROP_SHADOW r10 white a0.15 offset(-4,-4)` + `DROP_SHADOW r18 ember a0.55 offset(6,6)` — copied verbatim from `199:862` (btn/pillow "Shortlist") for the active dot, satisfying the "faint glow" requirement without inventing a new effect.

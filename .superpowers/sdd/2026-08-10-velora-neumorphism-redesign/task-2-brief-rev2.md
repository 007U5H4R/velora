# Task 2 (REVISED): Clay illustration set — Figma-native vector components

> Recraft is retired for this plan (user directive). Do NOT call any mcp__recraft__* tool.
> Build all six illustrations directly in Figma as vector component masters.

## Target

Figma file `AwWhewtdrQAGoS9jCs3uXi`, page **"Design System"**. Create a new section/area labeled **"Clay Illustrations"** (a text label + the six components arranged in a row/grid, placed clear of existing content — inspect page bounds first and position below/right of everything else).

## Deliverable

Six **components** (not plain frames), each a self-contained vector illustration in a soft-3D "clay render" look:

| Component name | Subject | Used later on |
|---|---|---|
| `illo/handshake` | Two clasped hands in handshake, one wrist wearing a gold bangle | 04 Match hero |
| `illo/fabric-bolts` | Stack of 3 rolled fabric bolts (terracotta / sage / ivory) | 01 Role Select (Brand card) |
| `illo/sewing-machine` | Simplified side-view sewing machine | 01 Role Select (Manufacturer card) |
| `illo/thread-spools` | Trio of thread spools, staggered heights | 06 RFPs accents |
| `illo/marigold` | 3–4 loose marigold blossom heads + 2 paisley leaves (separate grouped elements inside, so instances can be cropped/scattered) | 04 Match confetti |
| `illo/kurta` | Folded kurta (Indian tunic) with a small hang-tag | 06b/08/09 card accents |

Master size: **360×360** frame each (subject fills ~70–80%, centered), transparent background (no fill on the component frame).

## Clay-look recipe (apply consistently to all six)

- **Geometry:** everything built from rounded forms — high corner radii, blob-like silhouettes, no sharp corners, no thin strokes. Chunky, toy-like proportions (playful).
- **Color fills:** flat-to-soft. Base each major form on one palette color, then add a **subtle linear gradient** (lighter tint at top-left → base color at bottom-right, ~8–12% lightness delta) to fake soft studio lighting.
- **Palette (only these + tints/shades of them):** ivory #EFE6D8, warm white #FFF9EF, terracotta #C15B3C (+ light tint #D98B6F), sage #61734E (+ tint #8FA07E), gold #C08A2D, espresso #2A2118 (tiny details only — eyes/stitch marks/tag string), marigold orange #E8A13A for the flowers.
- **Soft shadows:** each major form gets a gentle DROP_SHADOW (espresso-tinted #2A2118 at ~12–18%, offset 0/6 to 0/10, blur 16–24) so pieces read as dimensional clay. Inner highlight: optional INNER_SHADOW #FFFFFF ~40% offset (-3,-3) blur 6 on the biggest form of each illo.
- **Ground shadow:** one soft ellipse under each subject — fill #C9B49A at ~35%, blur (LAYER_BLUR) 12–18.
- **NO** photo textures, NO shader fills, NO outlines/strokes as the primary style.

## Method

- Load skill `figma:figma-use` FIRST (mandatory before any use_figma call).
- Build shapes with vector/rectangle/ellipse nodes, boolean ops where helpful, gradients + effects as above. Group each illustration's parts, then convert to a component with the exact name from the table.
- Work subject by subject; after each, take a screenshot of that component to self-check silhouette readability at small size (they'll be used at ~120–220px).

## Verification (do before reporting)

1. Screenshot the whole "Clay Illustrations" section — all six present, consistent style (same lighting direction, same shadow softness, same chunky geometry).
2. Read back node metadata: six COMPONENT nodes with exact names above, each 360×360.
3. Confirm nothing on the "Velora — Mockups" page was touched.

## Report

Write your full report to
`/Users/tushar/Code/Case Study 3/Velora/.superpowers/sdd/2026-08-10-velora-neumorphism-redesign/task-2-report-rev2.md`
covering: component node IDs + names, style decisions taken, screenshot self-assessment (which pieces read weakest at small size), any deviations.
Return to the controller ONLY: status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED), one-line summary, concerns if any.

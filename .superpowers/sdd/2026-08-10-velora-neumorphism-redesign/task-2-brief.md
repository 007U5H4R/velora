### Task 2: Recraft clay illustration set (6 pieces)

**Files:** generate → `~/Code/Case Study 3/Velora/assets/clay/*.png`; upload into Figma via `upload_assets`.
**Interfaces — Produces:** 6 background-removed PNGs placed on Design System page as named components: `illo/handshake`, `illo/fabric-bolts`, `illo/sewing-machine`, `illo/thread-spools`, `illo/marigold`, `illo/kurta`.

- [ ] Step 1: Load Recraft tools; `create_style` seeded with one master prompt: "soft 3D clay render, matte plasticine, warm ivory background, terracotta sage and muted gold palette, soft studio light, rounded forms, minimal, premium".
- [ ] Step 2: Generate all 6 subjects with that style (handshake with gold bangle; stacked fabric bolts; vintage sewing machine; three thread spools; marigold flowers + loose petals; folded kurta with hang tag). 1024×1024 each.
- [ ] Step 3: `remove_background` on each; save PNGs to `assets/clay/`.
- [ ] Step 4: Consistency gate — view all 6 side by side; regenerate any outlier (different finish/palette) with the same style ID. Max 2 regen rounds, then accept best.
- [ ] Step 5: `upload_assets` into the Figma file; wrap each as a component named `illo/<name>` on the Design System page.
- [ ] Step 6: Verify — screenshot of Design System illustration row; all 6 share palette + finish.


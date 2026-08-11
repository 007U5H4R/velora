### Task 4: Trust Card + gauge components

**Files (Figma):** Design System masters `card/trust`, `gauge/mini`, `gauge/hero`, `badge/cert`, `frame/mehrab`.
**Interfaces — Consumes:** Tasks 1, 3. **Produces:** `frame/mehrab` (arch-top photo mask: rect + top semicircle boolean union, inset in debossed well, 1px gold hairline inside); `gauge/mini` (56px: debossed ring track + sage→gold angular-gradient arc stroke-cap ROUND + Fraunces score); `gauge/hero` (200px: debossed circular well 220 + raised inner disc 160 + gradient ring + Fraunces 48 number); `badge/cert` (32px gold-rimmed circle medallion, Inter 8 caps label); `card/trust` (r28 `neu/raised`, mehrab photo top, name/category/location, mini gauge right, 3 stat chips row, cert badge row).

- [ ] Step 1: Build `frame/mehrab` + `badge/cert` + `gauge/mini` masters.
- [ ] Step 2: Build `gauge/hero`; arc = ARC ellipse with `arcData {startingAngle:-Math.PI*0.75, endingAngle: computed}`, stroke weight 12, ROUND caps, gradient sage→gold.
- [ ] Step 3: Rebuild `card/trust` composing them; verify vendor-photo fills survive as instance overrides.
- [ ] Step 4: Verify — screenshot master + one instance in frame 02; gauge arc renders smooth, arch mask clips photo correctly.


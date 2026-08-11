### Task 3: Rebuild core component masters (buttons, nav, inputs, chips)

**Files (Figma):** Design System page component masters.
**Interfaces — Consumes:** Task 1 styles. **Produces:** updated masters — `btn/primary` (terracotta pill, `neu/raised-terracotta`), `btn/secondary` (ivory pill, `neu/raised`), `btn/pillow` (64px circle, `neu/raised`, icon variants: pass ✕ espresso / details 👁 espresso / save ★ gold / shortlist 🤝 terracotta fill 76px), `nav/dock` (raised r24 bar, 5 slots; active slot = 44px debossed rounded-rect + terracotta icon), `input/well` (`neu/debossed` r16, floating Inter label), `chip/stat` (embossed mini pill), `toggle/role` (debossed trough 64×36 + raised terracotta thumb 28).

- [ ] Step 1: For each master: set fill `EFE6D8` (or terracotta for primary/shortlist), apply effect style, set radius per Global Constraints, restyle text layers (Inter; espresso).
- [ ] Step 2: Instance-check — screenshot 2 frames that consume these masters (02, 11); confirm overrides survived (labels intact, no layout breakage).
- [ ] Step 3: Fix any broken instance layouts (auto-layout padding may need +4–8px for shadow breathing room: shadows need ≥14px clearance from frame edges).


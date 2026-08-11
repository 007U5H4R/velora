# Task DARK-02f: Frame 02 — gauge → electronic wave circle (USER DIRECTIVE, supersedes the DARK-02c donut)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Dark neu system: canvas #1C1D22, raised #26272C, wells #1F2025, ember accent #FF6A00→#E8420A, text #E8E9ED/#B9BBC3/#8A8C94. Runs AFTER DARK-02e — read the live frame first; the gauge area currently holds the DARK-02c donut ring, which this task REPLACES COMPLETELY.

**Reference:** `/Users/tushar/Downloads/1*12CnnDO_7ZE0JkwxbR_oOA.jpg` — the "3.2 mps" circle on the right phone: NOT a ring/arc but an **electronic wave circle** — many overlapping, slightly-perturbed translucent circular strokes forming a soft oscillating mesh/halo (spirograph-like), denser at the ring radius, wispy inside/outside, with the value centered in the clear middle.

## What to build
1. **Generate the wave-circle art locally** (Bash + Python; PIL and/or matplotlib, `pip3 install --user pillow matplotlib` if needed):
   - Transparent PNG ≥1200×1200.
   - ~40–80 circle strokes, each a closed curve r(θ) = R ± small harmonic perturbations (2–3 sine harmonics, random phase/amplitude ~2–6% of R), stroke width thin (~2–4px at 1200px scale), alpha low (~4–10%) so overlaps build the mesh.
   - Palette: ember family — mostly #FF6A00 and #E8420A with a few lighter #FFA25E strokes; keep the middle clear like the reference.
2. **Save the artifact** to `/Users/tushar/Code/Case Study 3/Velora/assets/wave-circle-ember.png`.
3. **Place in Figma:** upload the PNG, put it where the donut gauge sits (same center, similar footprint — read live geometry), DELETE the donut ring/track/well nodes entirely ("completely change"), keep/re-center the existing "94%" text (tier #E8E9ED; keep its current font) in the clear middle. A very subtle dark circular well behind is allowed only if the art floats awkwardly on flat charcoal — reference shows the mesh directly on the surface, so default to NO well.
4. Nothing else on the frame changes.

## Rules & verification
- Only frame 7:2's subtree (+ the asset file); all local; no shared styles/masters/other frames; no copy changes beyond re-centering the 94% text node.
- Verification triple: mesh reads soft/electronic (not muddy blob — check at full res), "94%" clearly legible in the middle, programmatic overflow check 0 new offenders. Post-edit read-backs; final screenshot postdates last edit.

## Report
Write `task-dark02f-report.md` in this directory: generation script/params, artifact path, nodes deleted/added with IDs, geometry read-backs, verification results.

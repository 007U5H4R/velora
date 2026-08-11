# Task DARK-02d: Frame 02 — nav dock as separate tiles (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Dark neu system: canvas #1C1D22, raised #26272C local dual-shadows, wells #1F2025, ember accent #FF6A00→#E8420A, text tiers #E8E9ED/#B9BBC3/#8A8C94. Frame height 864. Runs AFTER DARK-02c (mandala/stack/gauge/green) — read the frame's live state first; node IDs may have changed.

**Reference:** `/Users/tushar/Downloads/1*gza8htfpZ-5eDabA7_kTJw.png` — the bottom nav of the RIGHT phone: four SEPARATE rounded-square neumorphic buttons in a row (not one continuous pill/dock bar), evenly spaced, each a soft raised tile with a centered icon; the ACTIVE one reads distinct (a smaller raised tile sitting on/in a subtle well, icon filled/emphasized) while inactive icons are muted outlines.

## What to build
- Replace the current dock (a single rounded bar with slots) with **4 independent tiles**:
  - Size ~56–64px square, corner radius ~18–20 (match reference proportions), evenly spaced across the same width the dock occupied, bottom edge 12px off the frame bottom (unchanged convention).
  - Inactive tiles: raised #26272C with the frame's local dual-shadow recipe; icons muted (#8A8C94).
  - Active tile (Discover, same slot as now): reference shows a layered read — give it a subtle debossed well or tighter inner raised pad, with the icon in the ember gradient (#FF6A00→#E8420A) as the frame's accent (reference uses a filled dark icon; on our dark frame ember is the equivalent emphasis).
  - Keep the same 4 destinations/icons the dock has now (reuse/move the existing icon vectors; do not invent new destinations). Preserve the "6" badge on its tile: dark surface + light numeral, top-right of that tile, inside frame bounds.
- Delete the old dock bar after the tiles render correctly.

## Rules & verification
- Only frame 7:2's subtree; all effects local; no shared styles/masters/other frames; no copy changes.
- Auto-layout gotchas: appended children reflow parents — layoutPositioning:'ABSOLUTE' as needed.
- Verification triple: soft shadows / icon+badge contrast / programmatic overflow check 0 new offenders (shadows of the tiles must not clip at the frame bottom — 12px margin, verify render bounds). All quantitative claims from post-edit read-backs; final screenshot postdates last edit.

## Report
Write `task-dark02d-report.md` in this directory: tile node IDs + geometry read-backs, icon sourcing, badge handling, deviations, verification results.

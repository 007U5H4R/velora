# Task DARK-02c: Frame 02 — mandala, card stack, donut gauge, green Shortlist (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Dark neu system: canvas #1C1D22, raised #26272C local dual-shadows, wells #1F2025, ember accent #FF6A00→#E8420A, text #E8E9ED/#B9BBC3/#8A8C94. Current carousel nodes (from DARK-02b): peek-card `207:730` (33×264), dots `207:731/732/733` inside cardArea `7:19`. Frame is 864px tall.

Four sub-tasks, all inside frame 7:2's subtree only (plus one local asset file). Never touch shared styles/variables/masters or other frames.

## 1. Golden mandala (replace `motif-mandala`)
- Source line-art: `/Users/tushar/Downloads/72143f11cfc4ea55bb7d6e5d82713044.jpg` (black mandala on white).
- Produce a SHINY GOLD version with transparent background via local image processing (Bash + Python/PIL; `pip install --user pillow` if missing):
  - Alpha = line darkness (dark pixels opaque, white → fully transparent).
  - Fill = vertical gold gradient across the artwork, ~#E8C06A (top) → #C08A2D (mid) → #9A6B1D (bottom) for a metallic sheen.
  - Export PNG at ≥1200px.
- **Save the artifact** to `/Users/tushar/Code/Case Study 3/Velora/assets/mandala-gold.png` (create dir if needed).
- Upload into Figma (upload_assets / image fill) and REPLACE the existing `motif-mandala` subtree in frame 7:2: same general placement role (decorative backdrop) but visibly golden on the charcoal; keep it behind content (z-order below cards/text), opacity high enough to clearly read as shiny gold (~35–60%, judge on screenshot). Delete the old motif-mandala nodes after the replacement is confirmed rendering.

## 2. Card stacking (upgrade the peek treatment)
- Reference: `/Users/tushar/Downloads/image_processing20250205-68665-1md88gc.gif` — a deck of cards stacked BEHIND the main card, offset toward the right, each successively smaller in height/width, lighter/faded, classic stacked-deck read.
- Replace the single `207:730` sliver with a 3-layer stack behind the main trust card: each layer offset ~10–14px further right, inset vertically ~10–16px more per layer, progressively lighter charcoal (#2C2D33 → #33343A) and/or lower opacity, radius matching the card, using the frame's local raised-shadow recipe (soften per layer). Must read like image #8's fanned stack. Keep ≥8px from frame right edge OR bleed naturally behind the card — match the reference's look. Pagination dots stay.

## 3. Donut gauge for the 94%
- Reference: `/Users/tushar/Downloads/Neumorphic-Style-Finance-App-Calculator-Design-281x300.jpg` — the "73%" donut: thick ring (~10–14% of diameter), rounded stroke ends, sits on a debossed/soft neu circular well, percentage number centered inside, progress portion = vivid gradient, remainder = subtle track.
- Rebuild the frame's existing trust gauge (94%) in that style, same position/size budget as the current gauge: dark debossed circular well, track ring in muted charcoal (#33343A), progress arc = 94% sweep with rounded caps in the ember gradient (#FF6A00→#E8420A) with a soft glow, "94%" centered (number #E8E9ED, keep existing font family conventions — Fraunces for the number is fine). Arc must visually read ~94% (leave a small notch). Verify sweep by pixel/geometry read-back.

## 4. Green Shortlist
- Reference: `/Users/tushar/Downloads/7.-grey.png` — its green (mint/emerald toggle + bar, ~#1FC08F/#21C08B family). Sample the actual green from the reference image programmatically and use that.
- Recolor the Shortlist pillow button (`199:862` area): replace the ember gradient + glow with the sampled green (solid or subtle green gradient) + matching soft green glow. Icon/label treatment on it stays legible (#E8E9ED or near-white).
- SCOPE NOTE: leave the active pagination dot and dock icon in ember (user asked only for Shortlist). Flag in the report that the active dot no longer matches Shortlist, for the user's gallery judgment.

## Rules & verification
- Auto-layout gotchas: appended children reflow parents — layoutPositioning:'ABSOLUTE' as needed. rescale() ratio is vs current width.
- Do not alter copy or other components; keep dock 12px off frame bottom; frame height stays 864 unless something genuinely cannot fit (flag if so).
- Verification triple: soft shadows / text contrast / programmatic overflow check (0 new offenders; pre-existing mandala overflows should DISAPPEAR once old motif deleted — confirm). All quantitative claims from post-edit read-backs; final screenshot postdates last edit.

## Report
Write `task-dark02c-report.md` in this directory: the four sub-tasks with node IDs, the sampled green hex, the mandala pipeline (commands used, artifact path), read-backs, deviations, verification results.

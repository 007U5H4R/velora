# Task DARK-02b: Frame 02 — card carousel/pagination treatment (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". The frame is now DARK neumorphism (charcoal #1C1D22 canvas, raised #26272C, wells #1F2025, ember gradient #FF6A00→#E8420A accent, text tiers #E8E9ED/#B9BBC3/#8A8C94) — everything you add must match THAT dark system, not the ivory one.

**Reference image:** `/Users/tushar/Downloads/1gza8htfpZ-5eDabA7_kTJw.png` (light neumorphic banking app). Copy its CAROUSEL PATTERN (not its light palette):
1. **Next-card peek:** behind/beside the main card, a vertical rounded-rect sliver peeking out from one edge (in the ref: a darker card edge peeking to the right of the credit card), implying a horizontally swipeable stack.
2. **Pagination dots:** a centered row of 3 small circular pebbles below the card (ref shows ~10–14px raised neu dots with soft shadows; the active one reads slightly different).

## What to build on frame 7:2
- **Peek sliver:** to the RIGHT of the existing vendor/trust card, a rounded-rect (~24–32px visible width, roughly the card's height, radius matching the card's corner radius on the visible side) suggesting the next vendor card. Dark treatment: a charcoal a step different from the main card (e.g. #2C2D33 or a subtle vertical gradient) with the frame's local soft dual-shadow recipe so it reads as a separate raised card behind the current one. It may tuck partially behind the main card (lower z-order) exactly like the reference. Keep ≥12px from the frame's right edge OR let it bleed off-edge like a real carousel — choose whichever reads more like the reference (the ref's peek card is fully inside with a gap; prefer that).
- **Dots row:** 3 circles, 10–12px, horizontally centered under the card (above the pillow action row), ~14–18px below the card's bottom edge, ~12–14px apart. Style: raised charcoal pebbles with the local dark dual-shadow; ACTIVE (first) dot = ember gradient #FF6A00→#E8420A with a faint glow, matching the frame's accent system.
- **Space:** if the gap between card and pillow row is too tight for the dots, shift the pillow row down by only what's needed — but the dock must stay exactly 12px off the frame bottom and nothing may overflow. Read live geometry first; do not guess.

## Hard rules
- Touch ONLY frame 7:2's subtree. No shared styles/variables/masters. All effects local.
- Do not alter existing copy, the card's content, the gauge, the dock, or the pillow buttons (beyond a pure vertical shift if space demands it).
- Auto-layout gotchas apply: appended children reflow auto-layout parents — use layoutPositioning:'ABSOLUTE' where needed.
- Verification triple: soft shadows / text contrast intact / programmatic overflow check 0 new offenders. Post-edit metadata read-backs for all claimed dimensions; final screenshot postdates last edit.

## Report
Write `task-dark02b-report.md` in this directory: nodes added (IDs, geometry read-backs), any shifts applied, deviations with reasons, verification results.

# Task DARK-02e: Frame 02 — selected-tab highlight in theme orange (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Dark neu system: canvas #1C1D22, raised #26272C, wells #1F2025, ember accent #FF6A00→#E8420A, text #E8E9ED/#B9BBC3/#8A8C94. Runs AFTER DARK-02d — read the live frame first; earlier dark tasks may have changed node IDs/geometry.

**Reference:** `/Users/tushar/Downloads/neumorphic-elements-free-ui-kit.png` — two treatments to copy (in ember, not purple):
1. The "Tab 1 / Tab 2 / Tab 3" bar: the SELECTED tab is a filled gradient pill with white/near-white bold label, sitting slightly raised inside the tab bar; unselected tabs are plain muted labels on the bar surface.
2. The filled "Button": vertical gradient fill, soft matching glow/shadow below, light label.

## What to do
- Find the segmented control / tab selector on frame 7:2 (the "Vendors / RFPs"-type switcher — read the live frame to identify it; user referred to it loosely, match whatever labels exist; if multiple candidate selectors exist, treat the primary content switcher near the top).
- SELECTED segment: filled pill, ember gradient #FF6A00 (top) → #E8420A (bottom), corner radius pill-like per the control's geometry, label near-white #FFF7F2 semi-bold, plus a soft ember glow (like the reference's purple glow under Tab 1/Button, adapted to the dark frame — subtle, not neon).
- UNSELECTED segments: muted label #8A8C94 on the bar surface, no fill pill (match reference's Tab 2/Tab 3 read); the bar itself keeps/gets the frame's raised or debossed local recipe (match whichever it currently has — only restyle the selection treatment unless the bar is still un-darkened, in which case bring it into the dark system).
- Do not change which segment is selected, the labels, or the control's position/size beyond what the pill needs.

## Add-on step (USER DIRECTIVE, same dispatch): enlarge the gold mandala
- The golden mandala image node (`216:730`, currently opacity 0.5) must be enlarged so its WIDTH matches the main trust card's width (read the card's live width and center the mandala on the card's horizontal center; keep its current vertical anchor role as a backdrop, adjust y so it still sits behind the card region gracefully). Preserve aspect ratio — scale uniformly, never stretch. It stays BEHIND all content (z-order unchanged). If at the new size it overwhelms the content, you may drop opacity to ~0.35–0.45 — judge on the final screenshot and report what you chose.

## Rules & verification
- Only frame 7:2's subtree; all effects local; no shared styles/masters/other frames; no copy changes; dock/tiles untouched.
- Auto-layout gotchas: layoutPositioning:'ABSOLUTE' for appended children as needed.
- Verification triple: soft glow not neon / label contrast (near-white on ember, muted on bar) / programmatic overflow check 0 new offenders. Post-edit read-backs for all claims; final screenshot postdates last edit.

## Report
Write `task-dark02e-report.md` in this directory: which control was identified (node IDs), selected/unselected treatments applied with read-backs, deviations, verification results.

# Task DARK-02: Frame 02 "Buyer Discover" — dark neumorphism restyle (USER DIRECTIVE)

**Scope ruling (user, 2026-08-10):** ONE-FRAME restyle, OVERWRITE IN PLACE on node `7:2`. The ivory system stays canonical for every other frame — do NOT touch any other frame, any master component, any shared style or variable. Figma version history is the rollback.

**Reference image:** `/Users/tushar/Downloads/unnamed.png` (dark neumorphic music player). User instruction: "make this frame similar to the image that I have pasted, copy all the style even the black color."

## Style spec extracted from the reference (match these)
- **Canvas / base surface:** near-black charcoal, ~`#1C1D22` (page ground slightly darker, ~`#17181C`); large containers a slightly lighter charcoal ~`#26272C`.
- **Dark neu-raised:** soft light shadow top-left (white at ~4–6% opacity, offset ~(−6,−6), blur ~14) + soft black shadow bottom-right (black ~55–70%, offset ~(8,8), blur ~16). Build these as LOCAL effects on the frame's nodes — do NOT create or modify shared effect styles.
- **Dark neu-debossed (wells/troughs):** inner black shadow top-left + inner faint-white bottom-right.
- **Accent (replaces terracotta CTA role):** ember orange radial/linear gradient `#FF6A00 → #E8420A` (like the pause button) with a soft orange glow shadow. Use ONLY where the ivory frame used terracotta CTA (e.g. the active dock icon well / primary pillow) plus the primary action button.
- **Progress/track accents:** gradient strip red→orange→yellow if the frame has a gauge/progress element.
- **Text:** light gray `#B9BBC3` for labels, near-white `#E8E9ED` for titles, muted `#8A8C94` for secondary. Keep Fraunces/Inter fonts and ALL existing copy.
- **Shapes:** big rounded rects (r28+ cards, r999 pills, circular buttons), same layout as current frame — this is a REskin, not a re-layout.

## What to convert on frame 7:2 (current ivory build)
1. Canvas + every card/panel surface → charcoal set above, with dark neu-raised local effects (replace references to `neu/raised` etc. with local dark equivalents — again, never edit the shared styles themselves).
2. card/trust instance content, 4 btn/pillow row, nav/dock: DETACH these instances first (sanctioned — this frame is leaving the shared system), then recolor detached copies dark; active dock slot = dark debossed well + ember-orange icon; the match-count badge → dark surface + light numeral.
3. Sage/gold/terracotta accents: terracotta roles → ember orange gradient; sage trust marks → keep legible on dark (lighten toward `#8FA878` if needed); gold rims/hairlines → keep gold but raise brightness if invisible on charcoal.
4. All text recolored to the dark-mode text set; verify contrast.

## Verification triple (same bar as all tasks)
(1) dark neu shadows read soft, not muddy/banded; (2) text contrast intact everywhere; (3) programmatic overflow check = 0 nodes outside frame bounds. Post-edit metadata read-backs for every quantitative claim; final screenshot postdates last edit.

## Report
Write `task-dark02-report.md` in this directory: node IDs changed, local effect recipes used, detached instances list, deviations, read-backs, verification results.

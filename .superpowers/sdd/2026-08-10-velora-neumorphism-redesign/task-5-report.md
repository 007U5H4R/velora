# Task 5 Report — Frame "01 · Role Select" Neumorphic Restyle

**Status:** DONE

**Frame node ID:** `3:4` ("01 · Role Select"), page "Velora — Mockups", file `AwWhewtdrQAGoS9jCs3uXi`.
Position/size preserved exactly: x=0, y=140, 390×844 (unchanged).

## Before → After

**Before:** Dark editorial screen (`bg/ink`-style near-black fill, RGB ~0.09/0.07/0.06), cream text, a terracotta gradient wash rectangle behind the hero, two faint hand-drawn (stroke-only) mandala arc frames bleeding across most of the canvas, a huge 5-line 50px Fraunces headline, and two flat horizontal "list row" role cards (334×94, no illustration) whose arrow-icon accessory overflowed the card's own right edge — a pre-existing overflow bug in the old design, now moot.

**After:** Warm-ivory canvas (`surface/cream`, #EFE6D8, bound via variable, not hard-coded), espresso-ink text and status bar chrome, a compact wordmark + gold hairline logo lockup, a shortened 3-line 28px Fraunces headline, and two tall vertical neumorphic choice cards (334px wide, auto-height ~253–269px, radius 28, `neu/raised` effect style, ivory fill) each built around a real clay-illustration instance. A subtle embossed mandala corner relief sits top-right in the previously-empty margin. Trust footer retained, retinted (sage dot + muted text).

## What was replaced with component instances
- **Card 1 "I'm a Brand":** clay illustration is now an instance of `illo/fabric-bolts` (53:6), correctly rescaled 360→160px via `node.rescale()` (see Deviations — first attempt with `.resize()` broke proportional scaling and had to be redone).
- **Card 2 "I'm a Manufacturer":** instance of `illo/sewing-machine` (53:7), same 160px rescale.
- Both illo instances got an added (non-style, per spec) cast shadow: `DROP_SHADOW #C9B49A 35% offset (0,10) blur 24`.
- No CTA button was added — the original frame has no "Continue"/primary-action button (verified from the before-screenshot); the two role cards themselves are the action. `btn/primary` was correctly **not** used, per the brief's conditional instruction.

## What was restyled in place (same nodes, new visual system)
- Frame fill (`3:4`) → bound to `surface/cream` variable.
- Status bar text (`3:6`, `3:8`, `3:10`) → bound to `text/ink`.
- Logo wordmark "Velora" (`3:15`) → bound to `text/ink`; logo frame (`3:13`) converted from a HORIZONTAL to a VERTICAL auto-layout (was side-by-side icon+text, causing the new hairline to render beside the text instead of under it — fixed).
- Headline (`3:17`) → `text/ink`, font size 50→28 (kept Fraunces Black) to fit the new denser composition.
- Subtitle (`3:18`) → `text/muted`, font size 16→13.
- Card frames rebuilt as new auto-layout VERTICAL frames (old `3:22`/`3:29` deleted and replaced, not just retinted, since geometry changed from horizontal rows to illustrated vertical cards): radius 28, fill `surface/cream`, `neu/raised` effect style, `clipsContent:false` so illo shadow bleed can breathe.
- Card titles (Fraunces SemiBold 18) → `text/ink`; card subtitles (Inter Regular 12.5) → `text/muted`.
- Trust footer dot (`3:37`) → `verified/sage`; trust footer text (`3:38`) → `text/muted`.
- Spacer rectangles (`3:16`, `3:19`) and the empty leftover spacer frame (`3:20`, previously 81px of unexplained dead space) resized down (8–12px) to reclaim vertical budget for the taller illustrated cards.
- Card gap set to 20px (`cardsWrapper` `3:21` itemSpacing) to satisfy the "≥20px gaps" requirement.

## What was deleted
- `3:11` — terracotta gradient wash rectangle (old dark-editorial background effect).
- `34:46` — old stroke-only "motif-mandala-2" (mostly off-canvas leftover).
- `34:2` — old stroke-only "motif-mandala-hero" (the large bleeding arc motif behind the old dark hero).
- `3:14` — logo dot ellipse. Removed rather than retinted: per the global constraint terracotta/clay is CTA-only, so the old clay-colored brand dot could not simply be retinted into the new system; the brief's Step 3 spec ("Fraunces 'Velora' + gold hairline") also doesn't call for a dot, so it was dropped rather than forced into a non-compliant color.
- Old card children (`3:22`–`3:35`, including the two arrow-icon accessory frames) — fully replaced by the new card structure, not reused.

## Mandala corner relief — KEEP
Built as 3 concentric ivory ring/arc ellipses (`arcData` inner-radius rings, diameters 100/66/34), grouped in a frame `motif-mandala-relief` (`109:35`), positioned top-right at local (270,14) inside the `content` frame — i.e. ≥14px clearance from every edge, fully inside the clipping container (no hard-clipped shadow edges). Each ring uses the named `neu/raised` effect style as its base (via `setEffectStyleIdAsync`), then has its shadow color alpha multiplied by 0.4 to get the "~40% opacity, shadow-only emboss" look the brief specifies — this is a deliberate, spec-directed deviation from the strict "never hand-copy effect values" global rule, scoped to this one decorative element only. Screenshot check: it reads as a clean, legible, subtle embossed ring motif sitting in open space above/right of the headline — does **not** overlap or muddy any text. Verdict: kept.

## Verification (final screenshot)
- No dark surfaces remain anywhere on the frame (confirmed via a fills audit script: the only "dark" fills flagged were (a) two invisible 0%-opacity spacer rectangles, and (b) small legitimate dark accent details inside the `illo/sewing-machine` instance itself — needle, stitch-marks, thread-grooves — which are illustration detail, not UI chrome).
- Cards have a 20px gap and both breathe (illo shadows visible, not clipped by card bounds).
- No horizontal overflow: cards are 334px wide with 28px side margins inside the 390px frame.
- Status bar, logo, and all old-style dark/terracotta-wash elements are gone.
- Content fits vertically with ~22-28px of margin to spare below the trust footer before the frame's bottom edge (no clipping).

## Deviations from a literal reading of the brief
1. **Font sizes changed** (headline 50→28, subtitle 16→13, card title 24→18, card subtitle 13.5→12.5). Necessary because the brief mandates 160px illustrations inside the cards, which requires substantially taller cards than the original 94px-tall list rows; the original 50px 5-line headline would have pushed total content height to ~845px against a 790px budget. Copy itself is untouched — only type scale, to make room.
2. **Card layout changed from horizontal row to vertical stack** (illo on top, title below, subtitle below that) rather than a side-by-side arrangement, because a 160px-wide illustration cannot fit alongside readable title/subtitle text in a 334px-wide card.
3. **`neu/raised` at reduced opacity for the mandala relief** is technically a hand-adjusted, style-detached effect (see above) — required by the brief's own Step 2 instruction, flagged here since it sits in tension with the general "never hand-copy effect values" rule.
4. **Logo dot removed** rather than retinted (see Deletions above) — clay is CTA-only per the global constraints, and the brief's own Step 3 description of the logo mark doesn't include a dot.

## Known gotcha for future frame restyles (Tasks 6+)
`instance.resize(w, h)` on these clay illustration components does **not** proportionally scale their internal children (they use fixed/non-scale constraints) — it only resizes the instance's own bounding box, leaving internal shapes at their original 360px coordinates and causing massive visual overflow. Use `instance.rescale(targetSize / instance.width)` instead, and compute the scale factor from the instance's *native* width (right after `createInstance()`, before any other resize call) — not from a width that may already have been mutated.

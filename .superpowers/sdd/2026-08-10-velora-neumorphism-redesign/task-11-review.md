# Task 11 Review — Frames 06 (Buyer RFPs, `23:2`) + 06b (Create RFP, `24:2`)

**Method:** Read-only. Loaded `get_metadata` + `get_screenshot` only (no `get_design_context`, no write tools). Cross-checked every quantitative claim in the report against fresh `get_metadata` reads of `23:2` and `24:2`, then downloaded full-resolution (390×844 native) screenshots and inspected upscaled crops of every callout region (cards, dock, FAB, stepper, chips, footer).

---

## Verdict: **FIX REQUIRED** (minor scope — one polish defect; everything else passes)

Both frames are structurally and palette-compliant: correct corner radii, no dark surfaces, terracotta confined to the FAB/submit button, sage confined to the Trust dock icon, no overflow, all copy preserved, all pre-ruled deviations executed as described. The one real issue is a visual-quality defect the report did not surface accurately: the 72px illo accents on all three RFP cards render as a **visible hard-edged rectangular color patch**, not the "soft textural accent" the report describes — this is exactly the failure mode the brief's verification checklist ("no ugly hard shadow-edge artifacts from the clip") called out to check for, and it's present on all three cards. Recommend a follow-up pass before sign-off; nothing else blocks approval.

---

## Spec compliance — item by item

### Frame 06 (`23:2`)

| Item | Spec | Evidence | Status |
|---|---|---|---|
| Card corner radius / size | r28, `neu/raised` | Metadata: `23:19` 350×148, `23:41` 350×142, `23:62` 350×142 — matches report's read-back exactly | Pass |
| Card growth explanation | h142 vs original h138 (+4px) attributed to taller status chip, auto-layout hug | Plausible given auto-layout `VERTICAL`/`AUTO` sizing; can't verify pre-edit state independently but nothing contradicts it | Pass (unverifiable baseline, accepted) |
| Status chips r999, embossed | `neu/raised`, r999 | Metadata: `23:22` 49×17, `23:44` 49×17, `23:65` 62×17 — matches report | Pass |
| LIVE/DRAFT off sage | pre-ruled deviation | Screenshot: LIVE dot+text render ink/dark, DRAFT renders muted gray — correct hierarchy, no sage visible | Pass |
| Illo accents 72px, ≤72px, subtle | pre-ruled at 16% opacity, clipped | Metadata: all three instances (`176:753/765/783`) exactly 72×72 at local (300,−22) — geometry matches claim. **Visually not subtle** — see Findings | **Fix required (Important)** |
| FAB 64px `neu/raised-terracotta`, above dock, no overlap | Metadata: `176:854` 64×64 at (306,668); dock inner top at abs y=748; FAB bottom=732 → 16px clear gap, no vertical overlap. Screenshot confirms solid terracotta circle with cream "+" | Pass |
| Dock: 12px off bottom, centered, RFPs active only | Metadata: container `23:81` y740–844 (104h); dock `176:824` at (12,8) 366×84 → dock visual top abs y=748, bottom abs y=832, frame bottom 844 → **12px clearance**, confirmed independently (matches report). Left/right margins both 12px → centered. Screenshot: only `slot/RFPs` shows a debossed well + terracotta icon; Discover/Matches/Profile are plain muted outlines; Trust icon is sage-green (correct, trust-only use) | Pass |
| Header "New" de-terracotta'd | pre-ruled deviation | Screenshot: cream `neu/raised` pill, ink icon+label, copy "New" intact | Pass |
| No dark surfaces (filter tabs, old dock) | Report claims prior solid dark-ink fills converted | Screenshot: all filter tabs and dock are cream-toned; "Active · 2" reads visibly pressed/debossed vs. the other two raised tabs | Pass |

### Frame 06b (`24:2`)

| Item | Spec | Evidence | Status |
|---|---|---|---|
| All form fields → debossed r16 wells | Metadata: `24:13` 350×52, `24:33` 350×55, `24:38` 350×55, `24:40` 350×51, all fill frame width | Pass (geometry consistent with debossed-well claim; visual crops show recessed cream wells, no stroke) |
| Quantity stepper: two 44px pillows + debossed well, no overflow | Metadata: `182:833` 44×44 at x0, `182:835` 44×44 at x306 (306+44=350, flush) — matches report exactly. Content-frame trailing slack: `24:45` (Requirements) bottom = 498+95=593; `24:12` height=606 → **13px slack**, independently recomputed and matches report's claim | Pass |
| Submit button `neu/raised-terracotta` | Screenshot pixel-sampled fill ≈ (193,91,60) = exact match to spec terracotta #C15B3C; white "Post RFP →" text, high contrast | Pass |
| Category chips no longer sage | Screenshot: all five chips (incl. selected "Tees & knits") render cream/ink, no green anywhere | Pass |
| Requirement chips no longer sage | Screenshot: GOTS/Pre-prod/Net 30/+SMETA all cream/ink, checkmarks ink, no sage stroke or tint | Pass |
| "Save draft" de-terracotta'd | Screenshot: renders muted gray, clearly subordinate to the terracotta submit CTA | Pass |
| Footer seam/halo (report claims fixed) | Screenshot: clean cream footer bar behind the button, no visible seam or double-shadow halo | Pass |

### Both frames — cross-cutting checks

- **No terracotta outside FAB/submit:** confirmed by screenshot scan — only the FAB (06) and "Post RFP" button (06b) carry terracotta fill.
- **No sage outside Trust:** confirmed — the only sage-green in either frame is the dock's Trust shield icon (appropriate, since that's the trust context itself).
- **No dark surfaces:** confirmed across both frames.
- **No clipped text:** confirmed — no truncated/overflowing text found in either frame at any zoom level checked.
- **Overflow (independent re-check, not trusting the report's "0 nodes" claim):** re-derived from raw metadata bounds for both frames — no child's `x+width` or `y+height` exceeds its frame in a way that isn't (a) the illo accents' *intentional* clip-masked bleed (see below) or (b) already-accounted-for slack. Frame 06b's 13px trailing slack independently reproduced. No violations found.
- **Illo clip geometry:** `176:753/765/783` are positioned at local (300,−22) inside 350×148(/142) cards with `clipsContent` presumably true (per report) — so the accent legitimately bleeds ~22px above/right of the card's own box but is clipped by the card, never reaching the frame edge. This is geometrically sound and matches the pre-ruled deviation. The problem is **how** the clipped result reads visually (see Findings below), not whether it overflows.

---

## Findings

### Important

1. **Illo card accents read as a hard-edged geometric patch, not a soft accent — present on all 3 cards (06).**
   Zoomed crops of all three cards (top-right corners) show a distinctly bounded pink/salmon rounded-corner shape with a **visible internal straight vertical seam** splitting it into two flat color bands, plus (card 2) an isolated greenish fleck peeking above it. This is not a diffuse 16%-opacity wash; it's a legible geometric silhouette with a hard edge, most conspicuous on card 3 where it sits directly behind/right of the "Finish setup →" pill. Pixel sampling at 16% opacity does show a low absolute color delta (~5–8 RGB values off the cream base), so it isn't a *palette* violation — but it fails the task's own explicit verification gate: "confirm no ugly hard shadow-edge artifacts from the clip at full res." The report's characterization ("reads as a soft textural accent") does not match what's actually rendered. Recommend: either lower opacity further, crop the illustration source art tighter before placing so no straight interior edges from the source vector art are exposed at the clip boundary, or feather/mask the clip edge.

### Minor

2. **Gold-colored "bids" stat (pre-existing, out of Task 11's scope) is a text/icon fill, not a hairline/rim/motif.** The bid-count chip ("4 bids", "1 bids") on cards 1/2 uses a gold/amber fill (~#C79642, sampled) for the numeral, icon, and label — this predates Task 11 (its node IDs are not in the report's touched/created list) and the brief didn't ask this task to restyle it. Flagging only because the global constraint ("gold hairlines/rims/motifs only") is nominally violated by an element sitting untouched in the reviewed frame. Not a Task 11 defect — worth a ticket for whichever task owns that component.

### Report-accuracy notes

- All geometric claims that could be independently re-derived from metadata (card heights, chip dimensions, dock clearance/centering, FAB margins, stepper button positions, 06b trailing slack) **checked out exactly** against a fresh read-back — the report's numbers are accurate, not fabricated.
- The report's qualitative claim about the illo accents ("reads as a soft textural accent rather than competing with foreground text") is **not supported** by the full-res screenshots — see Important finding #1. The report under-sells the visible seam artifact; this is the one place prose and pixels diverge.
- The "0 nodes exceeding frame bounds" overflow claim for both frames held up under independent spot-checking of the highest-risk regions (illo bleed, stepper edges, 06b trailing slack) — no contradiction found.

---

## Summary

Frame 06 and 06b are otherwise ready: palette discipline, radii, dock geometry, stepper layout, sage/terracotta scoping, and text contrast all check out against the spec and against the report's own numbers. The one thing to fix before final sign-off is the illo card-accent rendering (Important #1) — a visual polish issue, not a structural or brand-rule violation, but it directly fails the verification gate the brief itself asked for. The gold-bids-chip note (Minor #2) is informational, not a blocker for this task.

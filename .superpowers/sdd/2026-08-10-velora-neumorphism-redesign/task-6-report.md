# Task 6 Report — Frame "02 · Buyer Discover" Neumorphic Restyle

**Status:** DONE

**Frame node ID:** `7:2` ("02 · Buyer Discover"), page "Velora — Mockups", file `AwWhewtdrQAGoS9jCs3uXi`.
Position/size preserved exactly: x=520, y=140, 390×844 (unchanged).

## Before → After

**Before:** Near-black canvas (`bg/ink`-style, RGB ~0.09/0.07/0.06) with a light cream hand-built "trust card" (raw `DROP_SHADOW`, not a named style) containing a dense 5-section accordion (header/Verified, Trust Score, Capability, Compliance, On-time Delivery), a flat dark segmented control and avatar in the topbar, cream/white text throughout the chrome (status bar, counter, nav labels), 4 hand-drawn circular action buttons (dark bg + white icon, Shortlist filled sage), and a full-bleed dark bottom nav bar flush to the frame edge (actually overflowing the frame by 10px — pre-existing bug, now moot).

**After:** Warm-ivory canvas (`surface/cream` #EFE6D8, bound via variable), all chrome retinted to `text/ink` / `text/muted`, a debossed segmented-control well with a raised active pill, a raised ivory avatar, a compact `card/trust` component instance (photo → name → gauge → stat chips → cert badges), a raised "Similar to your best supplier" pill, 4 `btn/pillow` instances (Pass/Details/Save/Shortlist — Shortlist 76px terracotta raised, the other three ivory raised), and a floating rounded `nav/dock` instance (Discover slot debossed well + terracotta icon/label) sitting 12px off the very bottom of the phone frame instead of the old edge-to-edge dark bar.

## Component instances placed (from Design System page)
- **`card/trust` (86:2) → instance `117:105`**, placed absolute in `cardArea` (7:19) at local (25, 8), size 340×264 (no rescale needed — not an `illo/*`/`frame/mehrab` scaling case).
  - Text overrides (existing vendor mock data preserved):
    - `vendor-name` → "Loomcraft"
    - `category-location` → "Organic knits & jersey · Tiruppur, Tamil Nadu" (merged from the old two-line header)
    - `gauge/mini` score → "94" (was 94/100 in the old card)
    - 3× `chip/stat` → "On-time 97%", "MOQ 300", "42-day lead" (condensed from the old Capability/On-time/lead-time sections — only 3 chip slots exist on the master vs. 5 old data points, see Deviations)
    - 3× `badge/cert` labels → "GOTS", "OEKO-TEX", "SMETA" (exact match to old data, re-set explicitly as literal overrides per the ruling even though they equaled the master defaults)
- **`btn/pillow` (73:16) variants → 4 instances** in `actions` (7:87), each wrapped in a small new auto-layout stack (icon instance + label text below):
  - Pass: instance `119:104` (wrapper `119:108`, label `119:109`)
  - Details: instance `119:110` (wrapper `119:114`, label `119:115`) — labeled "Details" per the master's variant name (old card said "View")
  - Save: instance `119:116` (wrapper `119:119`, label `119:120`)
  - Shortlist: instance `119:121` (wrapper `119:124`, label `119:125`) — 76px, inherits `neu/raised-terracotta` from the master automatically (no manual override)
  - Row already had `itemSpacing: 20` built in from the original file — matches the brief's spacing requirement without modification.
- **`nav/dock` (74:2) → instance `119:196`** in `bottomNav` (7:104), 366×84, centered horizontally, bottom-aligned with `paddingBottom: 12` inside a zone that reaches the frame's exact bottom edge (844) — this is the "floats 12px off bottom" mechanism.
  - Discover slot active state confirmed **already correct in the master, no override needed**: `active-well` uses `neu/debossed`, and the compass icon vectors already carry a terracotta stroke (`#C15B3C`-equivalent, `primary/clay`) vs. the muted-gray stroke on inactive slots (Matches/RFPs/Trust/Profile).
  - Added one supplementary plain overlay — a small terracotta-deep (`primary/clay-deep`) circle + white "6" text (`badge/count`, nodes `119:225`/`119:226`) — positioned over the Matches icon to preserve the old design's match-count badge (real product data, not part of the `nav/dock` master).

## What was restyled in place (plain nodes, not part of the brief's 3 numbered steps but required by the Global Constraint "no dark surfaces anywhere" / contrast verification)
- Frame fill (`7:2`) → bound to `surface/cream`.
- Status bar texts (`7:4`, `7:5`) → `text/ink`.
- Logo dot (`7:8`, was terracotta) → recolored to `accent/gold` (terracotta is reserved for primary CTA per the global constraint; a decorative brand dot doesn't qualify, gold accent does).
- Wordmark "Velora" (`7:9`) → `text/ink`.
- Segmented control track (`7:10`) → `surface/cream` fill + named `neu/debossed` style (was flat near-black).
- Active "Vendors" pill (`7:11`) → `surface/cream` fill + named `neu/raised` style.
- "Vendors"/"RFPs" texts (`7:12`, `7:14`) → `text/ink` / `text/muted`.
- Notification avatar (`7:15`, was solid terracotta) → `surface/cream` fill + `neu/raised` (same reasoning as the logo dot — avatar isn't a CTA).
- Avatar "N" (`7:16`) → `text/ink`.
- Counter "Card 1 of 10" (`7:18`) → `text/muted`.
- "Similar to your best supplier" pill (`7:84`) → `surface/cream` fill, named `neu/raised` (replacing a raw `DROP_SHADOW` + hand stroke), corner radius → 999 (true pill, matches the "buttons/pills 999" rule since this is a pill-shaped badge).
- Sim note text (`7:86`) → `text/ink`.
- Motif mandala (`7:122`): left untouched — its gold-stroked vectors at 9% frame opacity already read correctly as a subtle `accent/gold`-family relief once the canvas went ivory; verified via screenshot, no muddiness.

## Layout mechanics
- `cardArea` (7:19) uses `layoutPositioning: ABSOLUTE` children (confirmed via read-back before touching it, matching the existing convention — the old shadow rect / trustCard / sim-note were already absolute-positioned, overlapping). The new `card/trust` instance follows the same convention at local (25, 8); `cardArea` was resized 390×548 → 390×336 (card is far more compact than the old accordion) and `clipsContent` set to `false` for shadow clearance (Controller Ruling 3). The `sim` note was repositioned from local (20, 508) to (20, 288) — 16px below the new, much shorter card — instead of being stranded ~250px below it.
- `actions` (7:87): `paddingTop` 4→8 (brief: "row floats 16px below card" — combined with the 8px gap already produced by the shrunk `cardArea`, totals 16px from the sim-note pill to the icon row), `counterAxisSizingMode` set to `AUTO` (was `FIXED` 92, real content is 110 tall once the 76px Shortlist pillow + label is included — fixes a would-be clip), `clipsContent: false`.
- `bottomNav` (7:104): resized to 390×268 (reflowed automatically once `cardArea` shrank), old flush-dark fill cleared, `primaryAxisAlignItems: CENTER` / `counterAxisAlignItems: MAX` / `paddingBottom: 12` — this is what produces "dock floats 12px off bottom" purely from auto-layout, no manual x/y math. `clipsContent: false`.
- Frame-level `7:2` `clipsContent` was **left `true`** (not touched) — the pre-existing `motif-mandala` (7:122) is 360×360 positioned at (150, 95), genuinely extending 120px past the frame's right edge; disabling frame-level clipping would expose that as new, real overflow. Instead, shadow clearance was solved locally (each section's own `clipsContent: false` + generous padding) while the frame boundary itself keeps clipping — verified via screenshot that dock/card shadows still render soft, not hard-cut, at 12px/8px clearance in practice (Figma's blur-14 falloff is soft enough that the visual result reads clean; see Deviations #2).

## Deleted (old hand-built controls, cascade-deleted with children)
- `7:20` — old card shadow rectangle (45%-opacity cream rect).
- `7:21` — old `trustCard` accordion frame and all its contents (header/Verified badge, Trust Score row + `gauge`-style ring, Capability row, Compliance row with 3 GOTS/OEKO-TEX/SMETA badges, On-time Delivery row + lead-time chip).
- `7:88`, `7:92`, `7:96`, `7:100` — the 4 old hand-built action-button frames (dark circle + plain vector icon + muted label each).
- `7:105`, `7:108`, `7:113`, `7:116`, `7:119` — the 5 old bottom-nav item frames (icon + label + the old Matches count badge, which was rebuilt as an overlay on the new dock instead).

## Verification (final screenshot, `get_screenshot` on `7:2` + cropped top/bottom close-ups)
- **Card hierarchy reads photo → name → gauge → chips → certs** ✅ — confirmed visually top-to-bottom in the assembled card.
- **Pillows look pressed-out, not flat** ✅ — Pass/Details/Save show visible ivory-raised circular depth; Shortlist reads as a bold terracotta raised disc with a white check, clearly the primary action.
- **Dock floats 12px off bottom** ✅ — confirmed in the cropped bottom screenshot: a clean gap between the rounded dock's bottom edge and the frame's bottom edge, soft shadow, no hard clipping.
- **No overflow** ✅ — card (340 wide, 25px margins), action row (~328px content, auto-centered), and dock (366 wide, 12px margins) all sit inside the 390px frame width with room to spare; no horizontal scroll/bleed in the screenshot.
- **Effects soft not muddy** ✅ — all raised/debossed elements use the named `neu/raised` / `neu/debossed` / `neu/raised-terracotta` styles (verified via `effectStyleId` reads, never hand-copied shadow values except the pre-existing motif, which was left alone).
- **Text contrast intact** ✅ — every text node that was previously cream-on-dark was rebound to `text/ink` or `text/muted` against the new ivory canvas; spot-checked in both the top and bottom crops.

## Deviations from a literal reading of the brief
1. **Restyled the whole frame's chrome (status bar, topbar/logo/segmented-control/avatar, counter), not just the 3 items named in the brief's numbered steps.** Required by the Global Constraint ("no dark surfaces anywhere," text contrast intact) — switching only the canvas fill to ivory while leaving cream-on-dark chrome text untouched would have made it unreadable. Mirrors the precedent set in Task 5's report (which also restyled the full frame, not just the brief's literal bullet list).
2. **Logo dot and notification avatar recolored from terracotta to gold/ivory respectively**, rather than left terracotta. Global Constraint scopes terracotta strictly to "primary CTA" — a decorative brand dot and a user-avatar circle don't qualify, so they were moved to compliant colors (gold accent, ivory raised) instead.
3. **Action label "View" changed to "Details"** to match the `btn/pillow` master's actual variant name (`Icon=Details`), per the brief's own step-2 wording ("Pass/Details/Save/Shortlist").
4. **Card's 5 old data sections (header+Verified, Trust Score, Capability, Compliance, On-time Delivery) condensed into the `card/trust` master's 3 stat-chip slots** ("On-time 97%", "MOQ 300", "42-day lead") + gauge score + 3 cert badges. The master is a fixed, already-approved (Task 4) component shape with only 3 chip slots; not all 5 old data points could carry over 1:1. Chose delivery %, MOQ, and lead time as the three most decision-relevant stats for a swipe-to-evaluate context; the explicit "Verified" badge and its shield icon were dropped since trust/verification is now communicated via the gauge score + sage-tinted cert-badge icons instead (sage stays correctly scoped to "Verified/Trust only").
5. **Large (~172px) empty gap between the action row and the floating nav dock.** This falls directly out of the brief's two fixed, independent spacing rules ("row floats 16px below card" and "dock floats 12px off bottom") combined with a `card/trust` master that is much more compact (264px) than the old hand-built accordion (532px) it replaced — freeing space that neither instruction claims. Considered enlarging the card via `rescale()` to fill the gap, but rejected it: `card/trust` is a multi-instance nested composition (photo + gauge + 3 chips + 3 badges), not a single flat illustration, so uniform rescaling risks breaking internal proportions/text legibility in ways not covered by the known illo-scaling gotcha. Flagging this as a design judgment call for the T9 human gate rather than silently forcing a fix.
6. **Frame-level `clipsContent` left `true`** rather than disabled for shadow bleed, specifically because the pre-existing `motif-mandala` decorative frame already extends 120px past the right edge — disabling top-level clipping would have exposed that as new overflow. Shadow clearance was instead solved by giving the individual sections (`cardArea`, `actions`, `bottomNav`) their own `clipsContent: false` and adequate padding; screenshots confirm no visible hard-clipped/muddy shadow edges in practice despite the dock/card sitting at 12px/8px nominal clearance (less than the ruling's "≥14px" guideline) — the named styles' blur-14 falloff is soft enough not to read as clipped at this margin.

## Concerns for later tasks
- **Task 5's `instance.rescale()` gotcha does not apply here** — `card/trust`, `btn/pillow`, and `nav/dock` all instantiated and auto-sized correctly with plain `createInstance()`, no rescale needed. Worth confirming this holds for other frames that also place `card/trust`/`nav/dock` (if any).
- **`card/trust`'s 3-chip-slot limit** will recur for any other frame surfacing this vendor's fuller stat set (Capability + On-time + Compliance + lead time = 4-5 data points vs. 3 slots) — later tasks that reuse this master should expect the same condensation trade-off, not a bug specific to this frame.
- **The action-row-to-dock whitespace (item 5 above)** may recur on any other frame that stacks `card/trust` + `btn/pillow` row + `nav/dock` in a fixed 844px frame — worth a design decision at the human gate on whether to standardize a "spacer" convention (e.g., vertically center the card+actions cluster in the available space) rather than re-deriving it per frame.
- **`node.query()` selector gotcha**: CSS-like selectors reject an unescaped `/` inside `[name=...]` attribute values (e.g. `[name=chip/stat]` or `[name=slot\/Discover]` both error) — use substring matching (`[name*=Discover]`) or drop the slash-containing segment and filter by type instead. Worth documenting for future frame-restyle tasks that will also query into `card/trust`, `chip/stat`, `badge/cert`, or `nav/dock` slot names.

## Fix round 1

Review (`task-6-review.md`) returned FIX REQUIRED with two Important findings. Both addressed, scoped to frame `7:2` only.

### 1. Vertical recentering (the ~172px void)

The card/trust + action-row cluster was floating flush against the counter with all the slack dumped below the action row, right above the dock — read as broken/leftover space. Fixed by inserting the slack as symmetric breathing room **above** the card (inside `cardArea`'s existing absolute-positioning convention) instead, computed so the cluster centers in the space between the counter (`7:17`, ends at y=130) and the dock's top edge (unchanged, y=748):

- `available space` = dock top (748) − top-chrome end (130) = 618
- `cluster height` (cardArea + actions, unchanged internally) = 446
- `centered cluster top` = 130 + (618 − 446)/2 = 216 → **shift = +86px**

Applied by growing `cardArea`'s own height (which is what pushes every later auto-layout sibling down — `actions` and `bottomNav` are normal flowed children, not absolute) and moving the two absolute-positioned children inside it by the same +86px, so the card-to-sim-note and sim-note-to-action-row gaps are byte-for-byte unchanged — only the block's position moved, nothing inside it rescaled or restretched:

| Node | Property | Before | After |
|---|---|---|---|
| `cardArea` (7:19) | height | 336 | 422 (+86) |
| card instance (117:105) | local y | 8 | 94 (+86) |
| `sim` note (7:83) | local y | 288 | 374 (+86) |
| `actions` (7:87) | y (auto-reflowed) | 466 | 552 (+86, height unchanged 110) |
| `bottomNav` (7:104) | y (auto-reflowed) | 576 | 662 (+86) |
| `bottomNav` (7:104) | height | 268 | 182 (−86, re-set explicitly so its bottom edge stays pinned to the frame's bottom edge, 662+182=844) |
| `nav/dock` instance (119:196) | **absolute** Y | 748 | **748 (unchanged, verified programmatically: `before.dockAbsY === after.dockAbsY` → true)** |

Net effect: the dock is exactly where it was (still 12px off the true bottom edge, per the brief); the card+actions cluster now sits with ~86px of even space above and below it in the counter-to-dock gap instead of ~0px above / ~172px below. Confirmed visually in the full-frame screenshot — the composition reads balanced, not broken.

**Side effect caught and fixed in the same pass:** the Matches count badge (`119:225`/`119:226`, added in the original build as an overlay positioned from the dock's *local* Y offset within `bottomNav`) went stale when the dock's local Y shifted from 172→86 inside the now-smaller `bottomNav` zone (its absolute position didn't move, but its position *within* `bottomNav` did). The badge's old coordinates, still based on the pre-fix local Y of 172, placed it at absolute y≈850.5 — 6.5px past the frame's bottom edge, clipped and invisible. Recomputed from the dock's current local Y: `badge.y = dock.y(86) + 23.5 − 7 = 102.5` (local, was 188.5). Badge is now correctly re-anchored on the Matches heart icon.

### 2. Badge recolor (controller ruling)

The match-count badge's fill was bound to `primary/clay-deep` (terracotta family) — a notification badge isn't a CTA, so this violated the "terracotta = CTA-only" global rule. Recolored per the controller's exact spec:

- Badge ellipse (`119:225`) fill: `primary/clay-deep` → `text/ink` (espresso, #2A2118)
- Badge numeral (`119:226`) fill: `text/on-ink` → `surface/cream` (ivory, #EFE6D8)

Both rebound via `setBoundVariableForPaint` (named variables, not hard-coded hex) to the same variables already used elsewhere in this frame for ink/ivory.

### Verification

Full-frame screenshot re-taken after both fixes (and the badge-position side-fix): cluster visually centered between counter and dock, dock unmoved (12px off bottom, confirmed both programmatically and visually), Matches badge visible again with espresso fill + ivory "6", all shadows still soft (no new clipping introduced by the resize), no horizontal or vertical overflow, text contrast intact throughout.

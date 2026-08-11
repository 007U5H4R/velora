# Task 6 Review — Frame "02 · Buyer Discover"

**Reviewed:** live Figma state only (read-only: `get_metadata` + `get_screenshot`). No git diff exists for this task (Figma-native).
**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups", frame `7:2` ("02 · Buyer Discover"), 390×844, position (520,140) — matches the report's "unchanged" claim (no pre-task snapshot available to diff against independently, see Cannot Verify).

## Stage 1 — Spec Compliance

| Brief step | Verdict | Notes |
|---|---|---|
| **1. Ivory canvas; swap old card for `card/trust`, keep vendor data via overrides** | ✅ | Metadata confirms `117:105` instance of `card/trust`, 340×264, at local (25,8) in `cardArea` (7:19). Screenshot: photo (mehrab arch) → "Loomcraft" → gauge "94" → chips "On-time 97% / MOQ 300 / 42-day lead" → cert badges "GOTS / OEKO-TEX / SMETA" — all data matches the pre-existing vendor mock data cited in the report. Frame fill is ivory throughout, no dark surfaces. |
| **2. Action row: 4 `btn/pillow` (pass/details/save/shortlist), Shortlist 76px terracotta, 20px spacing, row floats 16px below card** | ✅ (Minor) | Metadata confirms exact 20px gaps: Pass (31–95) → Details (115, gap 20) → Save (199, gap 20) → Shortlist (283, gap 20). Shortlist instance `119:121` is 76×76 and screenshot shows it as a bold terracotta raised disc with white check — clearly reads as the primary CTA vs. the three ivory-raised pillows. **"16px below card" is satisfied loosely, not literally**: the literal card-bottom-to-row gap is ~78px because the pre-existing "Similar to your best supplier" sim-pill sits between them (as it did in the old design); the 16px figure is achieved from sim-pill-bottom to the actions container boundary (~8px) plus the container's own top inset. This is a reasonable, disclosed interpretation (report Deviation notes it), not a literal-spec break — flagged Minor, not blocking. |
| **3. `nav/dock` instance, Discover slot active (debossed + terracotta icon), dock floats 12px off bottom** | ✅ | Metadata confirms `119:196` instance of `nav/dock`, 366×84, at local (12,172) inside `bottomNav` (abs y=576). Absolute dock bottom = 576+172+84 = 832; frame height 844 → gap = **exactly 12px**, matches spec precisely. Screenshot confirms Discover slot renders with a light inset well + terracotta compass icon + bold label, clearly distinguished from the four muted-gray inactive slots (Matches/RFPs/Trust/Profile). Trust slot correctly uses a sage-tinted shield icon (Verified/Trust context) — consistent with the global color rule. |
| **4. Verify: hierarchy photo→name→gauge→chips→certs; pillows read pressed-out not flat** | ✅ | Confirmed visually on a dedicated `cardArea` crop — top-to-bottom/left-right hierarchy is exactly photo → name+location → gauge (top-right) → stat chips → cert badges. Pillow crop shows Pass/Details/Save with a visible soft raised puff (light top-left highlight, warm shadow bottom-right) reading as pressed-out, not flat; Shortlist reads as a strong terracotta raised primary action. |

**Global constraints spot-check:**
- No dark surfaces anywhere — confirmed, canvas + all chrome (status bar, topbar, segmented control, avatar, counter) retinted to ivory/espresso per the controller's pre-ruling #1. Clean execution.
- Terracotta CTA-only — Shortlist button and the Discover active nav icon are the only large terracotta uses and both are legitimate per brief/master. **However, see Important finding below** re: the new match-count badge.
- Sage Verified/Trust-only — cert badge shields and the dock's Trust icon are the only sage uses. Correct.
- Gold hairlines/motifs only — logo dot (pre-ruled #2) and the photo-mehrab arch hairline are the only gold uses; no gold surface fills. Correct.
- No new overflow: card (340w + 25px margins = 390), action row content (Pass 31 → Shortlist 359, within 390), dock (366w + 12px margins = 390) — all fit the 390px frame width exactly. Vertically, status(52)+topbar(52)+counter(26)+cardArea(336)+actions(110)+bottomNav(268) = 844, matching frame height exactly — no new vertical overflow introduced. The pre-existing `motif-mandala` overflow (report's item 6) is untouched, unrelated to this task, and stays masked by the frame's own `clipsContent:true` as before.
- Shadow-bleed clearance: independently re-verified by fetching a tight crop directly on the `nav/dock` instance (`119:196`) despite its declared 12px clearance to the frame edge (below the ruling's "≥14px" guideline, as the report itself flags). The render shows the shadow falling off softly on all sides including the bottom, with no visible hard-cut edge — corroborates the report's own claim. This is a self-disclosed tight margin, not a hidden defect; noting as Minor.

## Stage 2 — Quality (premium warm-ivory neumorphism bar)

- **Effects soft not muddy:** Card, action pillows, and dock all show smooth, layered raised/debossed shadows with no harsh or muddy edges. Chip/badge wells inside the card read correctly recessed against the card's own raised surface (proper nested light/dark logic).
- **Text contrast intact:** Every text element (status bar, "Velora", "Vendors"/"RFPs", avatar "N", counter, card name/location/stats/cert labels, action labels, dock labels) reads as dark espresso-family text on ivory with clearly sufficient contrast; no leftover cream-on-dark artifacts from the old dark-canvas version.
- **Hierarchy/legibility:** Card reads cleanly at a glance; primary CTA (Shortlist) is unambiguous; active nav state is unambiguous.
- **Full-chrome consistency:** Segmented control, avatar, and logo dot all correctly migrated off the old flat-dark styling to raised/debossed ivory treatments — matches the quality bar set by other approved frames/components.

### Open judgment question — the ~172px gap between action row and dock

Computed precisely from metadata: `actions` ends at absolute y=576; `nav/dock` top is at absolute y=748. **Gap = 172px**, in an 844px-tall phone frame — roughly 20% of the total screen height sitting empty.

**Judgment: this reads as a broken/unbalanced layout, not intentional breathing room.** In the full-frame screenshot, the transition from a tightly-composed card+action cluster (ending ~55% down the screen) to a large flat ivory void, then a comparatively small floating dock near the very bottom, does not read as deliberate whitespace — it reads as leftover space from swapping a 532px accordion for a 264px card without any compensating layout change. There's no secondary content, divider, or visual anchor in the gap to make it feel intentional (contrast with typical swipe-card apps, which either keep the action row close under the card or vertically center the whole card+action cluster in the available space).

**Filing as an Important finding** (see below) with a concrete suggestion: vertically recenter the `cardArea` + `actions` cluster as a group within the 130–576px zone (446px of available vertical space vs. ~446px currently used almost identically at the top, leaving all slack at the bottom) — e.g., split the freed space roughly evenly above the counter/below actions, or reduce top offset and add a fixed buffer above the dock. Rescaling the card itself was correctly rejected by the implementer (real risk to the nested multi-instance composition) — recentering the group is the lower-risk fix and doesn't touch component internals.

## Findings Summary

- **Critical:** none.
- **Important:**
  1. **~172px empty gap between the action row and the floating dock reads as unbalanced/broken, not intentional.** See judgment section above. Suggested fix: vertically recenter the card+sim-pill+action-row cluster within its available zone rather than leaving all the freed space stacked at the bottom. This was self-flagged by the implementer as a judgment call for the human gate, but on visual review it crosses from "worth a design decision" into "should be corrected before sign-off" given how prominent the void is at a glance.
  2. **New match-count badge ("6" on the Matches nav icon) uses a terracotta-family fill (`primary/clay-deep`), which is not covered by any approved master and is not a CTA.** The global constraint scopes terracotta strictly to CTA use; a notification/count badge is not a CTA. This wasn't addressed by any of the controller's four pre-rulings (which cover the logo dot, avatar, "Details" label, and the condensed card — not this new overlay). Since it's real product data worth preserving (as the report argues) but not part of `nav/dock`'s master, recommend either: (a) getting explicit controller sign-off to extend terracotta's allowed usage to count badges, or (b) recoloring the badge to a neutral/espresso-on-cream treatment so it doesn't consume the CTA-reserved color for a non-CTA element.
- **Minor:**
  1. "Row floats 16px below card" is satisfied against the sim-pill, not the card itself (literal card-to-row gap is ~78px) — a reasonable, disclosed interpretation, not a defect.
  2. Dock's 12px bottom clearance is below the ruling's "≥14px" shadow-clearance guideline; independently re-verified via a dedicated crop and confirmed no visible clipping in practice, but the margin is genuinely tight and worth keeping in mind if this dock ever gets a stronger shadow style in a future pass.

## Cannot Verify (outside read-only tool scope)

- Whether `card/trust`, `btn/pillow` (×4), and `nav/dock` instances are true instances of their stated masters (`86:2`, `73:16`, `74:2`) vs. detached copies — `get_metadata`'s XML gives instance names but not `mainComponentId`.
- Whether effects are bound via named styles (`neu/raised`, `neu/debossed`, `neu/raised-terracotta`) vs. hand-copied shadow values on any of this frame's plain-node restyles (segmented control, avatar, sim-pill, etc.) — not visible in `get_metadata` output, not distinguishable from a screenshot.
- Exact fill/text hex values (ivory `#EFE6D8`, espresso `#2A2118` vs. `#17130F`, terracotta `#C15B3C`, sage `#61734E`, gold `#C08A2D`) — `get_metadata` does not return fill colors; visual read is consistent with the palette but not numerically confirmed.
- Exact corner radius values (card 28, pills 999, dock 24, wells 16–20) — not returned by `get_metadata`; visually consistent but not numerically confirmed.
- Whether the Discover slot's active well is literally bound to the `neu/debossed` style vs. a plain inner-shadow copy — visually plausible (reads as a subtle inset well) but not confirmed at the style-binding level.
- "Frame position/size unchanged" — no pre-task snapshot was available to independently diff against; taking the report's before/after description at face value here, consistent with the same caveat in the Task 4 review.

## Verdicts

**Spec verdict:** ✅ Approved (all 4 brief steps executed correctly; one Minor interpretive gap on the "16px" spacing wording, disclosed and reasonable).
**Quality verdict:** ⚠️ **FIX REQUIRED** — two Important findings: (1) the action-row-to-dock gap reads as an unbalanced/broken layout on visual inspection, not acceptable breathing room, and needs a recentering fix; (2) the new match-count badge uses the CTA-reserved terracotta color for a non-CTA element without controller sign-off.

**Overall: FIX REQUIRED.**

## Scoped re-review (fix round 1)

**Method:** read-only re-check against live Figma state only (`get_metadata` + `get_screenshot` on `7:2` and cropped `7:104`). Not a full re-review — scoped strictly to the two Important findings plus a regression scan.

### Finding 1 — ~172px broken void between action row and dock: **RESOLVED**

Metadata confirms the report's fix-round table exactly:
- `cardArea` (7:19): height 336 → **422** (+86), abs y unchanged at 130.
- Card instance (117:105): local y 8 → **94** (+86), size unchanged 340×264.
- `sim` note (7:83): local y 288 → **374** (+86).
- `actions` (7:87): abs y 552 (reflowed +86 from 466), height unchanged 110.
- `bottomNav` (7:104): abs y 662 (reflowed +86 from 576), height 268 → **182** (−86); 662+182=844, bottom edge still pinned to frame bottom.
- `nav/dock` instance (119:196): local y within `bottomNav` shifted 172→**86**, but **absolute y unchanged at 748** (662+86=748, matching pre-fix 576+172=748) — confirms the report's "dock unmoved" claim numerically, not just by assertion.
- Dock bottom = 748+84 = 832; frame height 844 → **gap still exactly 12px**, unchanged.

Gap-symmetry check: top-chrome ends at y=130 (counter bottom), card now starts at abs y=224 → 94px of space above the cluster; action row ends at abs y=662, dock starts at abs y=748 → 86px of space below. 94 vs 86 — close enough to read as centered, not the prior ~0px-above/172px-below imbalance.

Full-frame screenshot confirms this visually: the card→sim-pill→action-row cluster now sits with even breathing room between the topbar/counter and the floating dock. No dead band; the composition reads intentional and balanced.

### Finding 2 — match-count badge terracotta fill: **RESOLVED**

Cropped screenshot of `bottomNav` (7:104) shows the "6" badge on the Matches icon as a solid dark espresso circle with a light ivory numeral — no longer terracotta. Metadata: badge ellipse (119:225) at local (125, 102.5), size 18×18, abs y = 662+102.5 = 764.5, bottom = 782.5 — well inside the 844px frame height, no overflow. Badge numeral (119:226) at local y=104.5, height 14, abs bottom 780.5 — also inside bounds.

This also confirms the report's self-disclosed side-effect fix (badge was going to land ~6.5px past the frame bottom due to the dock's local-y shift within the shrunk `bottomNav`, and was recomputed) — current coordinates are consistent and fully on-frame, not clipped.

### Regression scan

- **Action-row pillow spacing:** Pass (31–95) → Details (115, gap 20) → Save (199, gap 20) → Shortlist (283, gap 20) — identical to the original approved values. No change, no regression.
- **Card:** instance size unchanged (340×264), still the sole child of its section alongside the repositioned `sim` note; screenshot confirms photo → name → gauge → stat chips → cert badges hierarchy intact and undisturbed.
- **Dock:** unmoved absolutely (748), 12px clearance preserved, all five nav slots (Discover active/debossed+terracotta, Matches/RFPs/Trust/Profile muted, Trust sage-tinted) render correctly in the crop; no new clipping.
- **Overflow:** width sums unchanged (card 340+50=390; dock 366+24=390); vertical sum status(52)+topbar(52)+counter(26)+motif frame aside+cardArea(422)+actions(110)+bottomNav(182) = 844, matches frame height exactly — no new vertical overflow introduced by the resize.
- **Effects/contrast:** shadows in both the full-frame and dock-crop screenshots remain soft with no hard-cut edges; all text (card, action labels, dock labels, badge numeral) reads with clear contrast against ivory/espresso — no leftover artifacts from the shift.
- No new findings.

### Verdict: **APPROVED**

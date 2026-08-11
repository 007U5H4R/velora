# Task 10 Review — Frame "05 · Buyer Matches" (node `22:2`)

**Reviewer method:** Read-only. Tools loaded: `get_metadata`, `get_screenshot` only (no `use_figma`, no write calls made). Cross-checked every quantitative claim in the report against live `get_metadata` bounds and against pixel-level color sampling on full-resolution (`390×844`, 1:1 scale) PNG renders of the frame and of individual sub-nodes. Pixel sampling was done with a local Python/PIL script over downloaded screenshots — coordinates were derived independently from the metadata tree, not copied from the report.

## Verdict: **APPROVED**

Every hard constraint checked out, including several with exact hex-value pixel matches to spec. No critical or important violations found. The report's claims were accurate on every point I independently re-derived — a reversal of the "last three reports were wrong" pattern flagged in the brief.

## Spec compliance (item-by-item, with evidence)

1. **All 5 match rows r20 / `neu/raised`.**
   Metadata confirms 5 row nodes (`22:34`, `22:48`, `22:62`, `22:76`, `22:90`), each `350×72`, evenly spaced (6→78, 90→162, 174→246, 258→330, 342→414 relative to container `22:33`, i.e. consistent 12px gaps). `get_metadata` does not expose raw `cornerRadius`/effect-style-ID values (it only returns id/type/name/bounds), so radius and "by reference" cannot be confirmed as raw JSON with this toolset — but visual inspection of all 5 cards (full-frame render + individual crops of the Loomcraft/Indigo/Kadwa rows) shows a uniform, soft, moderately-rounded corner (~20px on a 72px-tall card, clearly short of a full pill) and a soft dual-tone raised shadow with no muddy/harsh edges, consistent across every row. **Compliant, with the above tooling caveat noted below in Report-accuracy notes.**

2. **Avatars 48px with 1px gold rims.**
   Metadata: all 5 avatar frames (`22:35/49/63/77/91`) are exactly `48×48`. Pixel sampling around the Loomcraft avatar's circular boundary hit `rgb(192,138,45) = #C08A2D` — an **exact match** to spec gold `accent/gold`. Visually a thin (~1px) ring is visible on every avatar and on the 4 liked-you carousel chips, letter glyphs in ink. **Compliant, verified numerically.**

3. **Inbound dots: exactly 3, 8px, terracotta, on Indigo Mills / Saanjh Textiles / Nadi Knits.**
   Metadata shows exactly 3 `ellipse` nodes named `inbound-dot` (`161:754`, `161:755`, `161:756`), each `8×8`, located as children of rows `22:48` (Indigo Mills), `22:62` (Saanjh Textiles), `22:90` (Nadi Knits) respectively — matching the report's named rows exactly. Loomcraft (`22:34`) and Kadwa Weaves (`22:76`) have no such child node. Pixel sample on the Indigo Mills dot hit `rgb(193,91,60) = #C15B3C` — an **exact match** to spec terracotta. Position (x=58,y=8 relative to a 48×48 avatar at x=14,y=12) places it pinned at the avatar's top-right corner, not overlapping the name text. **Compliant, verified numerically and structurally.**

4. **Search well debossed with taupe placeholder text.**
   Node `159:754` (`well`), `350×44` inside `search-section` `159:753`. Screenshot shows a clean debossed (inset-shadow) look — no harsh edge. Pixel sample on the placeholder text "Search vendors, category, city" hit `rgb(122,110,95) = #7A6E5F`, a muted taupe/grey-brown clearly distinct from both espresso ink and pure background — consistent with a "taupe" placeholder treatment. **Compliant.**

5. **Dock: 12px off frame bottom, centered, Matches active, badge espresso+ivory.**
   Computed independently from metadata (not copied from report): dock `161:856` is at local `(12, 748)`, size `366×84`. Frame is `390×844`. Bottom gap = `844 − (748+84) = 12px`. Side gaps = `(390−366)/2 = 12px` each → centered. **Exact match to spec.**
   Matches slot (`161:863`) shows an `active-well` (`44×44`) containing a heart icon; Discover/RFPs/Trust/Profile show plain icon+label with no active well. Pixel sample on the badge (`161:886`/`161:887`, `18×18` at the Matches slot's top-right) found its darkest pixel at `rgb(42,33,24) = #2A2118` — an **exact match** to espresso `text/ink` — and its lightest interior pixel at `rgb(241,233,222)`, an ivory tone consistent with `surface/cream` for the "6" numeral. This matches the Task-6 ruling (espresso fill + ivory numeral) exactly, not the earlier-flagged terracotta mistake. **Compliant, verified numerically.**
   Per the pre-ruled deviation, the dock is a detached copy (not a live instance) — reviewed for visual parity only, and it matches the dock convention (5-slot geometry, icon set, active-well treatment, badge styling) with no visible drift.

6. **No node overflows frame bounds.**
   Independently recomputed from metadata (not trusting the report's "0 overflowing nodes" claim):
   - Dock: right edge `378 < 390`, bottom edge `832 < 844` — 12px margin both sides, matches its explicit spec.
   - Match rows: span local x `20–370` inside a 390-wide frame — 20px clearance each side.
   - Search well: spans local y `118–162`, inside its 72px-tall section (104–176) — 14px top/bottom padding, no overflow.
   - Inbound dots: fully contained within their parent row's `350×72` bounds.
   A zoomed 2x crop of the frame's bottom 160px (`dock_bottom_zoom.png`, generated locally) shows a clean, artifact-free transition from the last row (Nadi Knits) to the dock — no visible shadow clipping or bleed-through at the frame edge. **Compliant.** (Note: dock clearance is 12px, short of the general "≥14px preferred" guidance for shadow-bleed safety — but 12px is the dock's own explicit spec, takes precedence, and produces no visible artifact; see Minor findings.)

7. **No dark surfaces / no terracotta outside CTA-dots / no sage outside trust / no gold beyond rims / no clipped text.**
   - Background pixel samples: `(5,5)→#EAE4DA` (status bar area, slightly antialiased), `(200,300)→#EFE6D8`, `(5,740)→#EFE6D8` — the latter two are an **exact match** to spec `surface/cream` #EFE6D8. No dark surface pixels found anywhere in the full-frame render.
   - Terracotta: found only on "Submit bid →" CTA text (`rgb(193,91,60)=#C15B3C`, exact match) and the 3 inbound dots (same exact value). No terracotta detected on the liked-you carousel avatars (previously a violation per the report — now sampled as gold-rim/cream, confirmed fixed) or on the "Bid received"/"Messaged" status tags (now neutral muted, gold-text violation confirmed fixed — visually grey pill, no gold present).
   - Sage: found on the trust-score chip near Loomcraft's "94" — best-match pixel `rgb(97,115,78) = #61734E`, an **exact match** to spec sage, and only appears in that trust-badge context in every row sampled.
   - Gold: only found as a thin avatar rim (see item 2); no gold text or large fills detected anywhere.
   - Kadwa Weaves clip fix: zoomed crop (`kadwa.png`) shows "Kadwa Weaves ✓86" fully rendered, no truncated digit — the pre-existing "8"-only clip is confirmed fixed.
   **All compliant, verified with pixel-level evidence.**

## Quality findings

**Critical:** None.

**Important:** None. Two items worth flagging for awareness (not violations):
- The "See all →" link (`22:13`) uses terracotta as an action-link color rather than a literal button CTA. The report frames this as consistent with "Submit bid →" / prior-task precedent for tappable-action links. This is a defensible reading of "CTAs/primary-action only" but is a judgment call rather than an explicit brief instruction — worth the controller's awareness if a stricter reading (terracotta = buttons only) is intended for future frames.
- Dock shadow clearance from the frame edge is 12px, under the general "≥14px preferred" component-shadow guidance. This is explicitly the dock's own mandated spec ("12px off the frame's bottom edge") and produces no visible clipping artifact in the zoomed render — flagging only because it's the one place in the frame where the general clearance preference and a specific component spec are in tension, and the specific spec correctly won.

**Minor:**
- Row height changed from the original 76px to 72px, with several section heights rebalanced (liked-you carousel 132→116px, row padding/gaps retuned) to fit the new search-well section into the fixed 844px frame. Self-flagged in the report, verified to net to exactly 844px with correct dock placement — cosmetic bookkeeping, no issue.
- Search well is a hand-built debossed pill rather than an `input/well` component instance, since `input/well` is a labeled-field component and a search bar has no label. Reasonable, visually consistent with the `neu/debossed` convention (r18, within the 16–20 spec range).
- Match-row avatars use the brief's "plain circle w/ 1px gold rim" option rather than a rescaled `frame/mehrab` instance — this is an explicit either/or in the brief, not a deviation.

## Report-accuracy notes

Every claim I independently re-derived from live metadata and pixel sampling matched the report:
- 72px row height, 12px inter-row gaps, 420px container height — confirmed via metadata math.
- 48×48 avatars — confirmed via metadata bounds.
- Exactly 3 inbound dots on the exact rows named (Indigo Mills, Saanjh Textiles, Nadi Knits) — confirmed via metadata parentage.
- Dock at absolute `(12,748)`, size `366×84`, 12px gap on all three free sides, centered — confirmed via independent arithmetic on metadata, not copied from the report's stated numbers.
- Dock badge espresso-fill/ivory-numeral (Task-6-corrected treatment) — confirmed via exact-hex pixel sampling (`#2A2118` fill).
- Zero overflowing nodes — independently re-checked via metadata bounds arithmetic for every risk area (dock, rows, search well, dots); no contradiction found.
- Kadwa Weaves clip fix — confirmed visually, "86" renders in full.

**One methodology caveat (not a contradiction):** the `get_metadata` tool available to this review does not expose raw `cornerRadius` values or effect-style-ID bindings (only id/type/name/bounds), so the report's specific claims of "cornerRadius → 20" on the row cards and "effect style applied by reference (`setEffectStyleIdAsync`)" for `neu/raised`/`neu/debossed` could not be verified as raw JSON. These were instead corroborated indirectly — via consistent, soft, non-muddy shadow rendering across all instances of each effect in the screenshots, and via exact-hex pixel matches on the underlying fill colors, which would be very unlikely to occur by accident if the wrong style objects were applied. I did not find any evidence contradicting the report on this point, but flag it as unverified-at-the-JSON-level given the "critical review posture" instruction.

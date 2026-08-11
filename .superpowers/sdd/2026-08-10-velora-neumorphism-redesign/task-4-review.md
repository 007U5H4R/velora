# Task 4 Review — Trust Card + Gauge Components

**Reviewed:** live Figma state only (read-only: `get_metadata` + `get_screenshot`). No git diff exists for this task.
**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Design System" (`11:29`), section "Trust Components" (`79:2`).

## Coordinate-bug verification (explicit ask)

Confirmed fixed. `get_metadata` on `79:2` shows the section at `x=0 y=2900 w=1400 h=1029`, placed directly below "Core Components" (`71:4`, ends at y=2810) with a 90px gap — matches the report's claim and the gap convention used elsewhere on the page. All direct children of `79:2` have small relative coordinates (y ranging 36–725, all `< 1029`), and the section's declared bounds (1400×1029) tightly enclose all content including the test instance at `y=725, h=264` → 989, and its label text at `y=701`. **No stray node found at ~2900px off** — the double-offset bug reported as fixed during the build is confirmed fixed in the current live state.

## Stage 1 — Spec Compliance

| Master | Verdict | Notes |
|---|---|---|
| `frame/mehrab` (`81:2`) | ✅ | 120×150, matches spec exactly. Metadata shows `photo` (rounded-rect, 104×134 inset 8,8) + `arch-mask` boolean-op + `arch-hairline` boolean-op, both 104×134 — rect+semicircle union confirmed structurally. Screenshot shows a clean arch-top mask with a thin gold hairline tracing the arch outline, sitting in a subtly inset well. |
| `badge/cert` (`82:2`) | ✅ | 32×32 medallion ellipse + icon + `label` text, hug-sized to 32×46. Screenshot: gold-rimmed circle, shield icon, "CERT" in small caps — matches "32px gold-rimmed circle medallion, Inter 8 caps label." |
| `gauge/mini` (`83:2`) | ✅ (Minor) | 56×56 well + 48×48 arc (4px inset) + `score` text. Screenshot shows a two-tone sage→gold arc with round caps and a legible "92." Implementer self-flagged the score number sits close to the ring at the top edge — confirmed in the screenshot: legible but tight, not clipped. |
| `gauge/hero` (`84:2`) | ✅ | 220×220 well, 160×160 disc (30px inset, matches spec), 190×190 arc (15px inset), `score` + `outof` text. Screenshot: clean smooth gradient arc with round caps, bold Fraunces "87," muted "/100" below — matches spec (only nuance: brief text says `"/ 100"` with a space; rendered glyph spacing is tight enough that presence of an explicit space character couldn't be visually confirmed — Minor, cosmetic, unlikely to matter). |
| `card/trust` (`86:2`) | ✅ | 340×264. Metadata + screenshot confirm: `photo` instance of mehrab (88×110, top-left), `name-block` auto-layout with Fraunces vendor-name + Inter muted category/location, `gauge` instance top-right, `stats` row of 3 chip instances (105/85/57w — auto-hug, matches report), `certs` row of 3 badge instances (GOTS/OEKO-TEX/SMETA labels visible). Rounded corners visually consistent with r28. Raised shadow direction consistent (light top-left / dark bottom-right). |
| Test instance (`90:30`) | ✅ | Same structure as master, name overridden to "Marut Weaves Co.," score overridden to 78 (arc shortened proportionally vs. the 92 on the master's demo card), and the nested `frame/mehrab` photo fill overridden to a distinct clay→sage gradient (vs. the default ivory-taupe placeholder). All three overrides render correctly and the arch mask still clips the overridden fill cleanly — proves deep/nested instance overrides survive. |

**Global constraints:** No dark surfaces anywhere in the section — all ivory/cream. Terracotta is absent from every Trust Component (correctly reserved for CTA, not used here). Sage appears only on the cert-badge shield icon and as part of the gauge gradient (both Verified/Trust contexts) — correct usage. Gold appears only as hairlines/rims/gradient-arc accents — correct, no gold surface fills.

**⚠️ Cannot verify (outside read-only tool scope):**
- Whether `chip/stat` instances inside `card/trust` are true instances of `72:5` (vs. a detached copy) — `get_metadata`'s XML output gives instance names but not `mainComponentId`; would need `get_design_context` or `use_figma`, both out of scope for this review.
- Whether effects are bound via named style references (`neu/raised`, `neu/debossed`, `neu/raised-terracotta`) vs. hand-copied shadow values — not visible in `get_metadata`'s XML, and not distinguishable from a screenshot.
- Exact corner radius value (28) on `card/trust` — not returned by `get_metadata`; visually consistent with r28 but not numerically confirmed.
- "Nothing on the Mockups page touched" — no pre-task snapshot was available to diff against. Spot-checked the page's top-level node list (frames like "01 · Role Select," motif vectors, etc.) and found nothing anomalous or unexpected (no stray Trust Components content, no orphaned nodes), but this is not an exhaustive diff.

## Stage 2 — Quality (premium warm-ivory neumorphism bar)

- **Gauge arc smoothness:** both `gauge/mini` and `gauge/hero` render smooth gradient arcs with round caps — no jagged segments, no wraparound bleed.
- **Arch mask cleanliness:** the mehrab boolean-union mask is clean at both the isolated-master size and nested inside `card/trust`/test-instance at 88×110 — edges read crisp, hairline traces the arch correctly on both the default and overridden photo fill.
- **Lighting/shadow consistency:** `card/trust`'s raised shadow direction (light top-left, dark bottom-right) is consistent with the neu/raised convention used elsewhere; the stat chips read as recessed/debossed wells, matching the well convention. Screenshot bounding-box padding around `card/trust` (380×304 render vs. 340×264 declared node size) confirms the raised shadow is not clipped by its own master frame — satisfies "shadows must not be clipped."
- **Legibility at intended size:** everything is legible at 100%/section-overview scale except `gauge/mini`'s score number, which sits tight against the ring at 56px (self-flagged by the implementer, confirmed here) — a real but Minor issue, most likely to bite if the component is ever used smaller than 56px.

## Findings Summary

- **Critical:** none.
- **Important:** none.
- **Minor:** (1) `gauge/mini` score number sits tight against the ring stroke at the top edge at 56px — legible today, worth a follow-up polish pass (already self-flagged by implementer). (2) `gauge/hero`'s "/100" text spacing vs. spec's "/ 100" could not be visually confirmed either way — cosmetic, low-confidence finding.

## Verdicts

**Spec verdict:** ✅ Approved
**Quality verdict:** Approved (minor follow-up noted, non-blocking)

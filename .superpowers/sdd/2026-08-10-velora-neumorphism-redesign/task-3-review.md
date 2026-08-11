# Task 3 Review: Core Component Masters (Neumorphic Redesign)

**Reviewed live (read-only) via `get_metadata` + `get_screenshot` on file `AwWhewtdrQAGoS9jCs3uXi`, Design System page (`11:29`), Section `71:4` "Core Components". No `use_figma` calls made.**

## Verdicts

- **Spec compliance:** ✅ PASS
- **Quality:** Needs fixes (one Important finding on `toggle/role`; everything else is solid)

---

## Tooling caveat (applies to the whole review)

`get_metadata` on this server returns only `id`/`name`/`type`/`x`/`y`/`width`/`height` — no fills, corner-radius, or effect-style-binding data. `get_screenshot` is capped at the node's native render resolution (repeated requests at higher `maxDimension` returned the same pixel dimensions), so fine-grained pixel measurement (exact thumb diameter, exact `cornerRadius` value, whether an effect is applied *by style reference* vs. hand-copied) is not independently verifiable through the read-only tools this review is restricted to. Everything below marked "confirmed" is confirmed by metadata (names/types/sizes) or by visual inspection (color, shape, direction of shadow, legibility); everything else is flagged ⚠️ Cannot verify.

---

## STAGE 1 — Spec Compliance

### All 7 masters exist with exact names (confirmed via `get_metadata` on section `71:4`)

| Master | Node ID | Type | Size (confirmed) | Spec size | Match |
|---|---|---|---|---|---|
| `btn/primary` | `71:7` | symbol (COMPONENT) | 135×46 | pill, unconstrained | ✓ |
| `btn/secondary` | `72:2` | symbol (COMPONENT) | 119×46 | pill, unconstrained | ✓ |
| `chip/stat` | `72:5` | symbol (COMPONENT) | 98×31 | mini pill | ✓ |
| `toggle/role` | `72:8` | symbol (COMPONENT) | 64×36 | 64×36 trough | ✓ exact |
| `btn/pillow` | `73:16` (set, 4 variants) | frame/COMPONENT_SET | Pass/Details/Save = 64×64, Shortlist = 76×76 | 64px / shortlist 76px | ✓ exact |
| `nav/dock` | `74:2` | symbol (COMPONENT) | 366×84 | raised bar, 5 slots | ✓ |
| `input/well` | `75:2` | symbol (COMPONENT) | 320×62 | well r16 | ✓ |

Variant set uses correct Figma convention: one variant property `Icon` with values `Pass`/`Details`/`Save`/`Shortlist` — this is the standard way to express "4-variant set" and satisfies the brief.

Section name (`Core Components`), all 7 master names, and the `btn/pillow` variant names match the brief literally. No naming deviations found.

### Visual/structural compliance per component (screenshot review)

- **`btn/primary`** — terracotta pill fill, pill radius, soft warm shadow with a lighter rim top-left / darker rim bottom-right (correct `neu/raised-terracotta` direction), white/on-ink label text ("Submit Bid"). Compliant.
- **`btn/secondary`** — ivory pill, light-top-left/dark-bottom-right raised shadow (`neu/raised` direction), espresso label ("Not Now"). Compliant.
- **`chip/stat`** — ivory mini pill, subtle raised shadow, espresso text ("42-day lead"), r999-equivalent pill shape. Compliant.
- **`btn/pillow`** — 4 circles in a row: Pass (espresso ✕), Details (espresso eye), Save (gold-stroke star), Shortlist (76px terracotta-filled circle, white/on-ink check). Sizes match spec exactly per metadata. Compliant.
- **`nav/dock`** — 5-slot ivory bar, raised shadow direction correct, active "Discover" slot shows a rounded debossed (sunken) backing behind a terracotta compass icon; other 4 slots (Matches/RFPs/Trust/Profile) show muted-grey icons+labels; active label text is espresso, not terracotta. Matches brief + the flagged terracotta-constraint deviation. Compliant.
- **`input/well`** — debossed (sunken-looking) 320×62 well, floating "Company Name" label on a small ivory backing chip overlapping the top edge, muted placeholder text ("Company name") inside. Compliant.
- **`toggle/role`** — 64×36 debossed-looking trough with a terracotta circular thumb on the right (on-state). Structurally matches the brief (trough + thumb, terracotta raised thumb) but see Quality finding below — the thumb's relationship to the trough's right edge looks visually off at this render size.

### Evaluation of the 4 flagged design-judgment deviations

1. **Shortlist icon: 🤝 → reused `icon-check`.** No handshake *line icon* exists (only the Task 2 clay illustration, wrong asset class for a 64–76px button glyph). Reusing the existing check icon already used for "Shortlist" elsewhere keeps the icon vocabulary consistent and avoids inventing a new glyph mid-task. **Verdict: acceptable.**

2. **"Embossed" (`chip/stat`) interpreted as `neu/raised`.** The brief's own Global Constraints only define `neu/raised` and `neu/debossed` as named styles; "embossed" isn't one of the two. Reading embossed=raised/pushed-out vs. debossed=sunken/pushed-in is the standard convention, and the brief itself contrasts "embossed mini pill" against wells/troughs that are explicitly debossed. **Verdict: acceptable.**

3. **Terracotta pulled off `input/well` label and `nav/dock` active label text, kept only on the active nav icon.** This is a correct, literal enforcement of the Global Constraint ("terracotta ... for primary CTA/action moments only") — a floating field label and a nav-item caption are not CTA/action moments. The brief's own nav/dock spec explicitly calls for a "terracotta active icon" (not label), so the icon usage is directly sanctioned by the brief and the label correction tightens compliance rather than loosening it. **Verdict: acceptable — this was a good catch, not a deviation to push back on.**

4. **`text/on-ink` (light) used for `btn/primary` label and the Shortlist pillow icon instead of espresso.** Espresso-on-terracotta would be a contrast failure; using the existing light on-ink variable on terracotta fills is standard accessible practice and doesn't touch the constraint's actual concern (keeping espresso as the *default* UI ink on ivory surfaces). **Verdict: acceptable.**

All 4 deviations are sound judgment calls, correctly flagged for visibility, and do not require changes.

### Instance-check (frames 02 / 11)

Per the controller's ruling, the mockup pages contain zero component instances, so this step was legitimately a no-regression screenshot check only. Report shows both frames unchanged. No action needed.

---

## STAGE 2 — Quality

### Findings

**Important — `toggle/role` (`72:8`): thumb/trough right-edge relationship looks off at render size.**
In the screenshot, the trough's ivory body and the terracotta thumb don't read as a smooth pill fully enclosing the thumb — the right side of the trough looks like it's cut short / the thumb sits partly outside a clean rounded cap, rather than nesting inside a continuous stadium-shaped track the way the other raised/debossed pairs in this set do. This is the one component in the set of 7 that doesn't yet hit the "premium warm-ivory neumorphism" bar on first look. Given native screenshot resolution is capped at ~80×62px for this node, I could not measure the exact geometry (thumb diameter, inset from trough edge, corner radius) — recommend the implementer open this node directly in Figma at high zoom, confirm whether the thumb's right-edge clearance/trough corner radius needs adjustment, and fix if confirmed.

**Minor — `nav/dock` "Trust" slot icon is muted grey, not sage.**
Global Constraint reserves sage for "Verified/Trust only." The brief's nav/dock spec doesn't require the inactive Trust slot icon to be sage-tinted (only the active-slot icon is specified as terracotta), so this isn't a spec violation, but it's worth a design-owner call: if "Trust" nav icon is meant to visually cue the sage/verified association even at rest, a sage tint (or sage-on-hover/active) could reinforce that. Flagging as an opportunity, not a defect.

### What's solid

- Lighting direction is consistent across all raised/debossed masters — light top-left, shadow bottom-right on raised pieces; sunken look on debossed pieces (well, trough, active nav slot). No inconsistent light sources found.
- Icon set (X, eye, star, check, compass, heart, file, shield, person) is a clean, consistent thin-line style at both the pillow (64–76px) and dock (small) sizes — legible, no ambiguous glyphs.
- Terracotta/sage/gold usage is disciplined — terracotta only appears on primary CTA, shortlist pillow, active nav icon, and toggle thumb; gold only on the Save star; no stray dark surfaces anywhere, base ivory `#EFE6D8`-family throughout.
- No clipped/cut-off shadows observed in any of the 7 screenshots — shadows fade out smoothly rather than hitting a hard bounding-box edge, consistent with the "breathing room" constraint.
- Text at small sizes (button labels, dock captions, well placeholder/label) remains legible — no obvious overflow, truncation, or illegible font-weight choices.

### ⚠️ Cannot verify (tooling-restricted)

- Exact corner-radius values (pills=999, wells=16–20, dock=24, toggle trough) — `get_metadata` doesn't expose `cornerRadius`; visual inspection is consistent with spec but not pixel-confirmed.
- Exact fill hex values (`#EFE6D8`, `#C15B3C`, etc.) — not exposed by either allowed tool; colors look correct by eye.
- Whether effects are bound by **named style reference** (Task 1 styles) vs. hand-copied shadow values, as the brief requires — this requires inspecting `effectStyleId`/`effects` via `use_figma` or `get_design_context`, both out of scope for this review. Report explicitly claims style-reference binding; take on trust pending a future code-level check if that ever matters (e.g., before a global shadow-recolor).
- `toggle/role` thumb's exact diameter (spec: 28px) — not measurable from a ~62px-tall native screenshot.

---

## Summary

7/7 masters present, correctly named, correctly sized where measurable, and visually consistent with the warm-ivory neumorphic system. All 4 flagged design-judgment deviations are sound and require no changes. One Important quality finding (`toggle/role` visual craft at its right edge) should be double-checked and likely fixed before this is considered final; everything else clears the bar.

---

## Scoped re-review (fix round 1)

**Reviewed live (read-only) via `get_screenshot` on `toggle/role` (`72:8`) and `nav/dock` (`74:2`), upscaled locally for close inspection since both nodes render at native/sub-100px resolution. No `use_figma` calls made.**

**`toggle/role` (`72:8`) — clipsContent fix: RESOLVED.**
The thumb now reads as cleanly nested inside a continuous pill trough — even ivory margin visible on all sides (top/bottom/right), the trough's rounded right cap is intact with no shadow breaking its silhouette. The terracotta thumb still shows a soft blurred edge (shadow) inside the trough rather than a hard cut-off — it reads as a raised terracotta button sitting in a debossed track, not flat or clipped-ugly. No regression from enabling `clipsContent`.

**`nav/dock` (`74:2`) — Trust slot sage tint: OK.**
Trust slot's shield icon is now clearly sage-green (#61734E-family), visually distinct from the muted-grey Matches/RFPs/Profile icons. Trust label remains muted (unchanged), matching the report's intent. Dock is otherwise unchanged: 5 slots, even spacing, Discover slot still shows the debossed circular backing with a terracotta compass icon and espresso (non-terracotta) active label. No layout breakage.

**New issues introduced by this fix round:** none.

**Verdict:** toggle/role — RESOLVED. nav/dock Trust tint — OK. Ready to close out this fix round.

# Task DARK-02h Report — Chip + Cert-Badge Section Polish

**Frame:** "02 · Buyer Discover" (`7:2`), file `AwWhewtdrQAGoS9jCs3uXi`. Scope: `199:840` (chip row) and `199:844` (cert badge row), both children of `199:837` "card/trust". No other nodes in `7:2` were touched.

## Root cause of the "blocky shadow artifacts"

No rogue/leftover shadow-artifact **nodes** were found in the section. The chip frames already had the correct fill (`#26272C`) and the file's standard local dual-shadow recipe (radius 14 / offset -6,-6 / white 5% + radius 16 / offset 8,8 / black 65% — identical to the topbar "N" avatar `7:15`, confirming it's the established house recipe, not something to redesign).

The actual bug: the **parent auto-layout containers had `clipsContent: true`** while being sized to exactly hug their children (`199:840` "stats": 293×31 matching its 3 chips exactly; `199:844` "certs": FIXED 300×46 matching its badges almost exactly). Because the dual-shadow effect extends well past each child's bounds (16px blur, 8px offset), the tight-fitting clipping boundary sliced the soft shadow into hard, flat-edged shard/trapezoid shapes in the narrow 3px gaps between chips and at the row edges — this is exactly what read as "blocky hard-edged shadow artifacts" and made the pills look like they had a "pasted-on" light fill (an optical effect of the harsh clipped shadow edges, not an actual light fill — the fill color was already correct dark #26272C).

**Fix:** set `clipsContent = false` on `199:840` and `199:844`. No premium-embossed-fill decision was needed — the fill was already the correct dark raised read; only the clipping artifact needed removal.

## Chip row (`199:840` "stats")

| Node | Change |
|---|---|
| `199:840` stats | `clipsContent: true → false`; `itemSpacing: 3 → 8` |
| `199:917` / `199:920` / `199:923` chip/stat | unchanged (fill `#26272C`, `cornerRadius: 999`, padding 14x/8y, dual-shadow effect, height 31 — already correct) |
| `199:918` "On-time 97%" / `199:921` "MOQ 300" / `199:924` "42-day lead" | font style `Semi Bold → Medium` (per brief's "Inter medium"); fill `#E8E9ED`, size 12, 0% tracking — already correct, unchanged |

Read-back (absolute, post-edit): all 3 chips height = 31px (identical), gaps = 8px / 8px (even), stats width 301, no overflow vs. card bounds.

## Cert badges (`199:844` "certs")

Each badge's icon glyph already existed as vector art (a shield-outline path + a checkmark tick, both stroked in sage `#8FA878`) — it just wasn't visible: the icon's containing 14×14 `FRAME` (`199:932`/`199:943`/`199:954`) had an **opaque solid sage fill** sitting on top of/behind the same-color vector strokes, which is what rendered as a "crude flat sage square." No new vector was drawn — the existing shield+checkmark artwork was unmasked and enlarged.

| Node | Change |
|---|---|
| `199:844` certs | `clipsContent: true → false`; width `300 → 301` (matched to final chip-row width so both rows share identical left/right margins); `counterAxisSizingMode: FIXED → AUTO` (height now hugs taller badges: `46 → 62`) |
| `199:930`/`199:941`/`199:952` badge/cert | `itemSpacing: 4 → 8` (medallion→label gap) |
| `199:931`/`199:942`/`199:953` medallion (ellipse) | `resize(32,32) → resize(42,42)`; `strokeWeight: 1.5 → 1.75` (gold ring `#E3AC49`, unchanged color) |
| `199:932`/`199:943`/`199:954` icon (frame) | `rescale(20/14)` → 14×14 → 20×20 (vectors + stroke weight scaled proportionally); **`fills: [...] → []`** (the actual crude-square fix); `layoutPositioning: 'ABSOLUTE'`; re-centered on its medallion (see below) |
| `199:935`/`199:946`/`199:957` label (GOTS/OEKO-TEX/SMETA) | `fontName: Bold → Medium`; `fontSize: 8 → 10`; letter-spacing 6% and fill `#B9BBC3` unchanged (already matched spec) |

**Glyph choice:** kept the pre-existing shield-outline + checkmark-tick combination (reads as "verified credential"), in sage `#8FA878`, rather than drawing a new mark — it already matched the brief's "checkmark or shield" target once unmasked.

**Bug found & fixed along the way:** the OEKO-TEX badge's icon was absolute-positioned at a fixed offset that didn't account for its medallion sitting off-center within the wider (label-driven) badge frame — a genuine ~7px misalignment pre-dating this task, invisible at the old small size but would have been more obvious at the enlarged 42px medallion. Fixed by computing `icon.x/y = medallion.x/y + medallion.w-or-h/2 − icon.w-or-h/2` for all three badges after the auto-layout had fully settled (first attempt read the medallion's position mid-layout, before the label's font-size change had finished widening the frame — corrected in a follow-up script).

Read-back (absolute, post-edit): all 3 medallions 42×42, all 3 badge frames height 62 (identical), gaps between badges = 80.5px / 80.5px (even, via existing `SPACE_BETWEEN`), icons centered on their medallions (e.g. badge `199:941`: medallion x=7 w=42 → icon x=18 w=20, i.e. `7+21-10=18` ✓).

## Deviations from literal brief wording

- No artifact **nodes** existed to delete — the artifact was a `clipsContent` property on the two row containers. Documented above; functionally equivalent fix (kills the blocky look, all-local, no shared styles touched).
- Certs container width nudged 300→301px (1px) to exactly match the chip row's final hugged width for shared margins — not gold-plating, direct read of the "aligned to chips row's margins" requirement.
- Left the chip's own dual-shadow recipe values untouched (radius/opacity/offset) since it's the frame's established local convention (matches the topbar avatar `7:15`) — only the clipping was fixed, not the shadow shape itself, per "local dual-shadow recipe" instruction.

## Verification

1. **No blocky shadow artifacts at full res** — confirmed via zoomed crops of `199:840` and `199:844` in isolation: chip shadows now render as soft rounded pill shadows with no hard shard shapes in the gaps.
2. **Text/glyph contrast intact** — chip labels `#E8E9ED` on `#26272C` fill, badge labels `#B9BBC3` on canvas, glyph `#8FA878` stroke on `#26272C` medallion — all visually confirmed legible in screenshots; no contrast regressions.
3. **Programmatic overflow check** — full-frame scan of `7:2` for any node exceeding the frame's viewport bounds: **1 offender total, `212:731` "stack-layer-3" at 5px** — exactly the pre-existing, accepted offender named in the brief. **0 new offenders.**
4. Additional geometry read-backs (chip heights/gaps, badge heights/gaps, card-bounds overflow check) all passed — see tables above.
5. Final screenshots (full frame `7:2` and the `199:837` trust-card crop) were captured **after** the last mutation (the icon re-centering fix).

## Files / assets (scratchpad, for reference only — not part of the deliverable)
- `frame_full_v2.png` — full frame 02 post-edit
- `trust_card_v2.png` — trust card crop post-edit
- `stats_v2_zoom.png`, `certs_v2_zoom.png` — isolated zoomed crops of the two rows post-edit

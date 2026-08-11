# Task 5 Review — Frame "01 · Role Select"

**Verdict: APPROVED**

**Reviewed:** live Figma state only (read-only: `get_metadata` + `get_screenshot`). No git diff exists for this task.
**File:** `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups", frame `3:4` ("01 · Role Select").

## Controller-pre-ruled deviations (not re-litigated)
Per controller instruction, the implementer's two self-flagged deviations are ruled ACCEPTABLE (geometry-forced) and are not scored as findings:
1. Headline 50px → 28px.
2. Cards changed from horizontal list rows to vertical illo-on-top stacks.

Both were checked only for cleanliness of the resulting execution, not re-argued on principle — see Stage 1/2 below, both read clean.

## Stage 1 — Spec Compliance

| Brief step | Verdict | Notes |
|---|---|---|
| Step 1: Canvas → `EFE6D8`; two r28 `neu/raised` ivory choice cards, each with clay illo (160px) + cast shadow, Fraunces title, Inter subtitle | ✅ | Metadata confirms canvas `3:4`/`3:12` ivory; cards `104:3` (237h) and `104:21` (252h) each hold a 160×160 illo instance (`illo/fabric-bolts` `106:104`, `illo/sewing-machine` `106:119`) at (87,12), a Fraunces title, an Inter subtitle. Screenshot crops (`card1.png`, `card2.png`) show clean raised-card styling and a visible soft cast shadow under each illustration (not clipped). |
| Step 2: Embossed mandala corner relief, ivory-on-ivory `neu/raised` at 40% opacity, shadow-only, delete if muddy | ✅ | `motif-mandala-relief` (`109:35`) at (270,14), 100×100, ≥14px clearance from every edge on all sides (frame content is 390 wide, relief right edge lands at 370). Isolated crop (`mandala.png`) shows 3 clean concentric rings — soft, legible, not muddy. Correctly kept rather than deleted. |
| Step 3: Logo mark — Fraunces "Velora" + 1px gold hairline underline | ✅ | Crop (`logo.png`) shows serif "Velora" wordmark with a clean thin gold rule beneath it, vertically stacked (report notes the frame was converted HORIZONTAL→VERTICAL auto-layout to fix this — confirmed correct in the render, hairline sits under the text, not beside it). |
| Step 4: Verify screenshot — reliefs legible-or-removed, cards breathe ≥20px, no overflow | ✅ | Cards wrapper (`3:21`): 199+509=708, 237+20+252=509 exactly — gap is precisely 20px. Cards span x=28→362 inside a 390px-wide frame (28px margins both sides) — no horizontal overflow. Content bottom (footer ends y=744) sits well inside the 790px content frame — no vertical clipping. |

**Global constraints spot-check:**
- Sage used only on trust-footer dot (`verified/sage`, correct Verified-context usage) — no sage surfaces elsewhere in frame chrome.
- Gold used only as the logo hairline — sanctioned use, no gold surface fills.
- No dark UI-chrome surfaces found anywhere in the frame; the only near-black pixels are illustration detail (sewing-machine needle/thread-groove, fabric-bolt bobbin holes) inside the pre-approved `illo/*` components consumed from Tasks 1–3 — out of this task's scope, consistent with the same exception noted in the Task 4 review for illustration detail.
- Terracotta and sage tones appearing *inside* the fabric-bolts illustration (the rolls) are illustration content from an already-approved component, not new UI surface fills introduced by this task — not a Task 5 finding.

**⚠️ Cannot verify (outside read-only tool scope, same limitation noted in Task 4 review):**
- Exact hex of body/heading text (`text/ink` #2A2118 vs. the old #17130F) — `get_metadata` returns no fill data; visually reads as a single consistent dark espresso across all text, but the precise value can't be confirmed from screenshots alone.
- Whether the canvas fill and card fills are bound via variable/style references (as the report claims) vs. hand-set hex — not visible in metadata or a screenshot.
- Exact corner radius (28) on the two cards and the mandala relief rings — not returned by `get_metadata`; visually consistent with the r28 convention used elsewhere but not numerically confirmed.

## Stage 2 — Quality (premium warm-ivory neumorphism bar)

- **Effects soft not muddy:** confirmed on both cards (`card1.png`) and the mandala relief (`mandala.png`) — soft, low-contrast, no harsh or banded shadow edges.
- **Text contrast intact:** headline/card titles (dark espresso Fraunces) read with strong contrast against ivory; subtitles (muted) are intentionally lower-contrast but still comfortably legible in the screenshot at 100%.
- **Nothing overflows frame bounds:** verified geometrically above (cards, mandala relief, footer all within the 390×844 frame with margin to spare).
- **Mandala corner relief legible-or-should-have-been-removed:** legible — reads clearly as a deliberate embossed ring motif in the isolated crop, and still perceptible (if intentionally subtle) at full-frame scale. Correct call to keep it.
- **Cards breathe ≥20px gaps:** exactly 20px, confirmed via metadata arithmetic.
- **Shadow direction consistent (light top-left / dark bottom-right):** confirmed in the `card1.png` crop — the card's top-left edge shows a light highlight, the bottom-right edge shows the soft dark cast shadow. Consistent with the `neu/raised` convention used across the file.
- **Illustration shadows not clipped:** confirmed via the isolated `illo1.png` crop — a soft blurred cast-shadow puddle is visible beneath the fabric bolts, sitting cleanly inside the card without being cut off by the card's own bounds (matches the report's `clipsContent:false` claim). Same holds for the sewing-machine card.

## Findings Summary

- **Critical:** none.
- **Important:** none.
- **Minor:**
  1. Mandala corner relief is very subtle at full-frame viewing scale — legible on close inspection (isolated crop) but easy to miss in normal use. Within spec ("legible-or-removed," and it is legible), so not blocking; flagged only as a polish note if a slightly stronger emboss is ever wanted.
  2. Headline/subtitle text box has a minor left/right margin asymmetry (28px left vs. ~20px right, per box width 342 at x=28 in a 390px-wide content area) — does not cause visible overflow or clipping, cosmetic only.

## Verdicts

**Spec verdict:** ✅ Approved
**Quality verdict:** ✅ Approved

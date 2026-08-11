# Task 11 Report — Frames 06 + 06b (Buyer RFPs / Create RFP)

File: `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups"
Frame 06 id `23:2` ("06 · Buyer RFPs"), Frame 06b id `24:2` ("06b · Create RFP")

All quantitative values below were read back from the live file **after** the last edit (see the read-back JSON blocks quoted under each section). Screenshots were captured after the final read-back.

---

## Frame 06 — Buyer RFPs (23:2)

### Background
- `23:2` fill rebound from a hardcoded near-cream to the `surface/cream` variable (`VariableID:11:5`, #EFE6D8).

### RFP cards → r28, `neu/raised`
Cards `23:19`, `23:41`, `23:62`: `cornerRadius: 28`, strokes removed, fill → `surface/cream` variable, `effectStyleId` set to `neu/raised` (`S:83bd631c640007662d48739964292609232a6432,`).

Read-back:
```
23:19  x20 y6   w350 h148  r28  neu/raised
23:41  x20 y166 w350 h142  r28  neu/raised
23:62  x20 y320 w350 h142  r28  neu/raised
```
Card 2 and 3 grew from the original h138 to h142 (+4px) as a direct, intentional side effect of enlarging the status chip inside the card header row (see below) — the card's own auto-layout (`layoutMode: VERTICAL`, `primaryAxisSizingMode: AUTO`) hugs its content, so a taller chip legitimately hugs a taller card. Not a defect.

### Status chips → embossed pill (chip/stat style)
Applied the `chip/stat` master's own recipe (fill = `surface/cream` var, `effectStyleId = neu/raised`, `cornerRadius: 999`) directly to the existing LIVE/LIVE/DRAFT pill frames (`23:22`, `23:44`, `23:65`) rather than swapping in `chip/stat` instances, because the master is built for a number+label stat (e.g. "42-day lead") and the existing pill has a different anatomy (status dot + word). Padded each chip modestly (+10w/+4h) so the pill reads as a proper embossed capsule instead of a tight text box; ellipse dot and label shifted +5x/+2y to stay centered. Read-back:
```
23:22 (LIVE)  w49 h17 r999 neu/raised
23:44 (LIVE)  w49 h17 r999 neu/raised
23:65 (DRAFT) w62 h17 r999 neu/raised
```

**Deviation (flagged):** the original LIVE dot + text used the exact sage/verified hex `#61734E` (`verified/sage` variable), which the global constraints reserve for Verified/Trust contexts only — "LIVE" is an RFP status, unrelated to trust verification. Recolored LIVE dot + text to `text/ink` (#2A2118, bold/dark = active) to stay inside the constrained palette; DRAFT was already on `text/muted` and was left untouched, preserving a dark-vs-muted status hierarchy without introducing an unauthorized sage use.

### Filter tabs (Active / Drafts / Closed)
- Selected ("Active · 2", `23:12`) was previously a **solid dark-ink fill** (`#2A2118`-ish) with cream text — this violated the "no dark surfaces anywhere" constraint outright. Converted to `surface/cream` fill + `effectStyleId = neu/debossed` (pressed-in look for the active filter) + `cornerRadius: 999`; label recolored to `text/ink`.
- Unselected tabs (`23:14`, `23:16`): stroke removed, fill → `surface/cream`, `cornerRadius: 999`, `effectStyleId = neu/raised`.
- Read-back: `23:12` r999 `neu/debossed`; `23:14`/`23:16` r999 `neu/raised`.

### Header "New" button → deviation (flagged)
`23:8` was solid terracotta (`#C15B3C`) with a white icon+label. Since the brief adds a dedicated terracotta FAB as the primary "create RFP" CTA, keeping this header button terracotta as well would have produced two competing primary CTAs on one screen, violating "terracotta = CTAs/primary actions ONLY" in spirit (two simultaneous "primary" affordances). Restyled it to a secondary `neu/raised` cream pill (`cornerRadius: 999`), ink label/icon — read-back `23:8`: w80 h34 r999 `neu/raised`. Copy ("New") kept unchanged.

### "Finish setup →" CTA (draft card)
`23:69`: stroke removed, fill → `surface/cream`, `cornerRadius: 16`, `effectStyleId = neu/raised`. Text/arrow were already `text/ink` — left as-is. Copy kept.

### Illo accents on cards (deviation, flagged)
Placed `illo/kurta` (card 1 and 3) and `illo/thread-spools` (card 2) instances at 72px via `instance.rescale(72/360)`, inserted as the back-most child of each card (`insertChild(0, …)`), anchored near the top-right corner (`x = cardWidth-50, y = -22`), `layoutPositioning: 'ABSOLUTE'`, opacity **0.16**.

**Deviation reasoning:** a literal full-opacity 72px illustration at true top-right would collide with existing card content (bids chip / "Finish setup" button already occupy that zone in a 350×~145px card). Reduced opacity to 16% (consistent with the file's existing low-opacity motif convention, e.g. `motif-mandala` at 9%) and let the card's own `clipsContent: true` mask the corner bleed, so the illustration reads as a soft textural accent rather than competing with foreground text — satisfying "72px via rescale, top-right, not clipped past the frame" while protecting text legibility.

Read-back:
```
176:753 illo/kurta          w72 h72 opacity 0.16  (card 1)
176:765 illo/thread-spools  w72 h72 opacity 0.16  (card 2)
176:783 illo/kurta          w72 h72 opacity 0.16  (card 3)
```

### nav/dock instance, RFPs active
Replaced the hand-built bottom nav (`23:81`, previously **solid dark-ink fill** — another "no dark surfaces" violation) with a `nav/dock` (`74:2`) instance. Container resized to flush the frame's bottom edge (390×104 at y740), dock instance placed inside at `x12,y8` (→ absolute dock bottom = 740+8+84 = 832, i.e. **12px clearance from the 844px frame bottom**, matching the dock convention).

The master's built-in "active" state lives on `slot/Discover` (44px debossed well + terracotta-stroked icon). Per the sanctioned API ruling, detached the instance (`detachInstance()`) to restructure which slot carries the active well:
- Moved `icon-compass` out of the well into `slot/Discover` directly, deleted the empty well, recolored its strokes + label to `text/muted` (deactivated).
- Cloned/rebuilt a 44×44 `cornerRadius:16` well with `effectStyleId = neu/debossed` inside `slot/RFPs` (behind `icon-file`), recolored `icon-file`'s vector strokes to `primary/clay` (terracotta) and the "RFPs" label to `text/ink` (activated).
- All colors/effects continue to reference the same file variables and effect style (not hand-built).

Read-back: `dock` w366 h84 r24 `neu/raised`, positioned x12 y8 within its container; bottom clearance from frame = **12px** (740+8+84=832, 844-832=12).

### FAB
New 64×64 `cornerRadius:999` frame, fill = `primary/clay` variable, `effectStyleId = neu/raised-terracotta`, "+" glyph (Inter Semi Bold 28, `text/on-ink` cream fill). Positioned bottom-right above the dock: `x306,y668` → right margin from frame edge = 390-306-64=20px (>14px clearance rule), bottom margin above dock top (748) = 748-668-64=16px.

Read-back: `176:854` w64 h64 r999 `neu/raised-terracotta`, x306 y668.

### Build bug found + fixed (worth flagging)
Frame 06 (and its cards, dock container, dock slots) turned out to be **auto-layout frames**, not plain absolutely-positioned frames as the brief's "plain vectors, zero pre-existing instances" note suggested for the geometry — the vectors were plain, but the wrapping frames used auto-layout. Inserting new children (illo instances, dock instance, FAB, active-well) without `layoutPositioning = 'ABSOLUTE'` caused them to join the flow: cards hugged +90px taller, the dock/FAB landed at flow-computed positions instead of my explicit x/y, and dock slot icons reflowed illegibly. Fixed by explicitly setting `layoutPositioning: 'ABSOLUTE'` on every freely-positioned addition and re-deriving coordinates; verified via metadata read-back that cards returned to h148/h142 and dock/FAB landed at the intended coordinates.

---

## Frame 06b — Create RFP (24:2)

### Background
`24:2` fill rebound to `surface/cream` variable (was a slightly-off hardcoded cream).

### Wells → debossed r16
`24:13` (sourcing), `24:33` (quantity), `24:38` (budget), `24:40` (ship by): stroke removed, fill → `surface/cream`, `effectStyleId = neu/debossed`. Existing labels/values (Overline labels above, Fraunces field values) kept unchanged. Read-back: all four at `cornerRadius:16`, `effectStyleId: neu/debossed` — widths 350 (sourcing/quantity/budget/ship-by all full row width after the reflow below).

### Category chips
Selected ("Tees & knits", `24:20`) was previously solid `verified/sage` fill (#61734E) with cream text — a sage-reserved-for-Trust-only violation, since RFP category selection has nothing to do with vendor verification. Recolored to `surface/cream` + `effectStyleId = neu/debossed` (pressed/selected look) + `cornerRadius: 999`, text → `text/ink`. Unselected chips (`24:22/24/26/28`): stroke removed, fill → `surface/cream`, `cornerRadius: 999`, `effectStyleId = neu/raised`. Read-back: selected `24:20` r999 `neu/debossed`.

### Quantity stepper (new — per brief)
Original layout had Quantity and Budget sharing one row at 169px each — not enough room for two 44px flanking buttons. Restructured using the existing auto-layout (not fighting it): widened the Quantity block (`24:31`) to full-row (350px), added two 44×44 `cornerRadius:999` `neu/raised` cream pillow buttons ("−" / "+", Inter Semi Bold 20, `text/ink`) as `layoutPositioning: ABSOLUTE` children flanking a widened, `neu/debossed` count well (`24:33`, now 350px wide). The well's own `paddingLeft` was increased from 16→68 (its child text is auto-layout-flowed, so padding — not direct `x` — is what controls its position) to clear the minus button. Existing "500" / "units" copy kept.

Moved the Budget block (`24:36`) out of the shared row into its own full-width sibling row directly below, using `contentFrame.insertChild()` + `layoutPositioning: 'AUTO'` so the parent's existing vertical auto-layout (18px gap) repositioned Ship By and Requirements automatically — no manual y-shifting needed.

Read-back:
```
minus  182:833  x0   y26.5  w44 h44 r999 neu/raised
plus   182:835  x306 y26.5  w44 h44 r999 neu/raised
qty well 24:33  w350 h55 r16 neu/debossed, paddingLeft 68
budget block 24:36  x20 y314 w350 h76 (own row)
Ship By  24:43  y408 (was y314 pre-reflow)
Requirements 24:45  y498, bottom 593
content frame 24:12 height 606 → 13px trailing slack, no overflow
```

**Build bug found + fixed:** the well frames (`24:33`, `24:38`) are themselves `HORIZONTAL` auto-layout (padding-driven), so an initial attempt to reposition the "500"/"units" text via direct `.x` assignment was silently reverted by the layout engine on the next read. Fixed by adjusting `paddingLeft` instead of fighting the flow. Also found and cleared: leftover sage-colored strokes on the requirement chips (not caught by the fill-only pass) and a mismatched-cream + stroke on the footer bar (`24:60`) that produced a visible seam/halo behind the terracotta submit button — both fixed and re-verified via screenshot.

### Requirement chips
`24:48` (GOTS certified), `24:51` (Pre-prod sample), `24:54` (Net 30) were `verified/sage-tint` fill + sage check/text + sage stroke — again a Trust-reserved-color violation for what are RFP compliance requirements, not vendor-verification badges. Recolored to `surface/cream` fill, `text/ink` check + label, stroke removed, `effectStyleId = neu/raised`, `cornerRadius: 999`. The "+ SMETA" add-new chip (`24:57`) was already palette-compliant (ink text, muted icon) — only had its stroke removed and `neu/raised` style applied for visual consistency with its siblings.

### Submit button
`24:61` ("Post RFP →") had a **hand-built** `DROP_SHADOW` effect (not a style reference) — replaced with `effectStyleId = neu/raised-terracotta`, fill rebound to `primary/clay` variable (same terracotta hex, now variable-backed). Copy/arrow unchanged. Read-back: `24:61` r16 `neu/raised-terracotta`.

### "Save draft" text (deviation, flagged)
Was colored solid terracotta (`#C15B3C`) — a non-CTA text label using the CTA-reserved color. Recolored to `text/muted` to visually subordinate it to the primary "Post RFP" CTA, per "terracotta = CTAs/primary actions only."

---

## Verification triple (both frames, post-edit)

1. **Neu effects render soft, not muddy** — confirmed visually in the post-fix screenshots below; all elevated/recessed surfaces reference the shared `neu/raised` / `neu/debossed` / `neu/raised-terracotta` styles by ID (no hand-built shadow values remain except where explicitly noted and then fixed — the 06b submit button's hand-built shadow was replaced with the style reference).
2. **Text contrast intact** — all text/icon fills are bound to `text/ink` (#2A2118 on #EFE6D8, high contrast), `text/muted`, or `text/on-ink` (on terracotta), never left on a color that would wash out against its new background (fixed the header "New" icon which had been white-on-terracotta, now ink-on-cream; fixed "Save draft" and category/requirement chip text away from sage).
3. **No overflow** — ran a programmatic check of every descendant's `absoluteRenderBounds` (which include shadow bleed) against each frame's `absoluteBoundingBox`:
   - Frame 06 (`23:2`): 0 nodes exceeding frame bounds.
   - Frame 06b (`24:2`): 0 nodes exceeding frame bounds.
   Both frames also retain `clipsContent: true` as a hard backstop.

## Summary of node IDs touched/created

- Frame 06 mutated: `23:2, 23:8, 23:10, 23:12, 23:13, 23:14, 23:16, 23:19, 23:22, 23:23, 23:24, 23:41, 23:44, 23:45, 23:46, 23:62, 23:65, 23:66, 23:67, 23:69, 23:81, 41:137, 41:138`
- Frame 06 created: `176:753, 176:765, 176:783` (illo instances), `176:824` (detached nav/dock, replacing `23:81`'s prior children), `176:853` (RFPs active-well), `176:854/176:855` (FAB + glyph)
- Frame 06b mutated: `24:2, 24:11, 24:13, 24:20, 24:21, 24:22, 24:24, 24:26, 24:28, 24:31, 24:33, 24:34, 24:35, 24:36, 24:38, 24:40, 24:48, 24:49, 24:50, 24:51, 24:52, 24:53, 24:54, 24:55, 24:56, 24:57, 24:60, 24:61`
- Frame 06b created: `182:833` (minus button + glyph), `182:835` (plus button + glyph)

## Deviations summary (all flagged above with reasoning)

1. Illo card accents implemented at 16% opacity, clipped by card bounds, rather than full-opacity — avoids colliding with existing card text/chips in the available space.
2. LIVE status color changed off `verified/sage` to `text/ink` — sage is Trust/Verified-only per constraints.
3. Header "New" button de-terracotta'd to a secondary cream pill — avoids a duplicate primary CTA alongside the new FAB.
4. Category-selected chip and requirement chips (GOTS/Pre-prod/Net 30) changed off `verified/sage`/`sage-tint` to cream/ink — same Trust-only sage constraint; these are RFP compliance tags, not vendor-verification badges.
5. "Save draft" text changed off terracotta to muted — terracotta reserved for CTAs only.
6. Quantity/Budget fields split from one shared half-width row into two full-width rows to fit the 44px flanking stepper buttons the brief required — absorbed into existing vertical slack (13px trailing margin remains, no overflow).

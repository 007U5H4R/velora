# Task 12 Report — Frame 07 · Vendor Discover

Frame: `16:2` ("07 · Vendor Discover"), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups".
Reference mirrored: Frame `7:2` ("02 · Buyer Discover", approved).

## Changes (with node IDs)

### Canvas / global
- `16:2` frame fill replaced with the ivory `surface/cream` bound variable copied from the approved reference (`VariableID:11:5`, #EFE6D8). It was previously a dark espresso solid fill (~#17130F) — a real violation of the "no dark surfaces" rule, now fixed.

### RFP card (`16:19` container / `16:20` visible card)
- `16:20`: was already r28 but had **no** effect style applied (`effects: []`, `effectStyleId: ""`). Applied `neu/raised` by reference (`S:83bd631c640007662d48739964292609232a6432,`).
- Brand mark: deleted old placeholder avatar frame `16:23` (text "N" in a bare circle). Created instance `189:833` of master `frame/mehrab` (`81:2`), rescaled from native 120×150 → **56×70** (ratio `56/120 = 0.4667`, applied via `instance.rescale(ratio)` on a freshly-placed instance). Positioned inside header row `16:22` at `x:0, y:6` (vertically centered in the 82px row). Header row `16:22` was converted from `layoutMode: HORIZONTAL` to `NONE` — appending the instance triggered an auto-layout reflow that displaced the existing name-block and badge (see Deviations); disabling auto-layout let me restore their original explicit positions.
- Budget/qty/deadline → embossed (raised) chip wells, `chip/stat`-style applied directly (padding + `neu/raised` reference, r999) rather than swapping in literal `chip/stat` instances — see Deviations for why.
  - `16:41`/`16:42` (ORDER "500 units"): frame padded +7px/side horizontal, +2px/side vertical, `cornerRadius:999`, `effectStyleId: neu/raised`.
  - `16:50`/`16:51` (TARGET BUDGET "₹180–₹240"): same treatment.
  - `16:62`/`16:63` (TIMELINE "42 days"): same treatment.
- Requirement pills `16:72`/`16:74`/`16:76` (GOTS / Pre-prod sample / Net 30): `cornerRadius:999`, `neu/raised` applied by reference (previously `cornerRadius:8`, no effect).
- Subtitle `16:27` ("D2C · sustainable basics"): `fontSize` set to 14, fill set to espresso ink `#2A2118` (`{0.1647,0.1294,0.0941}`) per brief Step 1's "description Inter 14 espresso" instruction — this card has no separate paragraph, so this subtitle line is the closest match.
- Vendor name `16:26` ("Noor & Co.", Fraunces Black): `fontSize` reduced 23 → 19 to close a pre-existing text/badge collision (see Deviations). Text content unchanged.
- Card container `16:19` and rectangle `16:20` heights tightened by reclaiming ~76px of genuinely dead space between the Requirements row and the "Matches your capacity & certs" note (all 5 data rows and their dividers were left completely untouched — zero risk to existing content/spacing). Container height: 548 → **488**. This was necessary to fit the new 4-pillow action row (110px, per reference) + dock (12px + 84px, per reference) inside the fixed 844px frame — the numbers didn't fit otherwise (see Deviations).
- Note frame `16:78` repositioned from container-relative `y:500` to `y:436` (6px below the requirements row's actual end, `y:430`), values unchanged.

### Action row (new, replaces old 3-icon row)
- Deleted old, non-conforming action row `16:82` (Pass/View/Save/Interested, uneven icon sizes) and old dock `16:99`.
- Cloned the **approved** actions frame `7:87` from Frame 02 in full (4 `btn/pillow` instances + labels, auto-layout config, spacing) → new node `191:799`, reparented into `16:2`, `layoutPositioning: ABSOLUTE`, positioned at `x:0, y:634` (16px below card bottom at container-y 618, per brief).
  - Pillow instances inherited unchanged from the clone: mainComponents `73:2` (Pass), `73:6` (Details), `73:10` (Save), `73:13` (Shortlist, 76px, terracotta via its own component styling).
  - Geometry (verified via read-back): Pass `x:31,y:14,64×64`; Details `x:115,y:14,64×64`; Save `x:199,y:14,64×64`; Shortlist `x:283,y:8,76×76`. Margins 31px both sides, 20px gaps — identical to Frame 02.
  - Labels cloned verbatim: "Pass", "Details", "Save", "Shortlist" (Inter Medium 11.5, muted ink via `VariableID:11:16`).
- Cloned the approved `nav/dock` instance `119:196` (master `74:2`) alone (not the whole `bottomNav` wrapper, to avoid bringing over Frame 02's unrelated Matches-badge override) → new node `191:812`, reparented into `16:2`, `x:12, y:748` (12px side margins on a 390px frame matching the 366px dock width; 12px off the frame's bottom edge: `748+84+12=844`). Discover slot is active by default on this master (inherited, no override needed).

## Instances placed — rescale/positioning arithmetic
| Instance | Master | Native | Target | Ratio / method |
|---|---|---|---|---|
| `189:833` brand-mark | `frame/mehrab` (`81:2`) | 120×150 | 56×70 | `rescale(56/120=0.4667)` on freshly-placed instance |
| `191:799` actions row | clone of `7:87` (contains `btn/pillow` `73:16` variants) | 390×110 | 390×110 | cloned wholesale, no rescale needed |
| `191:812` nav/dock | `nav/dock` (`74:2`), clone of `119:196` | 366×84 | 366×84 | cloned wholesale, no rescale needed |

## Deviations from the literal brief (with reasons)

1. **Action labels "Pass/Details/Save/Shortlist" replace the old "Pass/View/Save/Interested."** The brief's own Step 2 names the four actions as "pass/details/save/shortlist," matching Frame 02 exactly. Read as intentional vocabulary alignment across the app (this is a UI-chrome relabel, not RFP mock data), not a violation of "keep existing copy" (which I applied to the RFP data itself — vendor name, order qty, budget, timeline, requirements — all preserved verbatim).

2. **Card container height reduced 548 → 488px.** The fixed 844px device frame has no slack: header(130) + card + 16px gap + actions(110) + dock(12+84=96) must total 844, capping the card at ≤492px. The reduction was taken entirely from ~76px of genuinely unused whitespace between the Requirements row and the note (verified by reading live geometry, not estimated) — no existing row, divider, or field was resized or moved.

3. **Budget/qty/deadline "embossed chips" implemented as styled wells on the existing label/value/caption frames, not as literal `chip/stat` (72:5) instances.** `chip/stat`'s native structure is a single line of text in a 98×31 pill — it cannot hold the existing 3-line stat block (caps label + big value + caption) without dropping content, which would violate "keep existing values." Applied the chip's *visual recipe* instead — `cornerRadius:999` + `neu/raised` by style reference — directly to the value sub-frames, which is explicitly permitted by the brief ("chip/stat style **or** instances").

4. **Vendor name font size reduced 23 → 19 (Fraunces Black).** Pre-existing bug in the source frame: "Noor & Co." at 127px wide was already wider than its 97px column even before I touched anything, and rendered overlapping the "Verified · Trust 91" badge (row width 310 is structurally too narrow for avatar+full name+badge side by side — even 0 gap would come up 16px short). Fixed by shrinking the name text until it clears the badge with a 10px gap (verified by read-back: `nameRight:171, badgeLeft:181`). Text content and color untouched.

5. **Header row `16:22` converted from `layoutMode: HORIZONTAL` to `NONE`.** Appending the new mehrab instance into the auto-layout row silently reflowed the other two children (name-block, badge) to wrong positions per the documented gotcha. Disabling auto-layout and restoring each child's original explicit x/y was the direct fix; this is a plain mockup frame, not a design-system master, so structural edits here are in-scope per the task's own ruling on plain nodes.

## Read-back evidence (post-edit, authoritative)

```
frame 16:2 fill: {r:0.9373,g:0.9020,b:0.8471} bound to VariableID:11:5 (ivory surface/cream)
rect 16:20: cornerRadius:28, effectStyleId: "S:83bd631c640007662d48739964292609232a6432," (neu/raised)
chip 16:41: cornerRadius:999, effectStyleId: neu/raised
container 16:19: y:130, height:488, bottom:618
actions 191:799: x:0, y:634, w:390, h:110, bottom:744
dock 191:812: x:12, y:748, w:366, h:84, bottom:832  (844 - 832 = 12px bottom margin ✓)
mehrab 189:833: 56×70, mainComponent "frame/mehrab"
nameText 16:26: fontSize:19, width:101 (nameRight 171 < badgeLeft 181, gap 10px)
catText 16:27: fontSize:14, fill {0.1647,0.1294,0.0941} = #2A2118 espresso ink ✓
```

## Verification triple

1. **Effects soft not muddy** — confirmed visually via full-frame screenshot post-edit (taken after the last edit, see below): card, chips, pillows, and dock all show soft warm-cream neumorphic relief, no harsh/dark shadow banding.
2. **Text contrast intact** — vendor name, subtitle, and all values render in espresso ink / warm dark tones against ivory/cream fills; no color contrast regressions introduced. Espresso ink read-back confirmed exact `#2A2118` match on the subtitle.
3. **No overflow** — programmatic check: `frame.findAll()` over every descendant, comparing `absoluteRenderBounds` (which includes shadow bleed) against the frame's own `absoluteRenderBounds`. **Result: 0 offenders** (checked twice — once after the pillow/dock placement, once again after the final name font-size fix).

Final screenshot (post all edits, including the name-overlap fix) confirms: clean card hierarchy, three embossed stat chips read as pressed-out pills, requirement tags styled consistently, 4-pillow action row with terracotta Shortlist CTA, dock with Discover slot active (terracotta compass in a debossed well), no clipping anywhere.

## Untouched
No other frame on the page was written to. Reference frame `7:2` was only read from and cloned (`clone()` does not mutate the source) — its own nodes were never mutated.

# Task DARK-02 Report: Frame 02 "Buyer Discover" dark neumorphism restyle

**Status: DONE.** Frame `7:2` ("02 · Buyer Discover") restyled in place to dark neumorphism. No other frame, master component, shared style, or variable was touched — confirmed by post-edit read-back (see Verification).

## Instances detached (sanctioned, in-scope)

`InstanceNode.detachInstance()` detaches nested instances by detaching their instance ancestors too, and reassigns new node IDs to the entire converted subtree. Detach order was outer→inner to avoid uncontrolled cascades. Old ID → new (post-detach) ID:

| Component | Old ID | New (frame) ID |
|---|---|---|
| card/trust | 117:105 | 199:837 |
| btn/pillow (Pass) | 119:104 | 199:851 |
| btn/pillow (Details) | 119:110 | 199:855 |
| btn/pillow (Save) | 119:116 | 199:859 |
| btn/pillow (Shortlist) | 119:121 | 199:862 |
| nav/dock | 119:196 | 199:865 |
| photo (nested in card/trust) | — | 199:901 |
| gauge (nested) | — | 199:912 |
| chip/stat ×3 (nested) | — | 199:917, 199:920, 199:923 |
| badge/cert ×3 (nested) | — | 199:930, 199:941, 199:952 |

Read-back after detach: `remainingInstances` query over the full `7:2` subtree returned `0` — confirms all 14 instances (6 outer + 8 nested) were successfully detached and no instance remains anywhere in the frame.

## Local dark effect recipes used (all set directly on node `.effects`, `effectStyleId` cleared to `''` — no shared style edited or created)

**neu-raised (dark)** — applied to: segmented-control active tab, notification bubble, "similar to" pill, card/trust panel, 3× chip/stat, 3× badge medallion, 3× btn/pillow (Pass/Details/Save), nav/dock bar:
```
DROP_SHADOW  white a:0.05  offset(-6,-6) radius:14
DROP_SHADOW  black a:0.65  offset(8,8)   radius:16
```

**neu-debossed (dark)** — applied to: segmented-control trough, gauge well, nav active-well:
```
INNER_SHADOW  black a:0.6   offset(5,5)   radius:10
INNER_SHADOW  white a:0.06  offset(-5,-5) radius:10
```

**photo-well deboss (dark, geometry preserved from original local — this node was never a shared-style reference)**: same recipe scaled to the node's existing offsets (3.6667/7.3333).

**Ember glow (primary CTA — Shortlist button)**, replacing the old shared terracotta-glow style reference:
```
DROP_SHADOW  white a:0.15         offset(-4,-4) radius:10
DROP_SHADOW  #E8420A a:0.55        offset(6,6)   radius:18
Fill: GRADIENT_LINEAR #FF6A00 → #E8420A
```

## Color map applied

- Canvas: `#1C1D22` — Surface (raised): `#26272C` — Well (debossed): `#1F2025` — Badge chip: `#14151A`
- Text: title `#E8E9ED`, label `#B9BBC3`, secondary `#8A8C94`
- Gold (brightened): `#E3AC49` — logo dot, badge medallion rings, Save-star stroke, photo arch-hairline
- Sage (lightened): `#8FA878` — cert badge icons, Trust nav icon (kept sage per original brand pattern, not demoted to gray)
- Ember: `#FF6A00`→`#E8420A` gradient — sparkle icon, active-dock compass icon (gradient stroke), Shortlist primary button + glow
- Gauge/progress arc: angular gradient red `#E63326` → ember `#FF6A00` (75%) → yellow `#FFC93C` (100%), replacing the old sage→gold arc — this is the frame's "gauge/progress element," per brief's red→orange→yellow accent rule
- Photo placeholder gradient: dark charcoal gradient `#33333A`→`#1F1F24` replacing the old ivory→tan placeholder gradient
- Icon-mask container frames (icon-x, icon-eye, icon-star, icon-check, icon-compass, icon-heart, icon-file, icon-shield, icon-user, icon-sparkle): fill cleared to transparent (previously opaque white, which would have rendered as bright white blocks on charcoal)

## Deviations from a literal 1:1 read of the brief

1. **Motif-mandala background circles** (`7:122` subtree, 44 vectors) left untouched. The brief didn't call these out explicitly, and they're already very low-opacity (9%) gold hairlines — recoloring risked introducing visible artifacts without a clear spec. On dark charcoal the same gold hairlines read with *more* contrast than they did on ivory, so no change was needed to keep them "subtle, not muddy."
2. **Badge/cert icon glyphs** render as a small solid-color square behind vector strokes (pre-existing component geometry, unchanged by this task — I only recolored fill/stroke, never touched shape/size). This is visually blockier on dark than on ivory but is not a regression I introduced; fixing it would mean altering node geometry, which is out of scope for a reskin.
3. Three-tier text mapping (title/label/secondary) was inferred by matching original ivory ink→title and muted→label, then further splitting inactive nav icon strokes and the card's category-location line into the dimmer "secondary" (`#8A8C94`) tier for hierarchy, since the ivory version only had two tiers (ink/muted). This is a judgment call in service of "faithful to the reference," which itself uses three distinct text weights.

## Verification (all read-backs are post-edit, taken after the last write call)

1. **Shadows soft, not muddy/banded** — confirmed visually via full-res screenshot (`get_screenshot` on `7:2`, 1400px). Raised card panel, segmented control, dock, and Shortlist glow all render with soft, low-opacity dual shadows; no banding.
2. **Text contrast** — every text node's fill was reassigned via the canonical load-font→await→mutate recipe and read back with its `characters` value to confirm the correct node was hit (25 text nodes total: 12 title-tier, 13 label-tier, 1 secondary-tier, plus the nav badge numeral). Visual crop review of top bar, card, actions, and nav dock confirms all copy is legible on charcoal.
3. **Overflow check** — programmatic scan of all 163 descendants of `7:2` against the frame's bounding box found 18 raw bounding-box overflows, **all** belonging to the pre-existing `motif-mandala` decorative subtree (`7:122` and its vector children), whose `x=150,width=360` in a 390-wide frame was already overflowing before this task touched anything (never repositioned or resized by this task). Frame `7:2` has `clipsContent: true` (read-back confirmed), so this bleed is invisibly clipped, matching the original ivory frame's behavior. Zero overflow from any node this task created or modified.
4. **Shared-style hygiene** — final read-back query for any `effectStyleId` remaining set on any node in the `7:2` subtree returned an empty array (`0` matches), and a second query for remaining `INSTANCE`-type nodes also returned `0`. No shared effect style or variable was read for editing or write access at any point in this task; only `effectStyleId = ''` (unlink) was used.

Final screenshot: taken after the last edit call (text-color pass), postdating every mutation.

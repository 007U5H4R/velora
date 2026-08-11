# Velora — Dark Neumorphic Design System

Extracted from frame **"02 · Buyer Discover"** (node `7:2`, file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups") after the full iteration session that turned it into the reference frame for the rest of the app. All values below are read live from that frame's nodes — treat this as the canonical source; if a future frame drifts from it, this frame wins.

Companion file: the original scoped-task report and its addenda (`​.superpowers/sdd/2026-08-10-velora-neumorphism-redesign/task-dark02f-report.md`) has the blow-by-blow of *how* this frame got here. This file is the distilled *what to reuse*.

---

## 1. Color tokens

### Surfaces
| Token | Hex | RGB (0–1) | Used for |
|---|---|---|---|
| Canvas | `#1C1D22` | 0.110, 0.114, 0.133 | Screen background |
| Raised surface | `#26272C` | 0.149, 0.153, 0.173 | Card container, dock tiles |
| Well / sunken | `#1F2025` | 0.122, 0.126, 0.145 | Active-state insets (dock active-well, unread badge bg) |

### Text tiers
| Token | Hex | Used for |
|---|---|---|
| Primary (near-white) | `#E8E9ED` | Headline text, big stat numbers, status values, active nav label |
| Secondary (muted) | `#8A8C94` | Body copy, status labels, inactive icons/labels |
| Tertiary (dim) | `#B9BBC3` | Action-button captions, cert badge labels |
| On-ember (warm white) | `#FFF7F2` | Text sitting directly on the ember gradient (selected segmented-control label) |

### Ember accent (primary brand)
| Token | Hex | Used for |
|---|---|---|
| Ember light | `#FF6A00` | Gradient start — selected tab pill, active nav icon stroke |
| Ember dark | `#E8420A` | Gradient end — same elements |

### Gold / trust accent
| Token | Hex | Used for |
|---|---|---|
| Trust gold | `#E3AC49` | Photo hairline ring (stroke weight 2), ambient glow tint behind the photo |

### Status / semantic colors (widened 2-stop gradients — see §3 for the recipe)
| Status | Light stop | Dark stop | Used for |
|---|---|---|---|
| Red (negative) | `#FF8A80` | `#C62828` | Pass button |
| Blue (informational) | `#82C4FF` | `#0D47A1` | Details button |
| Amber (attention) | `#FFE082` | `#FF8F00` | Save button |
| Mint/emerald (positive) | `#8FF5DC` | `#0A8F72` | Shortlist button, gauge wave-mesh art |

**Rule of thumb:** every colored gradient in this system uses a *light* stop and a meaningfully *darker* stop of the same hue — never two close-lightness stops. A subtle two-stop gradient reads as flat color at UI sizes; widen the range until it's unmistakably a gradient.

---

## 2. Typography

Two families, strict role split — **never mix them within one text role**:

- **Fraunces (SemiBold)** — display serif, reserved for *hero numbers and headline names only*.
- **Inter** — everything else (UI labels, values, body copy, buttons).

| Role | Family / style | Size | Tracking | Color |
|---|---|---|---|---|
| Headline name (e.g. vendor name) | Fraunces SemiBold | 20px | 0% | `#E8E9ED` |
| Hero stat number (e.g. trust score) | Fraunces SemiBold | 24px | 0% | `#E8E9ED` |
| Body copy | Inter Regular | 13px | 0% | `#8A8C94` |
| Status label (icon-row caption) | Inter Medium | 9.5px | +1% | `#8A8C94` |
| Status value (bold stat) | Inter Bold | 14px | 0% | `#E8E9ED` |
| Cert/uppercase-style label | Inter Medium | 10px | +6% | `#B9BBC3` |
| Dock nav label | Inter Semi Bold | 9.5px | +1% | `#E8E9ED` active / `#8A8C94` inactive |
| Action-button caption | Inter Medium | 11.5px | 0% | `#B9BBC3` |
| Selected segmented-control label | Inter Semi Bold | 13px | 0% | `#FFF7F2` |

---

## 3. Effect (shadow) recipes

Four recipes cover every surface in the frame. All are `DROP_SHADOW`/`INNER_SHADOW` pairs — never a single shadow alone (that's what makes the neumorphic "raised" or "sunken" read work).

**A. Raised neu (flat elevated surface)** — card container, dock tiles
```
highlight: DROP_SHADOW white  5% opacity, offset(-6,-6), radius 14
shadow:    DROP_SHADOW black 65% opacity, offset( 8, 8), radius 16
```

**B. Raised + colored glow (interactive/CTA surface)** — all 4 action buttons
```
highlight: DROP_SHADOW white 15% opacity, offset(-4,-4), radius 10
glow:      DROP_SHADOW [button's dark gradient stop] 55% opacity, offset(6,6), radius 18
```
Glow color is always the *dark* stop of that element's own gradient — never a fixed color. This is what ties each button's glow to its own hue automatically.

**C. Sunken / deboss (inset, "pressed-in" surface)** — active dock-tile well
```
dark inner:  INNER_SHADOW black 60% opacity, offset( 5, 5), radius 10
light inner: INNER_SHADOW white  6% opacity, offset(-5,-5), radius 10
```

**D. Raised + ambient glow (prominent circular feature)** — the vendor photo
```
highlight:    DROP_SHADOW white 12% opacity, offset(-4,-4), radius 10
shadow:       DROP_SHADOW black 55% opacity, offset( 6, 6), radius 18
ambient glow: DROP_SHADOW [element's accent color] 35% opacity, offset(0,0), radius 16
```
Recipe D = Recipe B's highlight/shadow pair, plus a third *centered* (no offset) glow tinted to the element's own accent ring color. Use this when something needs to feel like the "hero" of a card, not just another interactive button.

---

## 4. Corner radii

| Element | Radius |
|---|---|
| Card container | 28 |
| Pill / circular buttons | 999 (full pill) |
| Dock tile | 20 |
| Active-well inset | 16 |
| Circular photo/avatar | width ÷ 2 (perfect circle) |

---

## 5. Icon conventions

- Line icons, **stroke only, no fill**, `ROUND` caps and joins.
- Default (inactive) color: muted `#8A8C94`.
- On a saturated colored background (red/blue/green button): **white** `#FFFFFF` stroke.
- On a light background (yellow/amber button): **dark canvas tone** `#1C1D22` stroke — white fails contrast on yellow.
- Active/selected state (e.g. Discover nav icon): ember gradient stroke (`#FF6A00`→`#E8420A`), same direction convention as §6.
- Stroke weight scales with icon size: ~1.2–1.3 for small 10px glyphs (status row icons), ~2–3 for larger 20–27px glyphs (action buttons, nav icons) — deliberately bolder at larger sizes rather than a fixed weight.

---

## 6. Gradient direction convention

Two distinct transforms are in use — pick based on shape:

- **Circular/pill buttons** (action buttons, Shortlist): diagonal 45°, light stop top-left → dark stop bottom-right.
  `gradientTransform: [[0.7071,-0.7071,0.5],[0.7071,0.7071,-0.2]]`
- **Horizontal segmented-control pill**: vertical top→bottom.
  `gradientTransform: [[0,1,0],[-1,0,1]]`

Reuse the diagonal transform for any new circular/pill component; reuse the vertical one only for horizontal bar-shaped selected states.

---

## 7. Layout & spacing conventions

- **Card inset:** 20px from the card's edges is the standard padding for primary content (photo, name block, stat row, cert row all start at `x:20`).
- **Shared-grid alignment:** when two separate rows need their items to line up as columns (e.g. stat metrics above cert badges), don't rely on matching auto-layout distribution — it won't align variable-width content precisely. Instead: pick shared slot centers across the row's width (e.g. 50/150/250 across a 300px row), set `layoutMode = "NONE"` on both row containers, and position each child at `x = slotCenter − childWidth / 2`. This guarantees pixel-exact alignment regardless of each item's own content width.
- **Auto-layout for internally-related content:** icon+label rows and stat columns use nested auto-layout (`figma.createAutoLayout`) with `counterAxisAlignItems: "CENTER"` so the icon+label line and the value line stay centered relative to each other, not left-justified.
- **Plain status-row pattern (current standard — supersedes an earlier pill/chip version):** for any "at a glance" metrics row, prefer icon(~10px, muted) + label on line 1, bold value on line 2, sitting directly on the card surface with generous even spacing — **no background pill, no border, no dot indicator, no glow.** This was a deliberate simplification made mid-session after an initial colored-chip version; it's the pattern to carry forward, not the chips.
- **Z-order:** decorative background motifs (e.g. the mandala) sit behind the card; the card sits above; any "peek" layers suggesting a stack of additional cards sit behind the top card, offset a few px to one side (an intentional, not a bug — see verification note below).
- **Dock tiles:** icon anchored near the top of a 60×60 tile (`y≈12`), label sits just above the tile's bottom edge (a few px of margin looks more settled than perfectly flush) — active tile gets recipe **C** behind its icon plus the ember icon stroke; inactive tiles stay flat/muted.

---

## 8. Component patterns (copy these structures, not just the tokens)

1. **Gradient pill action button** — circle (64px standard, 76px for the primary CTA), diagonal 2-stop gradient (§6), icon color per §5's contrast rule, effect recipe **B**, muted caption label below.
2. **Circular photo/avatar** — perfect circle frame + circularly-cropped image fill (`cornerRadius = width/2`) + thin gold hairline ring (`strokeWeight 2`) + effect recipe **D**. Size it deliberately larger than a plain thumbnail when it's meant to be the card's visual anchor.
3. **Plain status row** — see §7. Three (or more) columns of icon+label+value, grid-aligned via the shared-slot technique if it needs to line up with another row.
4. **Circular badge/medallion** — prefer real badge artwork (an uploaded image) filling a circular ellipse over a custom icon-in-a-ring construction when a recognizable badge exists; it reads better at small sizes than a generic glyph.
5. **Dock nav tile** — rounded-square (radius 20), effect recipe **A**, icon + label per §7.
6. **Segmented control** — horizontal pill track; selected segment gets the ember gradient (§6, vertical variant) + a soft ember glow (single `DROP_SHADOW`, ember @32%, radius 14, offset `(0,4)` — not the full glow recipe, just the glow half) + near-white bold label; unselected stays flat/transparent with a muted label.

---

## 9. Verification discipline (carry forward to every new frame)

- After any edit, re-run a **programmatic overflow check**: walk the frame's subtree, compare each node's absolute bounding box to the frame's bounds (0.5px tolerance), flag any node that exceeds it.
- This frame's accepted baseline is **1 pre-existing, intentional offender**: `stack-layer-3` (`212:731`), +5px right overflow — the deliberate "peek" of a card stack behind the top card. Any *new* offender after an edit means something broke; investigate before moving on.
- Take a screenshot after the *last* edit in a batch, not before — a screenshot that predates your final change proves nothing.
- Read font styles/weights live via `getStyledTextSegments` before assuming a style name (`"Semi Bold"` vs `"SemiBold"` inconsistency exists even within this one frame — Fraunces uses `"SemiBold"`, Inter uses `"Semi Bold"` with a space — copy the exact string from the node, don't guess).

---

## 10. Known deliberate exceptions (don't "fix" these on a new frame)

- `stack-layer-3` (`212:731`) overflows the frame by 5px on the right — intentional card-stack depth cue.
- Fraunces' style string is `"SemiBold"` (no space); Inter's equivalent is `"Semi Bold"` (with a space) — both are correct as-is, it's a font-vendor naming inconsistency, not a typo to unify.

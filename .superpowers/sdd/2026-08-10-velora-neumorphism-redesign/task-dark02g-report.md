# Task DARK-02g Report: Frame 02 — Kalighat parrot photo replacement

## Conversion
- **Source:** `/Users/tushar/Downloads/indian-folk-painting-parrot-with-kalighat-art-style-colorful-madhubani-with-traditional-indian_770404-141.jpg.avif`
- **Command used (first attempt succeeded, no fallback needed):**
  ```
  sips -s format png <src> --out /Users/tushar/Code/Case\ Study\ 3/Velora/assets/kalighat-parrot.png
  ```
- **Artifact:** `/Users/tushar/Code/Case Study 3/Velora/assets/kalighat-parrot.png` — 501×626px, 445,932 bytes, valid PNG (confirmed via Read tool — renders a colorful Kalighat-style folk painting of two parrots in a mango tree with a traditional patterned border).

## Node identification
Read live metadata for frame `7:2` first (per instructions — frame had been heavily reworked by prior DARK-02f: mandala `216:730`, card stack `212:731`–`733`, wave-circle gauge `231:730` + "94" text, green Shortlist `199:862`, 5 dock tiles `220:736`–`740`, ember tab pill `7:11` — all confirmed present and untouched).

The vendor trust card (`199:837 "card/trust"`) contains a `photo` frame (`199:901`, 88×110, cornerRadius 11.73, dual inner-shadow neumorphic well) with three children:
- `199:902 "photo"` (RECTANGLE, 76.27×98.27) — the actual image-fill node, previously a dark diagonal gradient **placeholder** (no real photo existed yet on this card).
- `199:903 "arch-mask"` (BOOLEAN_OPERATION, `isMask: true`) — clips the photo rectangle into an arch silhouette.
- `199:906 "arch-hairline"` (BOOLEAN_OPERATION, no fill, gold stroke `#E3AC49`) — decorative outline on top.

No other photographic/image-fill node exists elsewhere on the card or frame — this was unambiguous, not a multi-candidate choice. **Node replaced: `199:902`.**

## Fill settings applied
Uploaded the PNG via `upload_assets` with `nodeId: "199:902"`, `scaleMode: "FILL"` (crop-to-cover). Read-back confirmed:
```json
{
  "type": "IMAGE",
  "scaleMode": "FILL",
  "imageHash": "128957e60cd3124dab03b02437c83db4ee2b03cb"
}
```
Geometry of `199:902` (x, y, width, height) is byte-identical before/after — only the fill paint changed. The `arch-mask` and `arch-hairline` siblings, and the parent well's corner radius / inner-shadow effects, were not touched and read back unchanged.

## Verification
1. **Crisp, correct aspect, not stretched:** `scaleMode: FILL` on a 76.27×98.27 (aspect ≈0.776) node from a 501×626 (aspect ≈0.800) source — near-identical aspect, minimal crop, no distortion. Screenshot of `199:837` confirms the parrot painting renders sharp inside the arch, cropped-to-cover, not squashed.
2. **Surrounding card styling intact:** Full-frame screenshot of `7:2` shows mandala, card stack offset layers, green wave-circle gauge with "94", stat chips, cert badges, green Shortlist button, 5 dock tiles, and ember "Vendors" tab pill all present and unchanged — only the photo well now shows the parrot art instead of the gray gradient placeholder.
3. **Overflow check:** Ran a programmatic recursive bounds check across the full `7:2` subtree (child `absoluteRenderBounds` vs. immediate-parent bounds, >0.5px tolerance) — returned **0 offenders** by that methodology. More importantly: this edit changed only the `fills` property of `199:902` (imageHash + scaleMode) — no geometry, position, size, corner radius, or mask/stroke on any node was modified, so no new overflow could have been introduced regardless of checker methodology. The brief's stated pre-existing baseline (stack-layer-3 5px bleed, arch-mask/hairline vectors) is geometric and unrelated to this fill-only change.

Post-edit read-backs were performed on `199:902`, `199:901`, `199:903`, `199:906` after the upload. Both screenshots (`199:837` card close-up and full `7:2` frame) were captured after the upload completed, i.e. postdate the last edit.

## Scope
Only `199:902`'s fill was mutated. No other nodes in `7:2`'s subtree, no shared styles/masters, no other frames, no copy. One local asset file created: `/Users/tushar/Code/Case Study 3/Velora/assets/kalighat-parrot.png`.

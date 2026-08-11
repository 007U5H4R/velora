# Task DARK-02g: Frame 02 — replace photo component with Kalighat parrot art (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Runs AFTER DARK-02f — read the live frame first; prior dark tasks changed many nodes (mandala 216:730, stack 212:731-733, wave-circle gauge area, green Shortlist 199:862, new dock tiles, ember tab pill).

**Source image:** `/Users/tushar/Downloads/indian-folk-painting-parrot-with-kalighat-art-style-colorful-madhubani-with-traditional-indian_770404-141.jpg.avif` (Indian folk/Kalighat-style parrot painting).

## What to do
1. **Convert AVIF → PNG locally** (Figma upload may reject AVIF). Try in order until one works: `sips -s format png <src> --out <dst>`; `ffmpeg -i <src> <dst>`; Python `pillow-avif-plugin`/`pillow_heif` (`pip3 install --user pillow pillow-avif-plugin`). Save the converted artifact to `/Users/tushar/Code/Case Study 3/Velora/assets/kalighat-parrot.png`.
2. **Identify the photo component on frame 7:2**: the vendor card's photo/image area (the node that currently renders a photograph/avatar image fill — read the live frame; it is the main pictorial element on the trust card). If genuinely ambiguous between multiple image nodes, pick the LARGEST photographic node on the card and note the choice + alternatives in the report.
3. **Replace**: upload the PNG to Figma and set it as that node's image fill (scale mode FILL/cover, preserve the node's existing geometry, corner radius, and any overlay/rim treatments). Do NOT stretch/distort — crop-to-fill. The parrot should read clearly at the node's size.
4. Nothing else changes.

## Rules & verification
- Only frame 7:2's subtree (+ the local asset file); no shared styles/masters/other frames; no copy changes.
- Verification triple: image renders crisp (not stretched/squashed — check aspect), surrounding card styling intact, programmatic overflow check 0 new offenders (1 pre-existing intentional: stack-layer-3 5px bleed). Post-edit read-backs; final screenshot postdates last edit.

## Report
Write `task-dark02g-report.md` in this directory: conversion command used, artifact path, node replaced (ID + why chosen), fill settings, verification results.

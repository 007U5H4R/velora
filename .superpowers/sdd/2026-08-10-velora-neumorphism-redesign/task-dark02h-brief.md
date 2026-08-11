# Task DARK-02h: Frame 02 — refine chips + cert badges section (USER DIRECTIVE)

**Frame:** "02 · Buyer Discover" (node `7:2`), file `AwWhewtdrQAGoS9jCs3uXi`, page "Velora — Mockups". Dark neu system: canvas #1C1D22, raised #26272C, wells #1F2025, ember #FF6A00→#E8420A, gold #E3AC49, sage #8FA878, text #E8E9ED/#B9BBC3/#8A8C94. Runs AFTER DARK-02g — read the live frame first.

**User screenshot of the problem:** `/Users/tushar/Desktop/Screenshot 2026-08-10 at 19.39.54.png` — the stat-chip row ("On-time 97%", "MOQ 300", "42-day lead") and the certification row (GOTS / OEKO-TEX / SMETA) on the trust card. Directive: "Refine and polish this section."

## Visible defects to fix
1. **Stat chips:** hard-edged blocky dark rectangles render behind/around the pills (shadow or leftover-node artifacts) instead of soft neu shadows; the pills' light fill looks pasted-on against the charcoal.
2. **Cert badges:** each is a crude flat green/sage SQUARE sitting inside a gold circle — reads as a placeholder, not a credential mark; spacing/alignment across the three is uneven; label typography is unrefined.

## Target treatment (polish, not redesign — same content, same positions row-wise)
- **Chips:** proper dark-neu raised pills — fill #26272C, r999, the frame's local dual-shadow recipe (soft, no hard rectangles anywhere behind them — find and delete any artifact nodes causing the blocky look), label #E8E9ED Inter medium, comfortable padding (~14–16px x, 8–10px y), identical heights, evenly gapped. If the light-fill look is actually a deliberate embossed style, still kill the blocky artifacts and normalize; choose the read that looks premium on charcoal and note the choice.
- **Cert badges:** each becomes a refined credential mark: a circular raised pebble (~40–44px, #26272C, soft dual shadow) with a thin gold ring (1.5–2px, #E3AC49) and a CENTERED meaningful glyph instead of the bare square — a simple checkmark or shield vector in sage #8FA878 (draw a clean vector; no emoji). Even horizontal distribution aligned to the chips row's margins; consistent vertical alignment.
- **Labels (GOTS/OEKO-TEX/SMETA):** Inter, ~10px, letter-spacing ~6–8%, #B9BBC3, centered under each badge at a consistent gap (~8px).
- Overall: the section should read as one composed unit — consistent spacing rhythm between chip row and badge row.

## Rules & verification
- Only this section's nodes within 7:2 (plus deleting any shadow-artifact nodes attached to it); no shared styles/masters/other frames; keep all copy exactly.
- Auto-layout gotchas apply (layoutPositioning:'ABSOLUTE' as needed).
- Verification triple: no blocky shadow artifacts at full res / text + glyph contrast intact / programmatic overflow check 0 new offenders (pre-existing intentional: stack-layer-3 5px). Post-edit read-backs; final screenshot postdates last edit and must include a zoomed crop of this section.

## Report
Write `task-dark02h-report.md` in this directory: artifact nodes found/deleted, chip + badge node IDs with geometry read-backs, the glyph choice, deviations, verification results.

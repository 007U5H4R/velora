# Velora MVP Build — Orchestration Ledger

**Branch:** `build/mvp` · **App root:** `Velora/app/` · **Plan:** `docs/superpowers/plans/2026-08-11-velora-react-mvp-build.md` · **Spec:** `docs/superpowers/specs/2026-08-11-velora-react-mvp-build-design.md`

**Toolchain:** node `/Users/tushar/.local/nodejs/bin/node` (v24.19.0), npm 11.17.0. Subagents MUST `export PATH="$HOME/.local/nodejs/bin:$PATH"` before node/npm. git 2.50 at `/usr/bin/git`. No `gh` installed.

**Orchestration model (Pro-tier lean):** one fresh implementer subagent per task; briefs in `briefs/`, reports in `reports/`; orchestrator (Opus) reviews each report + targeted check; bounded fix loop (max 5). Implementers on **Sonnet** for Phase 1 (mechanical/integration); **Opus** reserved for design-judgment screens + final whole-branch review. Commit after each green task.

**Global constraints:** see plan "Global Constraints" — dark-neu tokens verbatim from `design-system.md`, strict Fraunces/Inter split, phone-framed 390px, no runtime CDN, mock-data only, respect `prefers-reduced-motion`.

---

## Phase 1 — Foundation

| Task | Model | Status | Report | Notes |
|---|---|---|---|---|
| 1.1 Scaffold app + dev server | Sonnet | ✅ done `1a2c6f0` | task-1.1-report.md | build+test green; React **19** accepted (see decision) |
| 1.2 Token + style layer | Sonnet | ⏳ running (bg) | | from design-system.md §1–§4,§6 |
| 1.3 Types + store (TDD) | Sonnet | ☐ pending | | 5 store tests must pass |
| 1.4 Seeded mock data | Sonnet | ☐ pending | | values from Figma screenshots (provided in brief) |
| 1.5 PhoneFrame + StatusBar + Gallery | Sonnet | ☐ pending | | |
| 1.6 Button (ember/secondary/pillow×4) | Sonnet | ☐ pending | | |
| 1.7 SegmentedControl + Chip | Sonnet | ☐ pending | | |
| 1.8 Avatar + CertBadge + MandalaBg | Sonnet | ☐ pending | | |
| 1.9 StatRow + Stepper + Toggle | Sonnet | ☐ pending | | |
| 1.10 BottomNav | Sonnet | ☐ pending | | role-aware |

**Phase 1 gate:** gallery shows every component matching Figma; `npm test` green; dev server clean. → human checkpoint.

## Decisions / open threads
- 2026-08-11: repo `git init`ed at Velora/; baseline commit (81 files); branch `build/mvp`.
- Reviews run by orchestrator (not separate reviewer subagents) to save Pro-tier budget; final whole-branch review still on Opus.
- 2026-08-11: **React 19.2.8 accepted** (Vite react-ts template default; all deps React-19-compatible, build+test green). Supersedes the plan/spec "React 18" line. Installed stack: Vite 8, TS 6, RR 7, framer-motion 13, zustand 5, Vitest 4, RTL 16.
- Cleanup owed: Task 1.2 also deletes leftover Vite demo cruft (`App.css`, `assets/react.svg`, `assets/vite.svg`, `assets/hero.png`, `public/icons.svg`) and repoints `index.css`→global styles.

## Later phases (expand at session start)
- P2 Buyer core (Gauge, TrustCard, SwipeDeck, screens 02/03/04) · P3 Buyer lists (05/06/06b) · P4 Manufacturer (07/08/09 + loop) · P5 Shared+nav (10/11, role switch, transitions) · P6 Polish+responsive+final review.

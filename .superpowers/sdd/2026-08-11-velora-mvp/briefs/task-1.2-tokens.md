# Brief — Task 1.2: Token + shadow + font layer

Zero prior context. Do exactly this, verify, commit, report. This is the visual foundation every component inherits — values must be EXACT.

## Environment
- Repo root: `/Users/tushar/Code/Case Study 3/Velora` (quote all paths — spaces). App at `Velora/app/`. Branch `build/mvp`.
- **Before any node/npm:** `export PATH="$HOME/.local/nodejs/bin:$PATH"` (node 24, npm 11).
- Canonical source of these values: `Velora/design-system.md` (§1 colors, §2 type, §3 shadows, §4 radii, §6 gradients). The values below are copied from it — if you spot a conflict, design-system.md wins; note it in your report.

## Deliverables
Create `app/src/styles/tokens.css`, `app/src/styles/shadows.css`, `app/src/styles/global.css`; self-host fonts via `@fontsource`; wire imports in `app/src/main.tsx`; clean up Vite demo cruft.

### 1. `tokens.css` — `:root { … }` custom properties (EXACT hex)
```
/* surfaces */
--canvas:#1C1D22; --raised:#26272C; --well:#1F2025;
/* text */
--text-1:#E8E9ED; --text-2:#8A8C94; --text-3:#B9BBC3; --on-ember:#FFF7F2;
/* ember (primary) */
--ember-a:#FF6A00; --ember-b:#E8420A;
/* accents */
--gold:#E3AC49; --sage:#8FAF6A;
/* status gradient stops */
--red-a:#FF8A80; --red-b:#C62828; --blue-a:#82C4FF; --blue-b:#0D47A1;
--amber-a:#FFE082; --amber-b:#FF8F00; --mint-a:#8FF5DC; --mint-b:#0A8F72;
/* radii */
--r-card:28px; --r-pill:999px; --r-tile:20px; --r-well:16px;
/* fonts */
--font-display:'Fraunces Variable','Fraunces',Georgia,serif;
--font-ui:'Inter Variable','Inter',system-ui,-apple-system,sans-serif;
/* gradients — diagonal for circular/pill (design-system §6), vertical for segmented bars */
--grad-ember:linear-gradient(135deg,var(--ember-a),var(--ember-b));
--grad-ember-vert:linear-gradient(180deg,var(--ember-a),var(--ember-b));
--grad-red:linear-gradient(135deg,var(--red-a),var(--red-b));
--grad-blue:linear-gradient(135deg,var(--blue-a),var(--blue-b));
--grad-amber:linear-gradient(135deg,var(--amber-a),var(--amber-b));
--grad-mint:linear-gradient(135deg,var(--mint-a),var(--mint-b));
```

### 2. `shadows.css` — neumorphic recipes A–D as reusable vars (design-system §3; ALWAYS a pair)
```
:root{
  /* A · raised flat surface (cards, dock tiles) */
  --sh-raised:-6px -6px 14px rgba(255,255,255,.05), 8px 8px 16px rgba(0,0,0,.65);
  /* C · sunken/deboss (active wells, insets) */
  --sh-sunken:inset 5px 5px 10px rgba(0,0,0,.6), inset -5px -5px 10px rgba(255,255,255,.06);
}
/* B · raised + colored glow (CTAs/action buttons): glow = element's OWN dark stop @55%.
   Consumers set --glow, e.g. --glow:rgba(232,66,10,.55) for ember. */
.sh-cta{ box-shadow:-4px -4px 10px rgba(255,255,255,.15), 6px 6px 18px var(--glow,rgba(232,66,10,.55)); }
/* D · raised + ambient accent glow (hero circular feature, e.g. vendor photo):
   consumers set --ambient, e.g. rgba(227,172,73,.35) for gold. */
.sh-hero{ box-shadow:-4px -4px 10px rgba(255,255,255,.12), 6px 6px 18px rgba(0,0,0,.55), 0 0 16px var(--ambient,rgba(227,172,73,.35)); }
```
(You may also expose `--sh-cta`/`--sh-hero` as raw box-shadow var strings if cleaner — but keep the `--glow`/`--ambient` indirection so each element tints its own glow, per §3.)

### 3. Fonts (self-hosted, NO runtime CDN)
- `npm i @fontsource-variable/fraunces @fontsource-variable/inter` (variable packages).
- If a variable package fails to resolve, fall back to `@fontsource/fraunces` + `@fontsource/inter` (weights 400,500,600,700) and adjust the family names in `--font-display`/`--font-ui` accordingly — note which you used in the report.
- Import the font CSS at the TOP of `main.tsx` (before the local style imports).
- Fraunces is used at **weight 600 (SemiBold)** for display; Inter 400/500/600/700 for UI. (Reminder from design-system §2/§10: Fraunces style string is `SemiBold`, Inter is `Semi Bold` — irrelevant for CSS `font-weight:600`, just don't be surprised by it later.)

### 4. `global.css` — reset + base
- Minimal reset (`*{box-sizing:border-box;margin:0;padding:0}`), `html,body{height:100%}`.
- `body{ background:var(--canvas); color:var(--text-1); font-family:var(--font-ui); -webkit-font-smoothing:antialiased; }`
- A base for display text is fine as a utility class `.display{font-family:var(--font-display);font-weight:600;}` (components will opt in).

### 5. Wire + clean up
- `main.tsx` import order: fontsource CSS → `./styles/tokens.css` → `./styles/shadows.css` → `./styles/global.css`. Remove the old `import './index.css'` line.
- Delete demo cruft: `app/src/index.css`, `app/src/App.css`, `app/src/assets/react.svg`, `app/src/assets/vite.svg`, `app/src/assets/hero.png`, `app/public/icons.svg` (delete only ones that exist; `git rm` or `rm`). Confirm nothing still imports them.

## Verification (paste results in report)
- `export PATH="$HOME/.local/nodejs/bin:$PATH"; cd "/Users/tushar/Code/Case Study 3/Velora/app"`
- `npm run build` → succeeds (no missing-import errors from the deletions).
- `npm run test` → still passes (App smoke test 1/1).
- Grep-confirm the three style files are imported in `main.tsx` and each token file has the expected `--canvas`, `--sh-raised`, `--grad-ember` lines. Report the confirmation.

## Commit
`git -C "/Users/tushar/Code/Case Study 3/Velora" add -A && … commit -m "feat: dark-neumorphic token, shadow, and font layer"` with the `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` trailer.

## Report → `.superpowers/sdd/2026-08-11-velora-mvp/reports/task-1.2-report.md` (≤35 lines)
Include: which fontsource packages used (variable vs weighted), build+test result lines, confirmation the demo cruft is gone and build still green, the commit short hash, any deviation.

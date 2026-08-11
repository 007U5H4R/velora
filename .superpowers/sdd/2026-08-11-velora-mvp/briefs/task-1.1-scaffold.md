# Brief — Task 1.1: Scaffold the Velora app

You are an implementer with **zero prior context**. Do exactly this task, then write a report. Do not start other tasks.

## Environment (critical)
- Repo root: `/Users/tushar/Code/Case Study 3/Velora` (note the spaces — always quote paths). You are on branch `build/mvp`.
- **node/npm are NOT on PATH by default.** Before ANY node/npm/npx command, run:
  `export PATH="$HOME/.local/nodejs/bin:$PATH"` (node v24.19.0, npm 11.17.0).
- App will live in `Velora/app/`. Git user for commits: name `Tushar`, email `Tushar_Pathak@outlook.com` (pass via `-c user.name=... -c user.email=...` or rely on repo config if set).

## Goal
Scaffold a Vite + React 18 + TypeScript app at `Velora/app/` with React Router, Framer Motion, Zustand, and a working Vitest + React Testing Library setup. Deliverable: dev build succeeds and the test runner starts clean.

## Steps
1. `export PATH="$HOME/.local/nodejs/bin:$PATH"` then from the repo root:
   `npm create vite@latest app -- --template react-ts` (non-interactive; if it prompts, accept the react-ts template).
2. `cd "app" && npm install`.
3. Runtime deps: `npm i react-router-dom framer-motion zustand`.
4. Dev deps: `npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`.
5. Create `app/vitest.config.ts` (or extend `vite.config.ts`) with `test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' }`. Create `src/test/setup.ts` importing `@testing-library/jest-dom`.
6. Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json` scripts.
7. Replace `src/App.tsx` body with a minimal placeholder `export default function App(){ return <div>Velora</div>; }`. Remove the default Vite demo CSS/logos import lines so there are no missing-asset errors. Leave `src/main.tsx` mounting `<App/>` (no Router yet — that comes in Task 1.5).
8. Add one smoke test `src/App.test.tsx` that renders `<App/>` and asserts the text `Velora` is present.

## Verification (must pass — include exact output in your report)
- `export PATH="$HOME/.local/nodejs/bin:$PATH"; cd "/Users/tushar/Code/Case Study 3/Velora/app"`
- `npm run build` → succeeds (tsc + vite build, no errors).
- `npm run test` → the App smoke test PASSES (1 passed).
- `npm run dev` is NOT required to stay running; if you start it to check, kill it (don't leave a server running).

## Commit
`git -C "/Users/tushar/Code/Case Study 3/Velora" add -A && git -C "/Users/tushar/Code/Case Study 3/Velora" commit -m "feat: scaffold vite react-ts app (router/motion/zustand/vitest)`
Add the trailer line `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` in the commit body. (`node_modules/` is gitignored.)

## Report (write this file when done)
Write `/Users/tushar/Code/Case Study 3/Velora/.superpowers/sdd/2026-08-11-velora-mvp/reports/task-1.1-report.md` containing:
- Vite/React/TS versions installed (from package.json), and the versions of react-router-dom, framer-motion, zustand, vitest.
- The exact `npm run build` tail and `npm run test` result lines.
- Anything you changed beyond the steps (and why).
- Any deviation, warning, or follow-up the orchestrator should know.
- The commit hash (`git -C "<repo>" rev-parse --short HEAD`).
Keep it under ~40 lines. Do not paste full install logs.

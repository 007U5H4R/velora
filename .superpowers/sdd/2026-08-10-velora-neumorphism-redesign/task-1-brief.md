### Task 1: Design System page — variables + effect styles

**Files (Figma):** page "Design System" — 16 existing color variables; add 3 effect styles.
**Interfaces — Produces:** effect styles `neu/raised`, `neu/debossed`, `neu/raised-terracotta`; updated variable values (`surface/base`=EFE6D8 etc.) consumed by every later task.

- [ ] Step 1: Load `figma:figma-use` skill; `get_metadata` on Design System page to map variable IDs + existing component masters.
- [ ] Step 2: Via `use_figma`, update color variables: surface base cream→`EFE6D8`; keep terracotta/sage/gold/espresso as-is; retire dark-surface variables by repointing them to `EFE6D8` (do not delete — instances may reference them).
- [ ] Step 3: Create the 3 effect styles with exact values from Global Constraints:

```js
const raised = figma.createEffectStyle();
raised.name = 'neu/raised';
raised.effects = [
  {type:'DROP_SHADOW', color:{r:1,g:1,b:1,a:0.75}, offset:{x:-6,y:-6}, radius:14, spread:0, visible:true, blendMode:'NORMAL'},
  {type:'DROP_SHADOW', color:{r:0.788,g:0.706,b:0.604,a:0.5}, offset:{x:6,y:6}, radius:14, spread:0, visible:true, blendMode:'NORMAL'},
];
// analogous for neu/debossed (INNER_SHADOW pair) and neu/raised-terracotta (#A34428 = r:0.639,g:0.267,b:0.157)
```

- [ ] Step 4: Verify — read back `figma.getLocalEffectStyles()` names + screenshot a test rectangle with each style applied; delete the test rect.


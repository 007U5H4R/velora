### Task 11: Frames 06 + 06b — RFPs + Create RFP (TWO frames in this task)

**Interfaces — Consumes:** Task 2 (`illo/kurta`, `illo/thread-spools` — masters in section 53:2, native 360px), Task 3 (`btn/primary` 71:7, `input/well` 75:2, `chip/stat` 72:5, `nav/dock` 74:2, `btn/pillow` set 73:16, `toggle/role` 72:8).

- [ ] Step 1: Frame 06 (Buyer RFPs): canvas ivory; RFP cards → r28 `neu/raised` with an `illo/kurta` or `illo/thread-spools` instance accent (72px — use `instance.rescale(72/360)`, top-right of card); status chip embossed (chip/stat style); keep all existing RFP mock-data text. FAB = 64px terracotta pillow "+" (`neu/raised-terracotta`, bottom-right above dock). `nav/dock` instance if the original frame has bottom nav (RFPs/appropriate slot active).
- [ ] Step 2: Frame 06b (Create RFP): all form fields → `input/well` instances or well styling (`neu/debossed` r16, Inter floating label, keep existing field labels/values); quantity stepper = two 44px pillows (− / +) flanking a debossed count well; submit = `btn/primary` instance with existing CTA copy.
- [ ] Step 3: Verify screenshots of BOTH frames: wells read recessed, cards raised, illo accents not clipped (component shadows bleed past bounds — don't clip), no overflow.

### Task 10: Frame 05 — Buyer Matches

**Interfaces — Consumes:** Task 3 (`nav/dock` 74:2), Task 4 (`frame/mehrab` 81:2).

- [ ] Step 1: Canvas ivory. Rows → r20 raised cards (`neu/raised`): avatar in 48px mehrab-mini (rescale a `frame/mehrab` instance — native 120px wide, use `instance.rescale(48/120)`) or plain circle w/ 1px gold rim for matches; inbound-interest rows get a terracotta 8px dot indicator. Keep all existing mock-data text (names, messages, timestamps) — restyle only.
- [ ] Step 2: Debossed search well at top (`neu/debossed`, r16–20, Inter placeholder text in taupe).
- [ ] Step 3: Replace/restyle bottom nav with `nav/dock` instance (master 74:2), Matches slot active (44px debossed rounded-rect + terracotta icon); dock floats 12px off bottom, centered.
- [ ] Step 4: Verify screenshot: rows read as soft raised cards with breathing room, no shadow clipping, text contrast intact, nothing overflows frame bounds.

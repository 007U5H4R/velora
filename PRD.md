# Velora — Product Requirements Document

**A B2B apparel sourcing marketplace where fashion brands and garment manufacturers swipe to connect, and matches turn into bids.**

Status: Draft for sign-off · Date: 2026-08-10 · Owner: Tushar

---

## 1. Problem & Why It Matters

Sourcing production is the hardest, highest-trust decision an emerging apparel brand makes. Discovery today is broken: founders find manufacturers through cold referrals, trade fairs, or Alibaba-style directories where **trust is unverified and non-portable** — every new relationship starts from zero, and a factory's compliance, capacity, and delivery record live in silos. Meanwhile good manufacturers waste capacity chasing the wrong buyers.

Velora reframes sourcing as **mutual, verified, and lightweight** — a Bumble-style double opt-in where a brand and a factory both signal interest before anyone spends effort, and a **quantified, portable Trust Score** replaces guesswork. When both sides opt in (or a brand signals interest directly), the manufacturer submits a structured **bid** against a real sourcing request.

**Why now:** new-age D2C apparel founders expect consumer-grade product experiences and lead with ethics/sustainability — exactly the signals a portable trust layer can quantify (GOTS, OEKO-TEX, Sedex-SMETA, WRAP).

---

## 2. Target Users

| Persona | Who | Core need |
|---|---|---|
| **Brand (Buyer)** | Indie / D2C apparel founder sourcing production. Small MOQs, sustainability-led, design-forward, "new age." | Find a *trustworthy* factory fast; compare on verified compliance + delivery, not sales pitches. |
| **Manufacturer (Vendor)** | Garment factory / supplier (e.g. Tiruppur, Ludhiana, Bengaluru). | Reach the right brands, showcase verified capability, and win orders without cold outreach. |

---

## 3. Core Concept & Mechanics

### The swipe→match→bid loop
- **Brands swipe vendor Trust Cards.** **Manufacturers swipe brand RFP cards.**
- **Mutual right-swipe = a Match.** A Match unlocks connection for both sides.
- **Direct path (also supported):** a brand's like *on its own* surfaces to the manufacturer as an **inbound interest** they can act on — they don't have to wait for a mutual match to respond.
- Once connected (match *or* inbound interest), the **manufacturer submits a Bid** — always attached to an **RFP** (a concrete sourcing request to quote against).
- A brand with no RFP posted can still swipe/save vendors, but **a bid requires an RFP to exist**.

### Portable Trust (the differentiator)
Trust is quantified into a **Trust Score /100** built from four pillars, adapted to apparel:
- **Identity** — verified factory registration, GST/CIN, ownership, bank details.
- **Capability** — product categories, monthly capacity, MOQ, lead time, fabric/machinery, sampling, certifications.
- **Reputation** — on-time delivery %, reorder rate, dispute frequency, brands served, verifiable testimonials.
- **Continuous verification** — certs and registrations re-validated over time (certs expire; that's a trust signal).

---

## 4. Scope (In)

A **mobile-responsive React web app** with **hand-authored mock data (no backend)**, demo-ready in a browser at phone width. **11 screens** covering the full two-sided loop:

1. **Splash / Role select** — "I'm a Brand" / "I'm a Manufacturer" → straight into Discover (no auth).
2. **Buyer Discover** — swipe vendor Trust Cards (hero screen). Card shows: name, category, location, Verified badge, and 4 stats — ① Trust Score /100 (with gauge), ② Capability (categories + capacity/MOQ), ③ Compliance (cert badges), ④ On-time Delivery %. Actions: Pass / View Details / Save / Shortlist(like).
3. **Vendor Trust detail** — full Identity / Capability / Reputation / Continuous-verification breakdown.
4. **Match modal** — celebration; primary **"Submit Bid"**, secondary **"Message."**
5. **Buyer Matches** — list of matches + inbound interests.
6. **Buyer RFPs + Create RFP** — 3–4 pre-seeded RFPs + a working lightweight create form that adds to the list.
7. **Vendor Discover** — swipe brand RFP cards.
8. **Vendor Submit Bid** — structured form: price/unit, MOQ, lead time, sample offer, note; tied to an RFP.
9. **Bids received** — brand views incoming bids on an RFP.
10. **Chat** — lightweight message thread.
11. **Profile** — account details + persistent **role switch**.

**Navigation:** role-aware 5-tab bottom nav.

| Tab | Brand | Manufacturer |
|---|---|---|
| Discover | Swipe vendors | Swipe RFPs |
| Matches | Matches + inbound | Matches + brands who liked me |
| RFPs / Bids | My RFPs + create | My bids + status |
| Trust | Saved / shortlist | My trust profile |
| Profile | Account + role switch | Account + role switch |

**Mock data volume:** ~10 vendors + 4 RFPs, apparel-realistic (Indian sourcing hubs, cert badges, trust scores, capacity).

---

## 5. Scope (Out — explicitly not in this build)

- Real authentication / accounts / real backend or database.
- Real government-API verification (Trust Scores are authored, shown as if verified).
- Payments, contracts, escrow, order management.
- Real-time chat / push notifications (chat is a static demo thread).
- Native iOS/Android build or app-store packaging.
- ERP integration, live dashboards, renewal/risk monitoring (shown in vision, not built).
- 20+ catalog; multi-language; admin tooling.

---

## 6. Design Language

- **Feel:** premium, warm, editorial, community — not enterprise-cold. New-age consumer polish.
- **Palette (to be locked in build):** deep ink/charcoal base; **muted terracotta/clay** primary (apparel warmth + trust); bone/cream surfaces; **sage** accent reserved for Verified/Trust signals.
- **Interaction:** borrow Hinge's warmth — physical swipe feel, a rewarding match moment — without the dating color story.
- **Responsiveness (mandatory gate):** designed phone-first (~375px); no horizontal page scroll; nav reachable; readable without pinch-zoom. Verified at 375px and 768px.

---

## 7. Success Criteria (measurable)

The build is "done" when, in a browser at phone width:

1. A user can pick a role from the splash and land in the correct role's Discover.
2. **Brand path:** swipe ≥10 vendor cards (Pass/Shortlist), open a full Trust detail, trigger a Match modal, and reach Submit-Bid / Message from it.
3. **Brand RFPs:** view pre-seeded RFPs and create a new one that appears in the list.
4. **Vendor path:** swipe RFP cards, open an RFP, and submit a structured Bid tied to that RFP.
5. **Loop closes:** a submitted bid appears in the brand's "Bids received" for that RFP.
6. Role switch in Profile flips the whole app between Brand and Manufacturer experiences.
7. Chat thread opens from a match and renders a lightweight conversation.
8. **Responsiveness gate passes** at 375px and 768px — no horizontal scroll, nav usable, content readable.

---

## 8. Open Assumptions (flag if wrong)

- Buyer = indie/D2C founder (small MOQ, sustainability-led). *(confirmed)*
- Trust Scores, certs, and delivery stats are authored mock values presented as verified. *(confirmed — no real APIs)*
- Single-session demo; no data persists across reload beyond in-memory state. *(assumed)*
- Exact hex palette is my call within the stated direction. *(delegated)*

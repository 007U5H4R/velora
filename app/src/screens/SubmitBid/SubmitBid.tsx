import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Button } from '../../components/Button/Button';
import { useStore } from '../../state/store';
import { rfpDeck, brandRfps } from '../../data/rfps';
import { brands } from '../../data/brands';
import { bids } from '../../data/bids';
import { vendorDeck } from '../../data/vendors';
import type { Rfp } from '../../state/types';
import styles from './SubmitBid.module.css';

function fmtBudget(rfp: Rfp): string {
  return !rfp.budgetMin && !rfp.budgetMax ? 'TBD' : `₹${rfp.budgetMin}–₹${rfp.budgetMax}`;
}
function fmtShipShort(s: string): string {
  if (!s) return '—';
  return new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
function fmtINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

export function SubmitBid() {
  const { rfpId } = useParams();
  const nav = useNavigate();
  const submitBid = useStore((s) => s.submitBid);

  const rfp = [...rfpDeck, ...brandRfps].find((r) => r.id === rfpId);

  // Default the form from Loomcraft's existing seed bid on this RFP if present
  // (gives exact frame values for rfp-tees), else derive sensible defaults.
  const seedBid = rfp ? bids.find((b) => b.rfpId === rfp.id && b.vendorId === 'v-loomcraft') : undefined;
  const defPrice = seedBid?.pricePerUnit ?? (rfp ? Math.round((rfp.budgetMin + rfp.budgetMax) / 2) : 0);
  const defMoq = seedBid?.moq ?? rfp?.units ?? 0;
  const defLead = seedBid?.leadDays ?? 40;
  const defSample: 'free' | 'paid' | 'none' = seedBid?.sample ?? 'free';
  const defNote = seedBid?.note ?? '';

  // Hooks must run unconditionally on every render, so they're declared here
  // (with graceful 0/'' fallbacks) before the "not found" early return below.
  const [price, setPrice] = useState(defPrice);
  const [moq, setMoq] = useState(defMoq);
  const [lead, setLead] = useState(defLead);
  const [sample, setSample] = useState<'free' | 'paid' | 'none'>(defSample);
  const [note, setNote] = useState(defNote);

  if (!rfp) {
    return (
      <PhoneFrame>
        <div className={styles.screen}>
          <StatusBar />
          <p className={styles.missing}>RFP not found.</p>
        </div>
      </PhoneFrame>
    );
  }

  const brand = brands.find((b) => b.id === rfp.brandId)!;
  const loomcraft = vendorDeck.find((v) => v.id === 'v-loomcraft')!;
  const inRange = rfp.budgetMin <= price && price <= rfp.budgetMax;

  function onSend() {
    // rfp is non-null here (guarded by the early return above); TS narrowing doesn't
    // persist across this nested function boundary, hence the assertions.
    submitBid({ rfpId: rfp!.id, vendorId: 'v-loomcraft', pricePerUnit: price, moq, leadDays: lead, sample, note });
    nav(`/bids/${rfp!.id}`);
  }

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />

        <header className={styles.header}>
          <button className={styles.iconBtn} onClick={() => nav(-1)} aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <span className={styles.hTitle}>Submit your bid</span>
          <button className={styles.iconBtn} onClick={() => nav('/vendor-discover')} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <div className={styles.rfpCard}>
            <Avatar src={avatarUrl(brand.avatar)} name={brand.name} size={40} />
            <div className={styles.rfpText}>
              <p className={styles.rfpLine1}>{brand.name} · {rfp.units} units</p>
              <p className={styles.rfpLine2}>{rfp.title} · target {fmtBudget(rfp)}</p>
            </div>
            <span className={styles.shipPill}>{fmtShipShort(rfp.shipBy)}</span>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>YOUR PRICE PER UNIT</span>
            <div className={styles.priceWell}>
              <div className={styles.priceMain}>
                <span className={styles.currency}>₹</span>
                <input
                  type="number"
                  className={styles.priceInput}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  aria-label="Your price per unit"
                />
              </div>
              <div className={styles.priceRight}>
                {inRange
                  ? <span className={styles.inRange}><Check size={13} /> In range</span>
                  : <span className={styles.outRange}>Out of range</span>}
                <span className={styles.perUnit}>/unit</span>
              </div>
            </div>
          </div>

          <div className={styles.tilesRow}>
            <label className={styles.tileCol}>
              <span className={styles.label}>MOQ YOU FULFIL</span>
              <div className={styles.tile}>
                <input
                  type="number"
                  className={styles.tileInput}
                  value={moq}
                  onChange={(e) => setMoq(Number(e.target.value) || 0)}
                  aria-label="MOQ you fulfil"
                />
                <span className={styles.tileUnit}>units</span>
              </div>
            </label>
            <label className={styles.tileCol}>
              <span className={styles.label}>LEAD TIME</span>
              <div className={styles.tile}>
                <input
                  type="number"
                  className={styles.tileInput}
                  value={lead}
                  onChange={(e) => setLead(Number(e.target.value) || 0)}
                  aria-label="Lead time"
                />
                <span className={styles.tileUnit}>days</span>
              </div>
            </label>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>SAMPLE OFFER</span>
            <SegmentedControl
              className={styles.sampleControl}
              value={sample}
              onChange={(v) => setSample(v as 'free' | 'paid' | 'none')}
              segments={[
                { label: 'Free sample', value: 'free' },
                { label: 'Paid ₹500', value: 'paid' },
                { label: 'No sample', value: 'none' },
              ]}
            />
          </div>

          <label className={styles.section}>
            <span className={styles.label}>NOTE TO BRAND</span>
            <textarea
              className={styles.textarea}
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <div className={styles.trustNote}>
            <ShieldCheck size={18} className={styles.trustIcon} />
            <div>
              <p className={styles.trustLine1}>Your Trust Score {loomcraft.trustScore} travels with this bid</p>
              <p className={styles.trustLine2}>Verified identity, capacity &amp; delivery record</p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.totalBlock}>
            <span className={styles.totalLabel}>TOTAL BID</span>
            <span className={styles.totalValue}>{fmtINR(price * moq)}</span>
          </div>
          <Button variant="ember" onClick={onSend}>Send Bid <ArrowRight size={16} /></Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

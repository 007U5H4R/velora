import { Circle, BarChart3, Clock, ShieldCheck, Check, Sparkles } from 'lucide-react';
import type { Rfp } from '../../state/types';
import { Avatar } from '../Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../Gauge/Gauge';
import { brands } from '../../data/brands';
import styles from './RfpDeckCard.module.css';

function fmtBudget(rfp: Rfp): string {
  return !rfp.budgetMin && !rfp.budgetMax ? 'TBD' : `₹${rfp.budgetMin}–₹${rfp.budgetMax}`;
}
function fmtLakh(rfp: Rfp): string {
  const avg = Math.round((rfp.budgetMin + rfp.budgetMax) / 2);
  const total = rfp.units * avg;                 // tees: 210 * 500 = 105000
  return `~₹${(total / 100000).toFixed(1)}L total`; // → "~₹1.1L total"
}
function daysToShip(rfp: Rfp): number {
  if (!rfp.shipBy) return 0;
  const ms = new Date(rfp.shipBy + 'T00:00:00').getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}
function fmtShipShort(s: string): string {           // "2026-10-15" → "15 Oct"
  if (!s) return '—';
  return new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function RfpDeckCard({ rfp, animateGauge = true }: { rfp: Rfp; animateGauge?: boolean }) {
  const brand = brands.find((b) => b.id === rfp.brandId)!;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Avatar src={avatarUrl(brand.avatar)} name={brand.name} size={50} />
        <div className={styles.id}>
          <h3 className={styles.name}>{brand.name}</h3>
          <p className={styles.tagline}>{brand.tagline}</p>
          <p className={styles.meta}>{brand.onTimePct}% on-time · {brand.terms} honoured</p>
        </div>
        <Gauge score={brand.trustScore} variant="mini" size={50} animateOnMount={animateGauge} />
      </div>

      <div className={styles.grid}>
        <div className={styles.tile}>
          <div className={styles.tileHead}>
            <span className={styles.label}>Order</span>
            <Circle size={14} className={styles.iconMint} />
          </div>
          <div className={styles.bigRow}>
            <span className={styles.bigVal}>{rfp.units}</span>
            <span className={styles.bigUnit}>units</span>
          </div>
          <p className={styles.sub}>{rfp.title}</p>
        </div>

        <div className={styles.tile}>
          <div className={styles.tileHead}>
            <span className={styles.label}>Target budget</span>
            <BarChart3 size={14} className={styles.iconEmber} />
          </div>
          <div className={styles.bigRow}>
            <span className={styles.bigValGold}>{fmtBudget(rfp)}</span>
          </div>
          <p className={styles.sub}>per unit · {fmtLakh(rfp)}</p>
        </div>

        <div className={styles.tile}>
          <div className={styles.tileHead}>
            <span className={styles.label}>Timeline</span>
            <Clock size={14} className={styles.iconEmber} />
          </div>
          <div className={styles.bigRow}>
            <span className={styles.bigVal}>{daysToShip(rfp)}</span>
            <span className={styles.bigUnit}>days</span>
          </div>
          <p className={styles.sub}>Ship by {fmtShipShort(rfp.shipBy)}</p>
        </div>

        <div className={styles.tile}>
          <div className={styles.tileHead}>
            <span className={styles.label}>Requirements</span>
            <ShieldCheck size={14} className={styles.iconSage} />
          </div>
          <div className={styles.reqList}>
            {rfp.requirements.map((r) => (
              <div key={r} className={styles.reqRow}>
                <Check size={12} className={styles.iconSage} />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.matchesPill}>
        <Sparkles size={16} className={styles.iconEmber} />
        <span>Matches your capacity &amp; certs</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { AppBottomNav } from '../../components/BottomNav/AppBottomNav';
import { GarmentIcon, type GarmentName } from '../../components/icons/GarmentIcon';
import { useStore } from '../../state/store';
import type { Rfp } from '../../state/types';
import styles from './BuyerRFPs.module.css';

// Mockup shows "3 new" on the tees RFP; no data field for it, so encode the frame value.
const NEW_BIDS: Record<string, number> = { 'rfp-tees': 3 };

function garmentFor(rfp: Rfp): GarmentName {
  const s = `${rfp.category} ${rfp.title}`.toLowerCase();
  if (s.includes('tank')) return 'tank';
  if (s.includes('shirt')) return 'shirt';
  if (s.includes('denim') || s.includes('jean')) return 'denim';
  if (s.includes('woven')) return 'woven';
  if (s.includes('outer') || s.includes('hoodie') || s.includes('jacket')) return 'outer';
  return 'tshirt';
}
function fmtBudget(min: number, max: number): string {
  return !min && !max ? 'TBD' : `₹${min}–${max}`;
}
function fmtShip(s: string): string {
  if (!s) return '—';
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
  return s;
}

function RfpCard({ rfp }: { rfp: Rfp }) {
  const nav = useNavigate();
  const isDraft = rfp.status === 'draft';
  const newN = NEW_BIDS[rfp.id];
  return (
    <div className={styles.card}>
      <div className={styles.glyph}><GarmentIcon name={garmentFor(rfp)} size={64} /></div>
      <div className={styles.cardTop}>
        <div className={styles.cardLeft}>
          <span className={`${styles.status} ${isDraft ? styles.draft : styles.live}`}>
            <span className={styles.sdot} />{isDraft ? 'DRAFT' : 'LIVE'}
          </span>
          <div className={styles.titleRow}>
            <GarmentIcon name={garmentFor(rfp)} size={22} />
            <h3 className={styles.title}>{rfp.title}</h3>
          </div>
        </div>
        {isDraft ? (
          <button className={styles.finish} onClick={() => nav('/create-rfp')}>Finish setup <ArrowRight size={13} /></button>
        ) : (
          <div className={styles.bids}>
            <span className={styles.bidCount}>{rfp.bidIds.length} bids</span>
            {newN ? <span className={styles.bidNew}>{newN} new</span> : null}
          </div>
        )}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}><span className={styles.sval}>{rfp.units}</span><span className={styles.slabel}>UNITS</span></div>
        <div className={styles.stat}><span className={styles.sval}>{fmtBudget(rfp.budgetMin, rfp.budgetMax)}</span><span className={styles.slabel}>BUDGET</span></div>
        <div className={styles.stat}><span className={styles.sval}>{fmtShip(rfp.shipBy)}</span><span className={styles.slabel}>SHIP BY</span></div>
      </div>
    </div>
  );
}

export function BuyerRFPs() {
  const nav = useNavigate();
  const rfps = useStore((s) => s.rfps);
  const [tab, setTab] = useState('active');

  const byStatus = (st: Rfp['status']) => rfps.filter((r) => r.status === st);
  const counts = { active: byStatus('live').length, drafts: byStatus('draft').length, closed: byStatus('closed').length };
  const shown = tab === 'active' ? byStatus('live') : tab === 'drafts' ? byStatus('draft') : byStatus('closed');

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />
        <header className={styles.header}>
          <h1 className={styles.h1}>Your RFPs</h1>
          <button className={styles.newBtn} onClick={() => nav('/create-rfp')}><Plus size={16} /> New</button>
        </header>

        <div className={styles.filter}>
          <SegmentedControl value={tab} onChange={setTab} segments={[
            { label: 'Active', value: 'active', count: counts.active },
            { label: 'Drafts', value: 'drafts', count: counts.drafts },
            { label: 'Closed', value: 'closed' },
          ]} />
        </div>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>
          <div className={styles.list}>
            {shown.length ? shown.map((r) => <RfpCard key={r.id} rfp={r} />)
              : <p className={styles.empty}>No {tab} RFPs.</p>}
          </div>
        </div>

        <button className={styles.fab} onClick={() => nav('/create-rfp')} aria-label="Create RFP"><Plus size={26} /></button>
        <AppBottomNav activeId="rfps" badges={{ matches: 6 }} />
      </div>
    </PhoneFrame>
  );
}

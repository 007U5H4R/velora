import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowUpDown, ChevronDown, Sparkles, Clock } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../../components/Gauge/Gauge';
import { useStore } from '../../state/store';
import { brandRfps, rfpDeck } from '../../data/rfps';
import { vendors } from '../../data/vendors';
import type { Bid } from '../../state/types';
import styles from './BidsReceived.module.css';

function fmtINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}
function sampleLabel(s: 'free' | 'paid' | 'none'): string {
  return s === 'free' ? 'Free sample' : s === 'paid' ? 'Paid sample' : 'No sample';
}
// Module scope (not "top of component") so BidCard, a sibling function below, can call it too.
const vendorFor = (b: Bid) => vendors.find((v) => v.id === b.vendorId)!;

function BidCard({ bid, best }: { bid: Bid; best: boolean }) {
  const v = vendorFor(bid);
  const [accepted, setAccepted] = useState(false);

  return (
    <div className={`${styles.card} ${best ? styles.cardBest : ''}`}>
      {best && (
        <span className={styles.badge}>
          <Sparkles size={11} /> BEST MATCH
        </span>
      )}

      <div className={styles.identity}>
        <Avatar src={avatarUrl(v.avatar)} name={v.name} size={42} />
        <div className={styles.identityMid}>
          <p className={styles.name}>{v.name}</p>
          <p className={styles.sub}>{v.location.split(',')[0]} · {v.category.toLowerCase()}</p>
        </div>
        <Gauge score={v.trustScore} variant="mini" size={46} animateOnMount={false} />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>₹{bid.pricePerUnit}</span>
          <span className={styles.statLabel}>PRICE/UNIT</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{bid.leadDays}d</span>
          <span className={styles.statLabel}>LEAD</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.statValueEmber}`}>{fmtINR(bid.total)}</span>
          <span className={styles.statLabel}>TOTAL</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.sampleTag}>
          <Clock size={11} />
          <span className={styles.sampleText}>{sampleLabel(bid.sample)}</span>
        </span>
        <div className={styles.actions}>
          <button className={styles.viewBtn}>View</button>
          <button className={styles.acceptBtn} onClick={() => setAccepted(true)}>
            {accepted ? 'Accepted ✓' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BidsReceived() {
  const nav = useNavigate();
  const { rfpId = 'rfp-tees' } = useParams();
  const rfp = [...brandRfps, ...rfpDeck].find((r) => r.id === rfpId);
  // Rules of hooks: useStore must run unconditionally on every render, so it's called
  // here — before the "not found" early return below — same fix SubmitBid.tsx applies.
  const allBids = useStore((s) => s.bids);

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

  // Reading from store.bids (not rfp.bidIds) is deliberate: submitBid prepends, so the
  // just-submitted bid shows at the TOP — making swipe→match→bid loop-closure visible.
  const rfpBids = allBids.filter((b) => b.rfpId === rfpId);

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />

        <header className={styles.header}>
          <button className={styles.iconBtn} onClick={() => nav('/vendor-discover')} aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <span className={styles.hTitle}>Bids received</span>
          <button className={styles.iconBtn} aria-label="Sort">
            <ArrowUpDown size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <div className={styles.banner}>
            <div className={styles.bannerLeft}>
              <span className={styles.bannerLabel}>YOUR RFP</span>
              <p className={styles.bannerTitle}>{rfp.title} · {rfp.units} units</p>
            </div>
            <div className={styles.bannerRight}>
              <span className={styles.bannerCount}>{rfpBids.length}</span>
              <span className={styles.bannerCountLabel}>bids</span>
            </div>
          </div>

          <div className={styles.sortRow}>
            <span className={styles.sortLabel}>Sorted by</span>
            <button className={styles.sortPill}>
              Best match <ChevronDown size={11} />
            </button>
          </div>

          <div className={styles.list}>
            {rfpBids.length
              ? rfpBids.map((b, i) => <BidCard key={b.id} bid={b} best={i === 0} />)
              : <p className={styles.missing}>No bids yet.</p>}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { AppBottomNav } from '../../components/BottomNav/AppBottomNav';
import { useStore } from '../../state/store';
import { vendors } from '../../data/vendors';
import type { Match } from '../../state/types';
import styles from './BuyerMatches.module.css';

const STATUS: Record<Match['status'], { label: string; accent: boolean; arrow: boolean }> = {
  submit_bid: { label: 'Submit bid', accent: true, arrow: true },
  bid_received: { label: 'Bid received', accent: false, arrow: false },
  messaged: { label: 'Messaged', accent: false, arrow: false },
};

function MatchRow({ match }: { match: Match }) {
  const nav = useNavigate();
  const v = vendors.find((x) => x.id === match.withId);
  if (!v) return null;
  const st = STATUS[match.status];
  const showDot = match.status !== 'submit_bid';
  return (
    <button className={styles.row} onClick={() => nav(`/vendor/${v.id}`)}>
      <div className={styles.rowAv}>
        <Avatar src={avatarUrl(v.avatar)} name={v.name} size={48} />
        {showDot && <span className={styles.dot} aria-hidden />}
      </div>
      <div className={styles.rowMid}>
        <div className={styles.nameRow}>
          <span className={styles.nm}>{v.name}</span>
          <span className={styles.score}><ShieldCheck size={12} /> {v.trustScore}</span>
        </div>
        <div className={styles.meta}>{v.location.split(',')[0]} · {v.category}</div>
      </div>
      <div className={styles.right}>
        <span className={`${styles.pill} ${st.accent ? styles.pillAccent : ''}`}>
          {st.label}{st.arrow && <ArrowRight size={13} />}
        </span>
        <span className={styles.when}>{match.when}</span>
      </div>
    </button>
  );
}

export function BuyerMatches() {
  const nav = useNavigate();
  const matches = useStore((s) => s.matches);
  const inboundLikes = useStore((s) => s.inboundLikes);
  const [q, setQ] = useState('');

  const query = q.trim().toLowerCase();
  const shown = matches.filter((m) => {
    const v = vendors.find((x) => x.id === m.withId);
    if (!v) return false;
    return !query || `${v.name} ${v.category} ${v.location}`.toLowerCase().includes(query);
  });

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />
        <header className={styles.header}>
          <h1 className={styles.title}>Matches</h1>
          <button className={styles.iconBtn} aria-label="Sort"><ArrowUpDown size={18} /></button>
        </header>

        <div className={styles.search}>
          <Search size={16} className={styles.searchIcon} />
          <input className={styles.searchInput} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search vendors, category, city" />
        </div>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <div className={styles.likedHead}>
            <span className={styles.sectionLabel}>Liked you · vendors waiting</span>
            <button className={styles.seeAll}>See all <ArrowRight size={13} /></button>
          </div>
          <div className={styles.inbound}>
            {inboundLikes.map((l) => {
              const v = vendors.find((x) => x.id === l.withId);
              if (!v) return null;
              return (
                <button key={l.id} className={styles.inbAv} onClick={() => nav(`/vendor/${v.id}`)}>
                  <Avatar src={avatarUrl(v.avatar)} name={v.name} size={58} />
                  <span className={styles.inbName}>{v.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.matchesHead}><span className={styles.sectionLabel}>Your matches</span></div>
          <div className={styles.list}>
            {shown.map((m) => <MatchRow key={m.id} match={m} />)}
          </div>
        </div>

        <AppBottomNav activeId="matches" badges={{ matches: 6 }} />
      </div>
    </PhoneFrame>
  );
}

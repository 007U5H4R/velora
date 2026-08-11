import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, Star, Check } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { SwipeDeck, Pagination, type SwipeDeckHandle } from '../../motion/SwipeDeck';
import { RfpDeckCard } from '../../components/RfpDeckCard/RfpDeckCard';
import { PillowButton } from '../../components/Button/Button';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import { manufacturerNav } from '../../components/BottomNav/navItems';
import { useStore } from '../../state/store';
import styles from './VendorDiscover.module.css';

export function VendorDiscover() {
  const nav = useNavigate();
  const deckRef = useRef<SwipeDeckHandle>(null);
  const [seg, setSeg] = useState('rfps');

  const deck = useStore((s) => s.rfpDeck);
  const index = useStore((s) => s.rfpIndex);
  const swipeRfp = useStore((s) => s.swipeRfp);
  const toggleSave = useStore((s) => s.toggleSave);
  const saved = useStore((s) => s.saved);

  const top = deck[index];
  const isSaved = top ? saved.includes(top.id) : false;

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />

        <header className={styles.topbar}>
          <div className={styles.brand}>
            <span className={styles.orb} aria-hidden />
            <span className={styles.word}>Velora</span>
          </div>
          <SegmentedControl value={seg} onChange={setSeg}
            segments={[{ label: 'Open RFPs', value: 'rfps' }, { label: 'Brands', value: 'brands' }]} />
          <Avatar src={avatarUrl('loomcraft')} name="Loomcraft" size={34} />
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          {top ? (
            <>
              <div className={styles.deckWrap}>
                <SwipeDeck ref={deckRef} items={deck} index={index} keyOf={(r) => r.id}
                  renderCard={(r, isTop) => <RfpDeckCard rfp={r} animateGauge={isTop} />}
                  onSwipe={(dir) => swipeRfp(dir)} />
              </div>
              <Pagination count={deck.length} active={index} />
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>You're all caught up</p>
              <p className={styles.emptySub}>Check back for new open RFPs.</p>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <PillowButton color="red" icon={<X />} label="Pass"
            onClick={() => deckRef.current?.swipe('pass')} />
          <PillowButton color="blue" icon={<Eye />} label="Details"
            onClick={() => { if (top) nav(`/submit-bid/${top.id}`); }} />
          <PillowButton color="amber" icon={<Star />} label={isSaved ? 'Saved' : 'Save'}
            onClick={() => { if (top) toggleSave(top.id); }} />
          <div className={styles.primaryPillow}>
            <PillowButton color="mint" icon={<Check />} label="Shortlist"
              onClick={() => { if (top) nav(`/submit-bid/${top.id}`); }} />
          </div>
        </div>

        <BottomNav items={manufacturerNav} activeId="discover" badges={{ matches: 6 }}
          onNavigate={() => { /* other tabs wired in later phases */ }} />
      </div>
    </PhoneFrame>
  );
}

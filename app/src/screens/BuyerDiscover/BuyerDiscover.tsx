import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, Star, Check, Sparkles } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { SwipeDeck, Pagination, type SwipeDeckHandle } from '../../motion/SwipeDeck';
import { TrustCard } from '../../components/TrustCard/TrustCard';
import { Chip } from '../../components/Chip/Chip';
import { PillowButton } from '../../components/Button/Button';
import { AppBottomNav } from '../../components/BottomNav/AppBottomNav';
import { MatchOverlay } from '../Match/Match';
import { useStore } from '../../state/store';
import { noor } from '../../data/brands';
import styles from './BuyerDiscover.module.css';

export function BuyerDiscover() {
  const nav = useNavigate();
  const deckRef = useRef<SwipeDeckHandle>(null);
  const [seg, setSeg] = useState('vendors');

  const deck = useStore((s) => s.vendorDeck);
  const index = useStore((s) => s.vendorIndex);
  const swipeVendor = useStore((s) => s.swipeVendor);
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
            segments={[{ label: 'Vendors', value: 'vendors' }, { label: 'RFPs', value: 'rfps' }]} />
          <Avatar src={avatarUrl(noor.avatar)} name={noor.name} size={34} />
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          {top ? (
            <>
              <div className={styles.deckWrap}>
                <SwipeDeck ref={deckRef} items={deck} index={index} keyOf={(v) => v.id}
                  renderCard={(v, isTop) => <TrustCard vendor={v} animateGauge={isTop} />}
                  onSwipe={(dir) => swipeVendor(dir)} />
              </div>
              <Pagination count={deck.length} active={index} />
              <Chip icon={<Sparkles />}>Similar to your best supplier</Chip>
            </>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>You're all caught up</p>
              <p className={styles.emptySub}>Check back for new verified suppliers.</p>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <PillowButton color="red" icon={<X />} label="Pass"
            onClick={() => deckRef.current?.swipe('pass')} />
          <PillowButton color="blue" icon={<Eye />} label="Details"
            onClick={() => { if (top) nav(`/vendor/${top.id}`); }} />
          <PillowButton color="amber" icon={<Star />} label={isSaved ? 'Saved' : 'Save'}
            onClick={() => { if (top) toggleSave(top.id); }} />
          <div className={styles.primaryPillow}>
            <PillowButton color="mint" icon={<Check />} label="Shortlist"
              onClick={() => deckRef.current?.swipe('like')} />
          </div>
        </div>

        <AppBottomNav activeId="discover" badges={{ matches: 6 }} />
      </div>

      <MatchOverlay />
    </PhoneFrame>
  );
}

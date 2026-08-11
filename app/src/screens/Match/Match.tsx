import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';
import { Shirt } from 'lucide-react';
import { useStore } from '../../state/store';
import { noor } from '../../data/brands';
import { rfpTees } from '../../data/rfps';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../../components/Gauge/Gauge';
import { Button } from '../../components/Button/Button';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import type { Vendor } from '../../state/types';
import styles from './Match.module.css';
import handshakeMp4 from '../../assets/celebration/handshake.mp4';
import handshakeStill from '../../assets/celebration/handshake_still.png';
import confetti from '../../assets/celebration/confetti.gif';
import flowerRain from '../../assets/celebration/flower-rain.gif';

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Match({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  // prefers-reduced-motion: collapse the choreographed entrance (delays, scale pops,
  // spring) into a plain quick fade, drop the decorative confetti/flower motion, and
  // hold the handshake on its poster still instead of autoplaying.
  const reduced = useReducedMotion();
  const enter = (initial: TargetAndTransition, transition: Transition) =>
    reduced
      ? { initial: { opacity: 0 } as TargetAndTransition, transition: { duration: 0.2 } as Transition }
      : { initial, transition };

  return (
    <motion.div className={styles.backdrop}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      onClick={onClose}>
      {/* confetti + flower-rain overlays (decorative, non-interactive) */}
      {!reduced && <img src={confetti} alt="" aria-hidden className={styles.confetti} />}
      {!reduced && <img src={flowerRain} alt="" aria-hidden className={styles.flowers} />}

      <motion.div className={styles.card} onClick={(e) => e.stopPropagation()}
        {...enter({ opacity: 0, scale: 0.92, y: 16 }, { duration: 0.4, ease })}
        animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}>
        <div className={styles.mandalaWrap}><MandalaBg style={{ opacity: 0.22, width: 300 }} /></div>

        <motion.h1 className={styles.title}
          {...enter({ opacity: 0, y: 12 }, { delay: 0.1, duration: 0.4, ease })}
          animate={{ opacity: 1, y: 0 }}>
          It's a Match
        </motion.h1>
        <motion.p className={styles.subtitle}
          {...enter({ opacity: 0 }, { delay: 0.2, duration: 0.4 })}
          animate={{ opacity: 1 }}>
          You and {vendor.name} both want in.<br />Time to talk numbers.
        </motion.p>

        <div className={styles.medallions}>
          {[{ n: noor.name, a: 'noor' }, { n: vendor.name, a: vendor.avatar }].map((m, i) => (
            <motion.div key={m.n} className={styles.medallion} style={{ marginLeft: i === 1 ? -16 : 0, zIndex: 2 - i }}
              {...enter({ scale: 0, rotate: -8 }, { delay: 0.28 + i * 0.1, type: 'spring', stiffness: 340, damping: 16 })}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}>
              <Avatar src={avatarUrl(m.a)} name={m.n} size={76} />
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.handshake}
          {...enter({ opacity: 0, scale: 0.8 }, { delay: 0.5, duration: 0.45, ease })}
          animate={{ opacity: 1, scale: 1 }}>
          <video className={styles.video} src={handshakeMp4} poster={handshakeStill}
            autoPlay={!reduced} muted playsInline loop />
        </motion.div>

        <motion.div className={styles.pills}
          {...enter({ opacity: 0, y: 14 }, { delay: 0.62, duration: 0.4, ease })}
          animate={{ opacity: 1, y: 0 }}>
          <div className={styles.pill}>
            <Avatar src={avatarUrl('noor')} name={noor.name} size={30} />
            <span className={styles.pillName}>{noor.name}</span>
            <Gauge score={noor.trustScore} variant="mini" size={34} animateOnMount={false} />
          </div>
          <div className={styles.pill}>
            <Avatar src={avatarUrl(vendor.avatar)} name={vendor.name} size={30} />
            <span className={styles.pillName}>{vendor.name}</span>
            <Gauge score={vendor.trustScore} variant="mini" size={34} animateOnMount={false} />
          </div>
        </motion.div>

        <motion.div className={styles.rfp}
          {...enter({ opacity: 0, y: 14 }, { delay: 0.72, duration: 0.4, ease })}
          animate={{ opacity: 1, y: 0 }}>
          <span className={styles.rfpIcon}><Shirt /></span>
          <div>
            <div className={styles.rfpLabel}>MATCHED ON YOUR RFP</div>
            <div className={styles.rfpValue}>{rfpTees.units} units · {rfpTees.title}</div>
          </div>
        </motion.div>

        <motion.div className={styles.ctas}
          {...enter({ opacity: 0, y: 16 }, { delay: 0.82, duration: 0.4, ease })}
          animate={{ opacity: 1, y: 0 }}>
          {/* Phase 2 placeholder: both dismiss. Phase 4/5 wire Submit Bid → /submit-bid, message → /chat. */}
          <Button variant="ember" block onClick={onClose}>Submit Bid</Button>
          <Button variant="secondary" block className={styles.msgBtn} onClick={onClose}>Send a message first</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function MatchOverlay() {
  const activeMatch = useStore((s) => s.activeMatch);
  const closeMatch = useStore((s) => s.closeMatch);
  return (
    <AnimatePresence>
      {activeMatch && <Match key="match" vendor={activeMatch} onClose={closeMatch} />}
    </AnimatePresence>
  );
}

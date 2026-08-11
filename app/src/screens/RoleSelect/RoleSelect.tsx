import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { useStore } from '../../state/store';
import type { Role } from '../../state/types';
import mandala from '../../assets/mandala-motif.png';
import brandGif from '../../assets/role-select/brand.gif';
import brandStill from '../../assets/role-select/brand_still.png';
import mfgGif from '../../assets/role-select/manufacturer.gif';
import mfgStill from '../../assets/role-select/manufacturer_still.png';
import styles from './RoleSelect.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

interface RoleCardData {
  role: Role;
  gif: string;
  still: string;
  title: string;
  subtitle: string;
}

const cards: RoleCardData[] = [
  {
    role: 'brand',
    gif: brandGif,
    still: brandStill,
    title: "I'm a Brand",
    subtitle: 'Discover verified factories that fit your values',
  },
  {
    role: 'manufacturer',
    gif: mfgGif,
    still: mfgStill,
    title: "I'm a Manufacturer",
    subtitle: 'Meet the brands looking for exactly what you make',
  },
];

// Screen 01 · Role Select (Figma 3:4) — pre-auth entry point. Picking a role SETS it
// (not toggles — that's switchRole, still used by Profile) and lands in that role's
// Discover deck. No BottomNav here by design (pre-auth).
export function RoleSelect() {
  const nav = useNavigate();
  const setRole = useStore((s) => s.setRole);
  const reduced = useReducedMotion();

  const choose = (role: Role) => {
    setRole(role);
    nav('/discover');
  };

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <div className={styles.topBar}>
          <StatusBar />
        </div>
        <img src={mandala} alt="" aria-hidden="true" className={styles.mandala} />

        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.wordmark}>Velora</span>
            <span className={styles.hairline} aria-hidden="true" />
          </div>

          <h1 className={styles.headline}>Where brands and makers find their fit.</h1>
          <p className={styles.subhead}>Trust-first apparel sourcing — swipe, match, bid.</p>

          <div className={styles.cards}>
            {cards.map((c, i) => (
              <motion.div
                key={c.role}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={reduced ? false : { opacity: 1, y: 0 }}
                transition={reduced ? undefined : { duration: 0.32, ease, delay: 0.08 * i }}
              >
                <button type="button" className={styles.card} onClick={() => choose(c.role)}>
                  <span className={styles.illoWrap}>
                    <img
                      src={reduced ? c.still : c.gif}
                      alt=""
                      aria-hidden="true"
                      className={styles.illo}
                    />
                  </span>
                  <span className={styles.cardTitle}>{c.title}</span>
                  <span className={styles.cardSubtitle}>{c.subtitle}</span>
                </button>
              </motion.div>
            ))}
          </div>

          <div className={styles.footer}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.footerText}>Every profile verified by portable trust</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

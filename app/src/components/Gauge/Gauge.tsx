import { useEffect, useId } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import styles from './Gauge.module.css';

function band(score: number): [string, string] {
  if (score >= 85) return ['var(--mint-a)', 'var(--mint-b)'];
  if (score >= 70) return ['var(--amber-a)', 'var(--amber-b)'];
  return ['var(--red-a)', 'var(--red-b)'];
}

export function Gauge(
  { score, max = 100, size = 120, variant = 'hero', showMax, animateOnMount = true }:
  { score: number; max?: number; size?: number; variant?: 'hero' | 'mini'; showMax?: boolean; animateOnMount?: boolean },
) {
  const reduced = useReducedMotion();
  const gid = useId().replace(/[:]/g, '');
  const R = 52, C = 2 * Math.PI * R;                 // viewBox is 120×120
  const target = C * (1 - Math.min(score, max) / max);
  const stroke = variant === 'mini' ? 9 : 8;
  const [a, b] = band(score);
  const showSlash = showMax ?? variant === 'hero';

  const count = useMotionValue(animateOnMount && !reduced ? 0 : score);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    if (reduced || !animateOnMount) { count.set(score); return; }
    const controls = animate(count, score, { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] });
    return () => controls.stop();
  }, [score, reduced, animateOnMount]);

  return (
    <div className={`${styles.gauge} ${styles[variant]}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className={styles.svg}>
        <defs>
          <linearGradient id={`g-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: a }} />
            <stop offset="100%" style={{ stopColor: b }} />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={stroke} />
        <motion.circle
          cx="60" cy="60" r={R} fill="none" stroke={`url(#g-${gid})`} strokeWidth={stroke} strokeLinecap="round"
          transform="rotate(-90 60 60)" strokeDasharray={C}
          initial={{ strokeDashoffset: animateOnMount && !reduced ? C : target }}
          animate={{ strokeDashoffset: target }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </svg>
      <div className={styles.center}>
        <motion.span className={styles.num} style={{ fontSize: size * (variant === 'mini' ? 0.34 : 0.3) }}>{rounded}</motion.span>
        {showSlash && <span className={styles.max}>/ {max}</span>}
      </div>
    </div>
  );
}

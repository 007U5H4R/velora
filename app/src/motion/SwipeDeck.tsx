import { forwardRef, useImperativeHandle, useRef, type Ref, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import styles from './SwipeDeck.module.css';

export interface SwipeDeckHandle {
  swipe(dir: 'pass' | 'like'): void;
}

export interface SwipeDeckProps<T> {
  items: T[];
  index: number; // current top-card index (owned by the store)
  keyOf: (item: T) => string; // stable key
  renderCard: (item: T, isTop: boolean) => ReactNode;
  onSwipe: (dir: 'pass' | 'like', item: T) => void; // called AFTER the fling completes
  threshold?: number; // px, default 110
}

// framer-motion 13 does not re-export `PanInfo` from its type entry, so we type
// the drag-end info locally — we only read `offset`/`velocity`. (See task report.)
interface DragInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface CardHandle {
  fling(dir: 'pass' | 'like'): void;
}

const FLING_X = 640; // off-screen distance
const VELOCITY_FLING = 600; // px/s flick threshold

const SwipeCard = forwardRef(function SwipeCard(
  {
    children,
    onDecided,
    threshold,
  }: { children: ReactNode; onDecided: (d: 'pass' | 'like') => void; threshold: number },
  ref: Ref<CardHandle>,
) {
  const reduced = useReducedMotion();
  // We own x/y/opacity as MotionValues: drag writes to them, `style` renders them,
  // and fling/snap animate them imperatively via `animate(value, target)` — the same
  // pattern the Gauge component uses. Driving the owned values directly avoids any
  // ambiguity between a style-bound MotionValue and an `animate`/controls target.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);
  const rotate = useTransform(x, [-200, 0, 200], reduced ? [0, 0, 0] : [-15, 0, 15]);
  // Faint LIKE / PASS stamps that fade in with drag distance.
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const passOpacity = useTransform(x, [-140, -40], [1, 0]);

  const fling = (dir: 'pass' | 'like') => {
    const t = { duration: reduced ? 0.2 : 0.34, ease: 'easeOut' as const };
    if (!reduced) animate(y, 28, t);
    animate(opacity, 0, t);
    animate(x, dir === 'like' ? FLING_X : -FLING_X, { ...t, onComplete: () => onDecided(dir) });
  };
  useImperativeHandle(ref, () => ({ fling }));

  const snapBack = () => {
    const t = reduced
      ? { duration: 0.16, ease: 'easeOut' as const }
      : { type: 'spring' as const, stiffness: 460, damping: 34 };
    animate(x, 0, t);
    animate(y, 0, t);
  };

  const onDragEnd = (_: unknown, info: DragInfo) => {
    if (info.offset.x > threshold || info.velocity.x > VELOCITY_FLING) fling('like');
    else if (info.offset.x < -threshold || info.velocity.x < -VELOCITY_FLING) fling('pass');
    else snapBack();
  };

  return (
    <motion.div
      className={styles.top}
      style={{ x, y, opacity, rotate }}
      drag
      dragElastic={0.5}
      dragSnapToOrigin={false}
      onDragEnd={onDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.span
        className={`${styles.hint} ${styles.like}`}
        style={{ opacity: likeOpacity }}
        aria-hidden
      >
        Shortlist
      </motion.span>
      <motion.span
        className={`${styles.hint} ${styles.pass}`}
        style={{ opacity: passOpacity }}
        aria-hidden
      >
        Pass
      </motion.span>
      {children}
    </motion.div>
  );
});

function SwipeDeckInner<T>(
  { items, index, keyOf, renderCard, onSwipe, threshold = 110 }: SwipeDeckProps<T>,
  ref: Ref<SwipeDeckHandle>,
) {
  const topRef = useRef<CardHandle>(null);
  useImperativeHandle(ref, () => ({ swipe: (dir) => topRef.current?.fling(dir) }));

  const top = items[index];
  // index+1 / index+2 sit behind; keys stay stable so they rise/scale as the deck advances.
  const peeks = [items[index + 1], items[index + 2]].filter(Boolean) as T[];

  return (
    <div className={styles.deck}>
      {peeks.map((it, i) => (
        <motion.div
          key={keyOf(it)}
          className={styles.peek}
          initial={false}
          animate={{ scale: 1 - (i + 1) * 0.05, y: (i + 1) * 14, opacity: 1 - (i + 1) * 0.14 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ zIndex: 10 - (i + 1) }}
        >
          {renderCard(it, false)}
        </motion.div>
      ))}
      {top && (
        <SwipeCard
          key={keyOf(top)}
          ref={topRef}
          threshold={threshold}
          onDecided={(dir) => onSwipe(dir, top)}
        >
          {renderCard(top, true)}
        </SwipeCard>
      )}
    </div>
  );
}

// forwardRef erases the generic; re-assert the public generic signature via cast.
export const SwipeDeck = forwardRef(SwipeDeckInner) as <T>(
  p: SwipeDeckProps<T> & { ref?: Ref<SwipeDeckHandle> },
) => ReturnType<typeof SwipeDeckInner>;

export function Pagination({ count, active }: { count: number; active: number }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`${styles.dot} ${i === active ? styles.dotOn : ''}`} />
      ))}
    </div>
  );
}

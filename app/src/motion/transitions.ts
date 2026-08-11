import type { Transition, Variants } from 'framer-motion';

// Subtle page enter: fade + 8px rise. Exit is intentionally omitted (see brief guardrail).
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0 },
};
export const pageTransition: Transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }; // easeOutQuint-ish

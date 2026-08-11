import { useLocation, useOutlet } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { pageVariants, pageTransition } from './transitions';

export function RootLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduced = useReducedMotion();

  // Keying by pathname replays initial→enter on every navigation. No AnimatePresence exit,
  // so the router can never be left waiting on an exit animation. Reduced-motion = instant.
  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial={reduced ? false : 'initial'}
      animate={reduced ? false : 'enter'}
      transition={reduced ? { duration: 0 } : pageTransition}
      style={{ height: '100%' }}
    >
      {outlet}
    </motion.div>
  );
}

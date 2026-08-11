import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.bezel}>
        <div className={styles.screen}>{children}</div>
      </div>
    </div>
  );
}

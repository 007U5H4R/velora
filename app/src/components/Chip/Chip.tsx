import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export function Chip(
  { icon, children, tone = 'default', className }:
  { icon?: ReactNode; children: ReactNode; tone?: 'default' | 'gold'; className?: string },
) {
  return (
    <span className={`${styles.chip} ${tone === 'gold' ? styles.gold : ''} ${className ?? ''}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}

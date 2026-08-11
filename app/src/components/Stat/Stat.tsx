import type { ReactNode } from 'react';
import styles from './Stat.module.css';

export function Stat(
  { label, value, unit, icon, className }:
  { label: string; value: ReactNode; unit?: string; icon?: ReactNode; className?: string },
) {
  return (
    <div className={`${styles.stat} ${className ?? ''}`}>
      <div className={styles.top}>{icon && <span className={styles.icon}>{icon}</span>}<span className={styles.label}>{label}</span></div>
      <div className={styles.value}>{value}{unit && <span className={styles.unit}>{unit}</span>}</div>
    </div>
  );
}

export function StatGroup({ children }: { children: ReactNode }) {
  return <div className={styles.group}>{children}</div>;
}

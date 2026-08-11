import styles from './StatusBar.module.css';

export function StatusBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.time}>9:41</span>
      <span className={styles.right}>
        <span className={styles.pct}>100%</span>
        <svg width="24" height="12" viewBox="0 0 24 12" aria-hidden="true" className={styles.batt}>
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.5"/>
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor"/>
          <rect x="21.5" y="4" width="1.8" height="4" rx="0.9" fill="currentColor" fillOpacity="0.5"/>
        </svg>
      </span>
    </div>
  );
}

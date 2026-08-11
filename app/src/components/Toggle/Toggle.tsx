import styles from './Toggle.module.css';

export function Toggle(
  { checked, onChange, ariaLabel }:
  { checked: boolean; onChange: (v: boolean) => void; ariaLabel?: string },
) {
  return (
    <button
      role="switch" aria-checked={checked} aria-label={ariaLabel}
      className={`${styles.track} ${checked ? styles.on : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.thumb} />
    </button>
  );
}

import styles from './CertBadge.module.css';
import badge from '../../assets/cert-badge-gold.png';

export function CertBadge({ label, size = 48 }: { label: string; size?: number }) {
  return (
    <div className={styles.wrap}>
      <img className={styles.badge} src={badge} alt="" style={{ width: size, height: size }} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

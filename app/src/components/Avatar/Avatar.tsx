import styles from './Avatar.module.css';

export function Avatar(
  { src, name, size = 64, className }:
  { src?: string; name: string; size?: number; className?: string },
) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div className={`${styles.avatar} ${className ?? ''}`} style={{ width: size, height: size }}>
      {src
        ? <img className={styles.img} src={src} alt={name} />
        : <span className={styles.initials} style={{ fontSize: size * 0.36 }}>{initials}</span>}
    </div>
  );
}

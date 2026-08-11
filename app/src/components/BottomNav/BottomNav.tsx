import type { NavItem } from './navItems';
import styles from './BottomNav.module.css';

export function BottomNav(
  { items, activeId, badges, onNavigate }:
  { items: NavItem[]; activeId: string; badges?: Record<string, number>; onNavigate?: (id: string, to: string) => void },
) {
  return (
    <nav className={styles.dock}>
      {items.map((it) => {
        const active = it.id === activeId;
        const badge = badges?.[it.id];
        return (
          <button key={it.id} className={`${styles.tile} ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined} onClick={() => onNavigate?.(it.id, it.to)}>
            <span className={styles.iconWrap}>
              {it.icon}
              {badge ? <span className={styles.badge}>{badge}</span> : null}
            </span>
            <span className={styles.label}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

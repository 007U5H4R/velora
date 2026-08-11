import styles from './SegmentedControl.module.css';

export interface Segment { label: string; value: string; count?: number; }

export function SegmentedControl(
  { segments, value, onChange, className }:
  { segments: Segment[]; value: string; onChange: (v: string) => void; className?: string },
) {
  return (
    <div className={`${styles.track} ${className ?? ''}`} role="tablist">
      {segments.map((s) => {
        const active = s.value === value;
        return (
          <button
            key={s.value} role="tab" aria-selected={active}
            className={`${styles.seg} ${active ? `${styles.active} sh-cta` : ''}`}
            onClick={() => onChange(s.value)}
          >
            {s.label}
            {s.count != null && <span className={styles.count}> · {s.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

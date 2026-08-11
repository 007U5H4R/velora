import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type PillowColor = 'red' | 'blue' | 'amber' | 'mint';

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ember' | 'secondary';
  shape?: 'pill' | 'rect';   // pill (default) = 999px; rect = 16px (card buttons)
  block?: boolean;           // full-width
  children?: ReactNode;
}
export function Button({ variant = 'ember', shape = 'pill', block, className, children, ...rest }: BaseProps) {
  const cls = [
    styles.btn,
    variant === 'ember' ? styles.ember : styles.secondary,
    shape === 'rect' ? styles.rect : styles.pill,
    block ? styles.block : '',
    variant === 'ember' ? 'sh-cta' : '',
    className ?? '',
  ].join(' ');
  return <button className={cls} {...rest}>{children}</button>;
}

export function PillowButton(
  { color, icon, label, ...rest }:
  { color: PillowColor; icon: ReactNode; label: string } & ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <div className={styles.pillowWrap}>
      <button className={`${styles.pillow} ${styles[color]} sh-cta`} aria-label={label} {...rest}>
        {icon}
      </button>
      <span className={styles.pillowLabel}>{label}</span>
    </div>
  );
}

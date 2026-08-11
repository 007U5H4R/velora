import type { CSSProperties } from 'react';
import styles from './MandalaBg.module.css';
import mandala from '../../assets/mandala-gold.png';

export function MandalaBg({ style, className }: { style?: CSSProperties; className?: string }) {
  return <img src={mandala} alt="" aria-hidden="true" className={`${styles.mandala} ${className ?? ''}`} style={style} />;
}

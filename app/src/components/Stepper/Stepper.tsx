import { Minus, Plus } from 'lucide-react';
import styles from './Stepper.module.css';

export function Stepper(
  { value, onChange, step = 1, min = 0, max = Infinity }:
  { value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number },
) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div className={styles.stepper}>
      <button className={styles.btn} onClick={() => onChange(clamp(value - step))} aria-label="decrease"><Minus /></button>
      <span className={styles.value}>{value}</span>
      <button className={styles.btn} onClick={() => onChange(clamp(value + step))} aria-label="increase"><Plus /></button>
    </div>
  );
}

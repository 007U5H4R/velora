import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, Plus, Clock } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Stepper } from '../../components/Stepper/Stepper';
import { Button } from '../../components/Button/Button';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { GarmentIcon, type GarmentName } from '../../components/icons/GarmentIcon';
import { useStore } from '../../state/store';
import styles from './CreateRFP.module.css';

const CATEGORIES: { id: string; label: string; icon: GarmentName }[] = [
  { id: 'tees', label: 'Tees & knits', icon: 'tshirt' },
  { id: 'shirts', label: 'Shirts', icon: 'shirt' },
  { id: 'woven', label: 'Woven', icon: 'woven' },
  { id: 'denim', label: 'Denim', icon: 'denim' },
  { id: 'outer', label: 'Outerwear', icon: 'outer' },
];
const ALL_REQS = ['GOTS certified', 'Pre-prod sample', 'Net 30', 'SMETA'];

export function CreateRFP() {
  const nav = useNavigate();
  const createRfp = useStore((s) => s.createRfp);

  const [title, setTitle] = useState('Organic Cotton Tees');
  const [cat, setCat] = useState('tees');
  const [units, setUnits] = useState(500);
  const [budget, setBudget] = useState('₹180–240');
  const [shipBy, setShipBy] = useState('15 October 2026');
  const [reqs, setReqs] = useState<string[]>(['GOTS certified', 'Pre-prod sample', 'Net 30']);

  const toggleReq = (r: string) =>
    setReqs((cur) => (cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r]));

  const post = () => {
    const nums = budget.match(/\d+/g)?.map(Number) ?? [];
    const budgetMin = nums[0] ?? 0;
    const budgetMax = nums[1] ?? budgetMin;
    const category = CATEGORIES.find((c) => c.id === cat)?.label ?? 'Tees & knits';
    createRfp({ title, category, units, budgetMin, budgetMax, shipBy, requirements: reqs });
    nav('/rfps');
  };

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />
        <header className={styles.header}>
          <button className={styles.iconBtn} onClick={() => nav(-1)} aria-label="Close"><X size={18} /></button>
          <span className={styles.hTitle}>New RFP</span>
          <button className={styles.saveDraft} onClick={() => { /* Phase 6 */ }}>Save draft</button>
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <label className={styles.section}>
            <span className={styles.label}>WHAT ARE YOU SOURCING?</span>
            <input className={`${styles.field} ${styles.fieldDisplay}`} value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className={styles.section}>
            <span className={styles.label}>CATEGORY</span>
            <div className={styles.chips}>
              {CATEGORIES.map((c) => (
                <button key={c.id} type="button"
                  className={`${styles.catChip} ${cat === c.id ? styles.catOn : ''}`}
                  onClick={() => setCat(c.id)}>
                  <GarmentIcon name={c.icon} size={16} /> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>QUANTITY</span>
            <div className={styles.qty}>
              <Stepper value={units} onChange={setUnits} step={50} min={0} />
              <span className={styles.units}>units</span>
            </div>
          </div>

          <label className={styles.section}>
            <span className={styles.label}>BUDGET / UNIT</span>
            <input className={`${styles.field} ${styles.fieldDisplay}`} value={budget}
              onChange={(e) => setBudget(e.target.value)} />
          </label>

          <label className={styles.section}>
            <span className={styles.label}>SHIP BY</span>
            <div className={styles.fieldRow}>
              <input className={`${styles.field} ${styles.fieldDisplay} ${styles.grow}`} value={shipBy}
                onChange={(e) => setShipBy(e.target.value)} />
              <Clock size={18} className={styles.clock} />
            </div>
          </label>

          <div className={styles.section}>
            <span className={styles.label}>REQUIREMENTS</span>
            <div className={styles.chips}>
              {ALL_REQS.map((r) => {
                const on = reqs.includes(r);
                return (
                  <button key={r} type="button"
                    className={`${styles.reqChip} ${on ? styles.reqOn : ''}`}
                    onClick={() => toggleReq(r)}>
                    {on ? <Check size={13} /> : <Plus size={13} />} {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="ember" block onClick={post}>Post RFP →</Button>
        </div>
      </div>
    </PhoneFrame>
  );
}

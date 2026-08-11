import { Check, Clock, Package } from 'lucide-react';
import type { Vendor } from '../../state/types';
import { Avatar } from '../Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../Gauge/Gauge';
import { Stat, StatGroup } from '../Stat/Stat';
import { CertBadge } from '../CertBadge/CertBadge';
import styles from './TrustCard.module.css';

export function TrustCard({ vendor, animateGauge = true }: { vendor: Vendor; animateGauge?: boolean }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Avatar src={avatarUrl(vendor.avatar)} name={vendor.name} size={68} />
        <div className={styles.id}>
          <h3 className={styles.name}>{vendor.name}</h3>
          <p className={styles.meta}>{vendor.category} · {vendor.location}</p>
        </div>
        <Gauge score={vendor.trustScore} variant="mini" size={56} animateOnMount={animateGauge} />
      </div>
      <StatGroup>
        <Stat icon={<Check />} label="On-time" value={`${vendor.onTimePct}%`} />
        <Stat icon={<Package />} label="MOQ" value={vendor.moq} />
        <Stat icon={<Clock />} label="Lead time" value={vendor.leadDays} unit="days" />
      </StatGroup>
      <div className={styles.certs}>
        {vendor.certs.slice(0, 3).map((c) => <CertBadge key={c} label={c} size={44} />)}
      </div>
    </div>
  );
}

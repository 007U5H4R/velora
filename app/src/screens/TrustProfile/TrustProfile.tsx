import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Factory, Award, Activity, MessageCircle, Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../../components/Gauge/Gauge';
import { CertBadge } from '../../components/CertBadge/CertBadge';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { Button } from '../../components/Button/Button';
import { MatchOverlay } from '../Match/Match';
import { useStore } from '../../state/store';
import { vendors, loomcraft } from '../../data/vendors';
import styles from './TrustProfile.module.css';

function trustBand(score: number): string {
  if (score >= 85) return 'High Trust';
  if (score >= 70) return 'Trusted';
  return 'Building Trust';
}

function Pillar(
  { icon, title, value, note, accent = false }:
  { icon: ReactNode; title: string; value: ReactNode; note: string; accent?: boolean },
) {
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarHead}>
        <span className={styles.pillarIcon}>{icon}</span>
        <span className={styles.pillarTitle}>{title}</span>
      </div>
      <span className={`${styles.pillarValue} ${accent ? styles.accent : ''}`}>{value}</span>
      <p className={styles.pillarNote}>{note}</p>
    </div>
  );
}

export function TrustProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const openMatch = useStore((s) => s.openMatch);
  const vendor = vendors.find((v) => v.id === id) ?? loomcraft;

  return (
    <PhoneFrame>
      <StatusBar />
      <div className={styles.screen}>
        <button className={styles.back} onClick={() => nav(-1)} aria-label="Back">
          <ChevronLeft />
        </button>

        <header className={styles.hero}>
          <MandalaBg />
          <Avatar src={avatarUrl(vendor.avatar)} name={vendor.name} size={92} />
          <h1 className={styles.name}>{vendor.name}</h1>
          {vendor.verified && (
            <span className={styles.verified}><Check size={13} /> Verified</span>
          )}
          <p className={styles.meta}>{vendor.category} · {vendor.location}</p>

          <div className={styles.well}>
            <Gauge score={vendor.trustScore} variant="hero" size={148} />
          </div>
          <p className={styles.band}>{trustBand(vendor.trustScore)}</p>
        </header>

        <section className={styles.pillars}>
          <Pillar icon={<ShieldCheck />} title="Identity"
            value={vendor.identity.verified ? 'Verified' : 'Partial'}
            note={vendor.identity.note} accent={vendor.identity.verified} />
          <Pillar icon={<Factory />} title="Capability"
            value={vendor.capability.score} note={vendor.capability.note} />
          <Pillar icon={<Award />} title="Reputation"
            value={vendor.reputation.score} note={vendor.reputation.note} />
          <Pillar icon={<Activity />} title="Continuous"
            value={vendor.continuous.status} note={vendor.continuous.note} accent />
        </section>

        <section className={styles.certs}>
          {vendor.certs.map((c) => <CertBadge key={c} label={c} size={48} />)}
        </section>
      </div>

      <div className={styles.ctaBar}>
        <button className={styles.msg} onClick={() => nav('/chat/' + vendor.id)}>
          <MessageCircle size={18} /> Message
        </button>
        <Button variant="ember" block onClick={() => openMatch(vendor)}>Shortlist</Button>
      </div>

      <MatchOverlay />
    </PhoneFrame>
  );
}

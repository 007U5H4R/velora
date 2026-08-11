import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ShieldCheck, FileText, Bell, MessageCircle, Pencil, ChevronRight } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import { brandNav, manufacturerNav } from '../../components/BottomNav/navItems';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Gauge } from '../../components/Gauge/Gauge';
import { useStore } from '../../state/store';
import { noor } from '../../data/brands';
import { loomcraft } from '../../data/vendors';
import styles from './Profile.module.css';

interface SettingsRow { id: string; icon: ReactNode; label: string; gauge?: boolean; }

export function Profile() {
  const nav = useNavigate();
  const role = useStore((s) => s.role);
  const switchRole = useStore((s) => s.switchRole);

  // Persona (name/avatar/subline/trust score) is role-driven.
  // Trust score = the persona's REAL seed score (Noor 91 / Loomcraft 94) — frame 11's
  // gauge shows a decorative 94-on-Noor, but Velora's core value is *consistent* trust
  // scores across the product, so we reconcile to the real value here (see data/brands.ts).
  const persona = role === 'brand'
    ? { name: noor.name,      sub: `D2C founder · ${noor.location}`,                     avatar: noor.avatar,      score: noor.trustScore }
    : { name: loomcraft.name, sub: `Manufacturer · ${loomcraft.location.split(',')[0]}`, avatar: loomcraft.avatar, score: loomcraft.trustScore };
  const navItems = role === 'brand' ? brandNav : manufacturerNav;

  const settingsRows: SettingsRow[] = [
    { id: 'trust', icon: <ShieldCheck size={15} />, label: 'Trust & verification', gauge: true },
    { id: 'company', icon: <FileText size={15} />, label: 'Company & account' },
    { id: 'payment', icon: <span className={styles.rupee}>₹</span>, label: 'Payment & terms' },
    { id: 'notifications', icon: <Bell size={15} />, label: 'Notifications' },
    { id: 'help', icon: <MessageCircle size={15} />, label: 'Help & support' },
  ];

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />
        <header className={styles.header}>
          <h1 className={styles.h1}>Profile</h1>
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <div className={styles.content}>
            <div className={styles.profileCard}>
              <Avatar src={avatarUrl(persona.avatar)} name={persona.name} size={56} />
              <div className={styles.profileMid}>
                <div className={styles.nameRow}>
                  <h2 className={styles.name}>{persona.name}</h2>
                  <span className={styles.verifiedChip}>
                    <ShieldCheck size={11} className={styles.verifiedIcon} /> Verified
                  </span>
                </div>
                <p className={styles.sub}>{persona.sub}</p>
              </div>
              <button className={styles.editBtn} aria-label="Edit profile">
                <Pencil size={16} />
              </button>
            </div>

            <div className={styles.roleCard}>
              <div className={styles.roleTop}>
                <span className={styles.roleLabel}>You're browsing as</span>
                <span className={styles.roleHint}>Switch anytime</span>
              </div>
              <SegmentedControl
                className={styles.roleSegments}
                value={role}
                onChange={(v) => { if (v !== role) switchRole(); }}
                segments={[
                  { label: 'Brand', value: 'brand' },
                  { label: 'Manufacturer', value: 'manufacturer' },
                ]}
              />
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}><span className={styles.sval}>6</span><span className={styles.slabel}>Matches</span></div>
              <div className={styles.stat}><span className={styles.sval}>2</span><span className={styles.slabel}>RFPs</span></div>
              <div className={styles.stat}><span className={styles.sval}>14</span><span className={styles.slabel}>Saved</span></div>
            </div>

            <div className={styles.settingsList}>
              {settingsRows.map((row) => (
                <button key={row.id} className={styles.row}>
                  <span className={styles.rowIconWell}>{row.icon}</span>
                  <span className={styles.rowLabel}>{row.label}</span>
                  {row.gauge && <Gauge score={persona.score} variant="mini" size={40} animateOnMount={false} />}
                  <ChevronRight size={18} className={styles.chevron} />
                </button>
              ))}
            </div>

            <button className={styles.signOut} onClick={() => nav('/')}>Sign out</button>
          </div>
        </div>

        <BottomNav items={navItems} activeId="profile" badges={{ matches: 6 }} onNavigate={() => {}} />
      </div>
    </PhoneFrame>
  );
}

import { useState } from 'react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Button, PillowButton } from '../../components/Button/Button';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Chip } from '../../components/Chip/Chip';
import styles from './Gallery.module.css';
import type { ReactNode } from 'react';
import { X, Eye, Star, Check, Sparkles } from 'lucide-react';

export function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.demo}>{children}</div>
    </section>
  );
}

function SegDemo() {
  const [tab, setTab] = useState('vendors');
  const [filter, setFilter] = useState('active');
  return (
    <>
      <SegmentedControl value={tab} onChange={setTab}
        segments={[{ label: 'Vendors', value: 'vendors' }, { label: 'RFPs', value: 'rfps' }]} />
      <SegmentedControl value={filter} onChange={setFilter}
        segments={[{ label: 'Active', value: 'active', count: 2 }, { label: 'Drafts', value: 'drafts', count: 1 }, { label: 'Closed', value: 'closed' }]} />
    </>
  );
}

export function Gallery() {
  return (
    <PhoneFrame>
      <StatusBar />
      <main className={styles.gallery}>
        <h1 className={styles.h1}>Velora — Foundation Gallery</h1>
        <p className={styles.sub}>Phase 1 components, phone-framed at 390px.</p>
        <GallerySection title="Buttons">
          <Button variant="ember" block>Shortlist Loomcraft</Button>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" shape="rect">View</Button>
            <Button variant="ember" shape="rect">Accept</Button>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <PillowButton color="red" icon={<X />} label="Pass" />
            <PillowButton color="blue" icon={<Eye />} label="Details" />
            <PillowButton color="amber" icon={<Star />} label="Save" />
            <PillowButton color="mint" icon={<Check />} label="Shortlist" />
          </div>
        </GallerySection>
        <GallerySection title="Segmented control"><SegDemo /></GallerySection>
        <GallerySection title="Chips">
          <Chip icon={<Sparkles />}>Similar to your best supplier</Chip>
          <Chip icon={<Sparkles />}>Matches your capacity &amp; certs</Chip>
          <Chip tone="gold">Best match</Chip>
        </GallerySection>
        {/* Component demo sections are appended here by tasks 1.6–1.10 */}
      </main>
    </PhoneFrame>
  );
}

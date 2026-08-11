import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import styles from './Gallery.module.css';
import type { ReactNode } from 'react';

export function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.demo}>{children}</div>
    </section>
  );
}

export function Gallery() {
  return (
    <PhoneFrame>
      <StatusBar />
      <main className={styles.gallery}>
        <h1 className={styles.h1}>Velora — Foundation Gallery</h1>
        <p className={styles.sub}>Phase 1 components, phone-framed at 390px.</p>
        {/* Component demo sections are appended here by tasks 1.6–1.10 */}
      </main>
    </PhoneFrame>
  );
}

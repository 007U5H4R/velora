import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, ShieldCheck, Sparkles, FileText, Plus, ArrowRight } from 'lucide-react';
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { MandalaBg } from '../../components/MandalaBg/MandalaBg';
import { Avatar } from '../../components/Avatar/Avatar';
import { avatarUrl } from '../../assets/avatars';
import { Button } from '../../components/Button/Button';
import { useStore } from '../../state/store';
import { vendors } from '../../data/vendors';
import { rfpTees } from '../../data/rfps';
import type { ChatMsg } from '../../state/types';
import styles from './Chat.module.css';

function fmtINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

// Frame 27:39 — ember-outlined in-thread bid card. Always a "them" message in this seed,
// so it's rendered left-aligned by its own .bidCard rule (no alignment prop needed).
function BidMessage({ bid }: { bid: NonNullable<ChatMsg['bidCard']> }) {
  const nav = useNavigate();
  return (
    <div className={styles.bidCard}>
      <div className={styles.bidHeader}>
        <FileText size={14} />
        <span>Loomcraft sent a bid</span>
      </div>
      <div className={styles.bidStats}>
        <div className={styles.bidStat}>
          <span className={styles.bidStatValue}>₹{bid.pricePerUnit}</span>
          <span className={styles.bidStatLabel}>PRICE/UNIT</span>
        </div>
        <div className={styles.bidStat}>
          <span className={styles.bidStatValue}>{bid.leadDays}d</span>
          <span className={styles.bidStatLabel}>LEAD</span>
        </div>
        <div className={styles.bidStat}>
          <span className={`${styles.bidStatValue} ${styles.bidStatValueEmber}`}>{fmtINR(bid.total)}</span>
          <span className={styles.bidStatLabel}>TOTAL</span>
        </div>
      </div>
      <Button variant="ember" block onClick={() => nav('/bids/rfp-tees')}>Review &amp; accept</Button>
    </div>
  );
}

function Bubble({ msg }: { msg: ChatMsg }) {
  const mine = msg.from === 'me';
  return (
    <div className={`${styles.msgWrap} ${mine ? styles.msgWrapMe : styles.msgWrapThem}`}>
      <div className={`${styles.bubble} ${mine ? styles.bubbleMe : styles.bubbleThem}`}>{msg.text}</div>
      <span className={styles.time}>{msg.time}</span>
    </div>
  );
}

export function Chat() {
  const { vendorId = 'v-loomcraft' } = useParams();
  const nav = useNavigate();
  const chat = useStore((s) => s.chat);
  const thread = chat[vendorId] ?? chat['v-loomcraft'];
  const vendor = vendors.find((v) => v.id === thread.withId)!;
  const [msgs, setMsgs] = useState<ChatMsg[]>(thread.messages);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  function send() {
    const t = draft.trim();
    if (!t) return;
    const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // "17:12"
    setMsgs((m) => [...m, { id: `local-${Date.now()}`, from: 'me', text: t, time: now }]);
    setDraft('');
  }

  return (
    <PhoneFrame>
      <div className={styles.screen}>
        <StatusBar />

        <header className={styles.header}>
          <button className={styles.iconBtn} onClick={() => nav(-1)} aria-label="Back">
            <ChevronLeft size={18} />
          </button>
          <Avatar src={avatarUrl(vendor.avatar)} name={vendor.name} size={42} />
          <div className={styles.identity}>
            <div className={styles.nameRow}>
              <span className={styles.name}>{vendor.name}</span>
              <span className={styles.verifiedPill}>
                <ShieldCheck size={11} /> {vendor.trustScore}
              </span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.dot} />
              <span className={styles.statusText}>Active now</span>
            </div>
          </div>
          <button className={styles.iconBtn} aria-label="Info">
            <Info size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.mandala}><MandalaBg /></div>

          <div className={styles.matchPill}>
            <Sparkles size={11} />
            <span>You matched · {rfpTees.title} RFP</span>
          </div>

          {msgs.map((m) =>
            m.bidCard
              ? <BidMessage key={m.id} bid={m.bidCard} />
              : <Bubble key={m.id} msg={m} />
          )}
          <div ref={bottomRef} />
        </div>

        <div className={styles.inputBar}>
          <button className={styles.plusBtn} aria-label="Add">
            <Plus size={18} />
          </button>
          <div className={styles.inputWell}>
            <input
              className={styles.input}
              placeholder={`Message ${vendor.name}…`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(); }}
              aria-label={`Message ${vendor.name}`}
            />
          </div>
          <button className={`${styles.sendBtn} sh-cta`} onClick={send} aria-label="Send">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

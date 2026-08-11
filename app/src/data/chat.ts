import type { ChatThread } from '../state/types';

// One seeded thread keyed by vendor id v-loomcraft — frame 10, brand-POV: me=Noor, them=Loomcraft.
export const chat: Record<string, ChatThread> = {
  'v-loomcraft': {
    id: 'chat-loomcraft', withId: 'v-loomcraft',
    messages: [
      { id: 'c1', from: 'them', text: "Hi Noor! Thanks for the match — we'd love to quote your organic tees.", time: '10:02' },
      { id: 'c2', from: 'me', text: 'Great! Can you hit the 15 Oct ship date for 500 units?', time: '10:04' },
      { id: 'c3', from: 'them', text: 'Yes — 40-day lead, GOTS-certified jersey. Sending a bid across now.', time: '10:06' },
      { id: 'c4', from: 'them', text: 'Loomcraft sent a bid', time: '10:06', bidCard: { pricePerUnit: 220, leadDays: 40, total: 110000 } },
      { id: 'c5', from: 'me', text: 'Perfect — reviewing now. Looks within range.', time: '10:07' },
    ],
  },
};

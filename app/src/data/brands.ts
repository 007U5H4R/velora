import type { Brand } from '../state/types';

// Noor & Co. — "me" as Brand, EXACT from frames 07/11.
// Frame 07 RFP card shows Noor at 91 with "96% on-time · Net 30 honoured" — use 91.
// Frame 11's profile gauge shows a decorative 94; ignored here, reconciled at Profile-build.
export const noor: Brand = {
  id: 'b-noor', name: 'Noor & Co.', tagline: 'D2C · sustainable basics', location: 'Mumbai',
  trustScore: 91, onTimePct: 96, terms: 'Net 30', avatar: 'noor',
};

// Authored brands — frame-silent, back the manufacturer's RFP discover deck.
const saffron: Brand = {
  id: 'b-saffron', name: 'Saffron Street', tagline: 'streetwear · fleece', location: 'Bengaluru',
  trustScore: 89, onTimePct: 94, terms: 'Net 30', avatar: 'saffron',
};
const terra: Brand = {
  id: 'b-terra', name: 'Terra Basics', tagline: 'eco activewear', location: 'Pune',
  trustScore: 87, onTimePct: 92, terms: 'Net 45', avatar: 'terra',
};
const halcyon: Brand = {
  id: 'b-halcyon', name: 'Halcyon', tagline: 'premium linen', location: 'Delhi',
  trustScore: 92, onTimePct: 95, terms: 'Net 30', avatar: 'halcyon',
};

export const brands: Brand[] = [noor, saffron, terra, halcyon];

import type { Vendor } from '../state/types';

// Hero vendor — EXACT from frames 02+03.
export const loomcraft: Vendor = {
  id: 'v-loomcraft', name: 'Loomcraft', category: 'Organic knits & jersey',
  location: 'Tiruppur, Tamil Nadu', trustScore: 94, onTimePct: 97, moq: 300, leadDays: 42,
  certs: ['GOTS', 'OEKO-TEX', 'SMETA', 'WRAP'], avatar: 'loomcraft', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified · 5 directors · 3 offices' },
  capability: { score: 92, note: '20k/mo capacity · 300 MOQ · 45 machines' },
  reputation: { score: 95, note: '97% on-time · 68% reorder · 0 disputes' },
  continuous: { status: 'Live', note: 'Re-verified 2d ago · Next audit 40d · Legal clear' },
};

// Named matched vendors — headline values EXACT from frames 05/09; 4-pillar notes (authored),
// kept internally consistent (capability/reputation scores within ±3 of trustScore).
export const indigo: Vendor = {
  id: 'v-indigo', name: 'Indigo Mills', category: 'jersey & knits',
  location: 'Ludhiana, Punjab', trustScore: 88, onTimePct: 94, moq: 400, leadDays: 48,
  certs: ['GOTS', 'OEKO-TEX'], avatar: 'indigo', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 86, note: '400 MOQ · 48d lead' },
  reputation: { score: 89, note: '94% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
export const saanjh: Vendor = {
  id: 'v-saanjh', name: 'Saanjh Textiles', category: 'sustainable cotton',
  location: 'Jaipur, Rajasthan', trustScore: 91, onTimePct: 95, moq: 350, leadDays: 35,
  certs: ['GOTS', 'Fairtrade'], avatar: 'saanjh', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 89, note: '350 MOQ · 35d lead' },
  reputation: { score: 92, note: '95% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
export const kadwa: Vendor = {
  id: 'v-kadwa', name: 'Kadwa Weaves', category: 'woven & prints',
  location: 'Surat, Gujarat', trustScore: 86, onTimePct: 92, moq: 500, leadDays: 46,
  certs: ['OEKO-TEX'], avatar: 'kadwa', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 84, note: '500 MOQ · 46d lead' },
  reputation: { score: 87, note: '92% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
export const nadi: Vendor = {
  id: 'v-nadi', name: 'Nadi Knits', category: 'knitwear',
  location: 'Kolkata, West Bengal', trustScore: 90, onTimePct: 95, moq: 300, leadDays: 44,
  certs: ['GOTS', 'SMETA'], avatar: 'nadi', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 88, note: '300 MOQ · 44d lead' },
  reputation: { score: 91, note: '95% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};

// Authored extra vendors — frame-silent, needed so the brand can swipe ≥10 vendors.
const meher: Vendor = {
  id: 'v-meher', name: 'Meher Textiles', category: 'home & knits',
  location: 'Panipat, Haryana', trustScore: 87, onTimePct: 93, moq: 450, leadDays: 40,
  certs: ['OEKO-TEX', 'SMETA'], avatar: 'meher', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 85, note: '450 MOQ · 40d lead' },
  reputation: { score: 88, note: '93% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
const ratna: Vendor = {
  id: 'v-ratna', name: 'Ratna Weaves', category: 'handloom cotton',
  location: 'Erode, Tamil Nadu', trustScore: 89, onTimePct: 94, moq: 250, leadDays: 38,
  certs: ['GOTS', 'Fairtrade'], avatar: 'ratna', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 87, note: '250 MOQ · 38d lead' },
  reputation: { score: 90, note: '94% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
// Only non-verified vendor in the deck — gives the UI one non-verified case.
const suraj: Vendor = {
  id: 'v-suraj', name: 'Suraj Mills', category: 'suiting & shirting',
  location: 'Bhilwara, Rajasthan', trustScore: 83, onTimePct: 90, moq: 600, leadDays: 52,
  certs: ['OEKO-TEX'], avatar: 'suraj', verified: false,
  identity: { verified: false, note: 'GST verified · PAN pending' },
  capability: { score: 81, note: '600 MOQ · 52d lead' },
  reputation: { score: 84, note: '90% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
const vastra: Vendor = {
  id: 'v-vastra', name: 'Vastra Co.', category: 'denim & workwear',
  location: 'Ahmedabad, Gujarat', trustScore: 85, onTimePct: 91, moq: 500, leadDays: 50,
  certs: ['OEKO-TEX', 'WRAP'], avatar: 'vastra', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 83, note: '500 MOQ · 50d lead' },
  reputation: { score: 86, note: '91% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};
export const anga: Vendor = {
  id: 'v-anga', name: 'Anga Knitwear', category: 'performance knits',
  location: 'Tiruppur, Tamil Nadu', trustScore: 92, onTimePct: 96, moq: 300, leadDays: 39,
  certs: ['GOTS', 'OEKO-TEX', 'bluesign'], avatar: 'anga', verified: true,
  identity: { verified: true, note: 'PAN · GST · CIN verified' },
  capability: { score: 90, note: '300 MOQ · 39d lead' },
  reputation: { score: 93, note: '96% on-time · low disputes' },
  continuous: { status: 'Live', note: 'Re-verified this week · Legal clear' },
};

// Liked-you inbound vendors — frame 05 "Liked you" row shows avatar + first name only.
// Minimal-but-valid Vendor objects backing the inbound-likes row (authored, frame-silent).
const aarav: Vendor = {
  id: 'v-aarav', name: 'Aarav', category: 'Cotton basics',
  location: 'Coimbatore, Tamil Nadu', trustScore: 85, onTimePct: 90, moq: 300, leadDays: 40,
  certs: ['GOTS'], avatar: 'aarav', verified: true,
  identity: { verified: true, note: 'PAN · GST verified' },
  capability: { score: 84, note: '300 MOQ · 40d lead' },
  reputation: { score: 86, note: '90% on-time' },
  continuous: { status: 'Live', note: 'Re-verified this week' },
};
const mira: Vendor = {
  id: 'v-mira', name: 'Mira', category: 'Knitwear',
  location: 'Ludhiana, Punjab', trustScore: 87, onTimePct: 92, moq: 350, leadDays: 42,
  certs: ['OEKO-TEX'], avatar: 'mira', verified: true,
  identity: { verified: true, note: 'PAN · GST verified' },
  capability: { score: 86, note: '350 MOQ · 42d lead' },
  reputation: { score: 88, note: '92% on-time' },
  continuous: { status: 'Live', note: 'Re-verified this week' },
};
const kala: Vendor = {
  id: 'v-kala', name: 'Kala', category: 'Woven fabrics',
  location: 'Jaipur, Rajasthan', trustScore: 88, onTimePct: 93, moq: 400, leadDays: 45,
  certs: ['GOTS'], avatar: 'kala', verified: true,
  identity: { verified: true, note: 'PAN · GST verified' },
  capability: { score: 87, note: '400 MOQ · 45d lead' },
  reputation: { score: 89, note: '93% on-time' },
  continuous: { status: 'Live', note: 'Re-verified this week' },
};
const rhea: Vendor = {
  id: 'v-rhea', name: 'Rhea', category: 'Sustainable cotton',
  location: 'Tiruppur, Tamil Nadu', trustScore: 90, onTimePct: 95, moq: 300, leadDays: 38,
  certs: ['Fairtrade'], avatar: 'rhea', verified: true,
  identity: { verified: true, note: 'PAN · GST verified' },
  capability: { score: 89, note: '300 MOQ · 38d lead' },
  reputation: { score: 91, note: '95% on-time' },
  continuous: { status: 'Live', note: 'Re-verified this week' },
};

export const vendors: Vendor[] = [
  loomcraft, indigo, saanjh, kadwa, nadi, meher, ratna, suraj, vastra, anga,
  aarav, mira, kala, rhea,
];

// The brand's Discover deck order — Loomcraft first to match frame 02.
export const vendorDeck: Vendor[] = [
  loomcraft, indigo, saanjh, kadwa, nadi, meher, ratna, suraj, vastra, anga,
];

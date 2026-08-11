export type Role = 'brand' | 'manufacturer';
export type SwipeDir = 'pass' | 'like';

export interface Vendor {
  id: string; name: string; category: string; location: string;
  trustScore: number; onTimePct: number; moq: number; leadDays: number;
  certs: string[]; avatar: string; verified: boolean;
  identity: { verified: boolean; note: string };
  capability: { score: number; note: string };
  reputation: { score: number; note: string };
  continuous: { status: string; note: string };
}
export interface Brand {
  id: string; name: string; tagline: string; location: string;
  trustScore: number; onTimePct: number; terms: string; avatar: string;
}
export interface Rfp {
  id: string; brandId: string; title: string; category: string;
  units: number; budgetMin: number; budgetMax: number; shipBy: string;
  requirements: string[]; status: 'live' | 'draft' | 'closed'; bidIds: string[];
}
export interface Bid {
  id: string; rfpId: string; vendorId: string; pricePerUnit: number;
  moq: number; leadDays: number; sample: 'free' | 'paid' | 'none';
  note: string; total: number; status: 'sent' | 'accepted';
}
export interface Match {
  id: string; withId: string; kind: 'vendor' | 'brand';
  status: 'submit_bid' | 'bid_received' | 'messaged'; when: string;
}
export interface ChatMsg {
  id: string; from: 'me' | 'them'; text: string; time: string;
  bidCard?: { pricePerUnit: number; leadDays: number; total: number };
}
export interface ChatThread { id: string; withId: string; messages: ChatMsg[]; }

export interface AppState {
  role: Role;
  vendorDeck: Vendor[]; vendorIndex: number;
  rfpDeck: Rfp[]; rfpIndex: number;
  rfps: Rfp[]; bids: Bid[];
  matches: Match[]; inboundLikes: Match[];
  saved: string[];
  activeMatch: Vendor | null;
  chat: Record<string, ChatThread>;
  switchRole(): void;
  swipeVendor(dir: SwipeDir): void;
  swipeRfp(dir: SwipeDir): void;
  createRfp(input: Omit<Rfp, 'id' | 'brandId' | 'status' | 'bidIds'>): string;
  submitBid(input: Omit<Bid, 'id' | 'total' | 'status'>): Bid;
  toggleSave(vendorId: string): void;
  openMatch(v: Vendor): void;
  closeMatch(): void;
}

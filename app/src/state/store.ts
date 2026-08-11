import { createStore as createVanillaStore } from 'zustand/vanilla';
import { useStore as useZustandStore } from 'zustand';
import type { AppState, Bid, Rfp, SwipeDir, Vendor } from './types';

export function createStore(initial: Partial<AppState> = {}) {
  return createVanillaStore<AppState>((set, get) => ({
    role: 'brand',
    vendorDeck: [], vendorIndex: 0,
    rfpDeck: [], rfpIndex: 0,
    rfps: [], bids: [],
    matches: [], inboundLikes: [],
    saved: [],
    activeMatch: null,
    chat: {},

    switchRole: () => set((s) => ({ role: s.role === 'brand' ? 'manufacturer' : 'brand' })),
    setRole: (role) => set(() => ({ role })),

    swipeVendor: (dir: SwipeDir) => {
      const cur = get().vendorDeck[get().vendorIndex];
      set((s) => ({
        vendorIndex: s.vendorIndex + 1,
        activeMatch: dir === 'like' ? (cur ?? null) : s.activeMatch,
      }));
    },

    swipeRfp: (_dir: SwipeDir) => {
      set((s) => ({ rfpIndex: s.rfpIndex + 1 }));
    },

    createRfp: (input) => {
      const id = `rfp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const newRfp: Rfp = { ...input, id, brandId: 'me', status: 'live', bidIds: [] };
      set((s) => ({ rfps: [newRfp, ...s.rfps] }));
      return id;
    },

    submitBid: (input) => {
      const total = input.pricePerUnit * input.moq;
      const id = `bid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const bid: Bid = { ...input, id, total, status: 'sent' };
      set((s) => ({
        bids: [bid, ...s.bids],
        rfps: s.rfps.map((r) => (r.id === bid.rfpId ? { ...r, bidIds: [...r.bidIds, bid.id] } : r)),
      }));
      return bid;
    },

    toggleSave: (vendorId: string) => {
      set((s) => ({
        saved: s.saved.includes(vendorId)
          ? s.saved.filter((id) => id !== vendorId)
          : [...s.saved, vendorId],
      }));
    },

    openMatch: (v: Vendor) => set({ activeMatch: v }),
    closeMatch: () => set({ activeMatch: null }),

    ...initial,
  }));
}

// Default React-bound store, seeded from mock data.
import { seed } from '../data';
export const appStore = createStore(seed);
export function useStore<T>(sel: (s: AppState) => T): T {
  return useZustandStore(appStore, sel);
}

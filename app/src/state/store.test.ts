import { describe, test, expect } from 'vitest';
import { createStore } from './store';
import type { Vendor, Rfp } from './types';

const v = (id: string): Vendor => ({
  id, name: id, category: '', location: '', trustScore: 90, onTimePct: 95,
  moq: 300, leadDays: 40, certs: ['GOTS'], avatar: '', verified: true,
  identity: { verified: true, note: '' }, capability: { score: 90, note: '' },
  reputation: { score: 90, note: '' }, continuous: { status: 'Live', note: '' },
});
const rfp = (id: string, units: number): Rfp => ({
  id, brandId: 'b', title: '', category: '', units, budgetMin: 0, budgetMax: 0,
  shipBy: '', requirements: [], status: 'live', bidIds: [],
});

describe('store loop', () => {
  test('swipeVendor(like) opens a match and advances the deck', () => {
    const s = createStore({ vendorDeck: [v('a'), v('b')] });
    s.getState().swipeVendor('like');
    expect(s.getState().vendorIndex).toBe(1);
    expect(s.getState().activeMatch?.id).toBe('a');
  });
  test('swipeVendor(pass) advances without a match', () => {
    const s = createStore({ vendorDeck: [v('a'), v('b')] });
    s.getState().swipeVendor('pass');
    expect(s.getState().vendorIndex).toBe(1);
    expect(s.getState().activeMatch).toBeNull();
  });
  test('createRfp prepends a live RFP and returns its id', () => {
    const s = createStore({ rfps: [] });
    const id = s.getState().createRfp({ title: 'Tees', category: 'Tees & knits',
      units: 500, budgetMin: 180, budgetMax: 240, shipBy: '2026-10-15', requirements: ['GOTS'] });
    expect(s.getState().rfps[0].id).toBe(id);
    expect(s.getState().rfps[0].status).toBe('live');
  });
  test('submitBid computes total and attaches bid to its RFP (loop closes)', () => {
    const s = createStore({ rfps: [rfp('r1', 500)], bids: [] });
    const b = s.getState().submitBid({ rfpId: 'r1', vendorId: 'v1', pricePerUnit: 220,
      moq: 500, leadDays: 40, sample: 'free', note: '' });
    expect(b.total).toBe(110000);
    expect(s.getState().rfps.find(r => r.id === 'r1')!.bidIds).toContain(b.id);
  });
  test('switchRole toggles brand<->manufacturer', () => {
    const s = createStore({ role: 'brand' });
    s.getState().switchRole();
    expect(s.getState().role).toBe('manufacturer');
  });
});

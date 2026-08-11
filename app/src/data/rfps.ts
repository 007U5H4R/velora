import type { Rfp } from '../state/types';

// Noor & Co.'s own RFPs — brand view, frames 06/07/08, EXACT.
export const rfpTees: Rfp = {
  id: 'rfp-tees', brandId: 'b-noor', title: 'Organic Cotton Tees', category: 'D2C basics',
  units: 500, budgetMin: 180, budgetMax: 240, shipBy: '2026-10-15',
  requirements: ['GOTS certified', 'Pre-prod sample', 'Net 30 terms'],
  status: 'live', bidIds: ['bid-loomcraft', 'bid-indigo', 'bid-saanjh', 'bid-nadi'],
};
export const rfpLinen: Rfp = {
  id: 'rfp-linen', brandId: 'b-noor', title: 'Linen Shirt Run', category: 'Shirting',
  units: 300, budgetMin: 420, budgetMax: 520, shipBy: '2026-11-30',
  requirements: ['Fabric test report', 'Pre-prod sample'], status: 'live', bidIds: ['bid-linen-1'],
};
// DRAFT — frame 06: 800 units, TBD budget, no ship date.
export const rfpTank: Rfp = {
  id: 'rfp-tank', brandId: 'b-noor', title: 'Ribbed Tank Tops', category: 'Basics',
  units: 800, budgetMin: 0, budgetMax: 0, shipBy: '', requirements: [], status: 'draft', bidIds: [],
};

// Noor's own — feeds the brand RFPs screen.
export const brandRfps: Rfp[] = [rfpTees, rfpLinen, rfpTank];

// Authored other-brand RFPs — manufacturer discover deck.
export const rfpHoodies: Rfp = {
  id: 'rfp-hoodies', brandId: 'b-saffron', title: 'Fleece Hoodies', category: 'Streetwear',
  units: 400, budgetMin: 520, budgetMax: 640, shipBy: '2026-12-10',
  requirements: ['Pre-prod sample', 'Net 30 terms'], status: 'live', bidIds: [],
};
export const rfpJoggers: Rfp = {
  id: 'rfp-joggers', brandId: 'b-terra', title: 'Bamboo Joggers', category: 'Activewear',
  units: 600, budgetMin: 300, budgetMax: 380, shipBy: '2026-11-20',
  requirements: ['OEKO-TEX', 'Bulk pricing'], status: 'live', bidIds: [],
};
export const rfpOvershirts: Rfp = {
  id: 'rfp-overshirts', brandId: 'b-halcyon', title: 'Linen Overshirts', category: 'Premium',
  units: 250, budgetMin: 640, budgetMax: 760, shipBy: '2026-12-05',
  requirements: ['Fabric test report', 'Pre-prod sample'], status: 'live', bidIds: [],
};

// Manufacturer's swipe deck — Loomcraft sees Noor's tees RFP first (frame 07), then the 3 authored.
export const rfpDeck: Rfp[] = [rfpTees, rfpHoodies, rfpJoggers, rfpOvershirts];

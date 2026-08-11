import type { Bid } from '../state/types';

// Bids on rfp-tees — frame 09 "Bids received", total = pricePerUnit × 500, all EXACT except noted.
export const bids: Bid[] = [
  {
    id: 'bid-loomcraft', rfpId: 'rfp-tees', vendorId: 'v-loomcraft', pricePerUnit: 220, moq: 500,
    leadDays: 40, sample: 'free', total: 110000, status: 'sent',
    note: 'We specialise in GOTS-certified organic jersey. Happy to share past work for D2C basics and hit your 15 Oct ship date.',
  },
  {
    id: 'bid-indigo', rfpId: 'rfp-tees', vendorId: 'v-indigo', pricePerUnit: 205, moq: 500,
    leadDays: 48, sample: 'paid', total: 102500, status: 'sent', note: '',
  },
  {
    id: 'bid-saanjh', rfpId: 'rfp-tees', vendorId: 'v-saanjh', pricePerUnit: 235, moq: 500,
    leadDays: 35, sample: 'paid', total: 117500, status: 'sent', note: '',
  },
  // (authored 4th — frame shows "4 bids")
  {
    id: 'bid-nadi', rfpId: 'rfp-tees', vendorId: 'v-nadi', pricePerUnit: 212, moq: 500,
    leadDays: 44, sample: 'free', total: 106000, status: 'sent', note: '',
  },
  // (authored — rfp-linen's 1 bid)
  {
    id: 'bid-linen-1', rfpId: 'rfp-linen', vendorId: 'v-kadwa', pricePerUnit: 470, moq: 300,
    leadDays: 50, sample: 'paid', total: 141000, status: 'sent', note: '',
  },
];

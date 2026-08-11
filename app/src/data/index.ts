import { vendorDeck } from './vendors';
import { brandRfps, rfpDeck } from './rfps';
import { bids } from './bids';
import { matches, inboundLikes } from './matches';
import { chat } from './chat';
import type { AppState } from '../state/types';

export const seed: Partial<AppState> = {
  role: 'brand',
  vendorDeck, vendorIndex: 0,
  rfpDeck, rfpIndex: 0,
  rfps: brandRfps,
  bids,
  matches, inboundLikes,
  saved: ['v-kadwa', 'v-nadi', 'v-meher'],
  chat,
  activeMatch: null,
};

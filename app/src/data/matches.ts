import type { Match } from '../state/types';

// Frame 05 shows 6 matches (profile stat "6 Matches") + a "Liked you" row of 4.
export const matches: Match[] = [
  { id: 'm-loomcraft', withId: 'v-loomcraft', kind: 'vendor', status: 'submit_bid', when: '2h ago' },
  { id: 'm-indigo', withId: 'v-indigo', kind: 'vendor', status: 'bid_received', when: '5h ago' },
  { id: 'm-saanjh', withId: 'v-saanjh', kind: 'vendor', status: 'messaged', when: '1d ago' },
  { id: 'm-kadwa', withId: 'v-kadwa', kind: 'vendor', status: 'submit_bid', when: '2d ago' },
  { id: 'm-nadi', withId: 'v-nadi', kind: 'vendor', status: 'messaged', when: '3d ago' },
  { id: 'm-anga', withId: 'v-anga', kind: 'vendor', status: 'submit_bid', when: '4d ago' }, // (authored 6th)
];

// Frame 05 "Liked you" — Aarav, Mira, Kala, Rhea.
export const inboundLikes: Match[] = [
  { id: 'l-aarav', withId: 'v-aarav', kind: 'vendor', status: 'submit_bid', when: 'new' },
  { id: 'l-mira', withId: 'v-mira', kind: 'vendor', status: 'submit_bid', when: 'new' },
  { id: 'l-kala', withId: 'v-kala', kind: 'vendor', status: 'submit_bid', when: 'new' },
  { id: 'l-rhea', withId: 'v-rhea', kind: 'vendor', status: 'submit_bid', when: 'new' },
];

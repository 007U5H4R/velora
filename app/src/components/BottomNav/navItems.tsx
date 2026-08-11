import { Compass, Heart, FileText, ShieldCheck, User } from 'lucide-react';
import type { ReactNode } from 'react';

export interface NavItem { id: string; label: string; icon: ReactNode; to: string; }

// Brand and Manufacturer share 5 slots; the middle tab label/target swaps by role (PRD §4).
export const brandNav: NavItem[] = [
  { id: 'discover', label: 'Discover', icon: <Compass />,    to: '/discover' },
  { id: 'matches',  label: 'Matches',  icon: <Heart />,      to: '/matches' },
  { id: 'rfps',     label: 'RFPs',     icon: <FileText />,   to: '/rfps' },
  { id: 'trust',    label: 'Trust',    icon: <ShieldCheck />,to: '/trust' },
  { id: 'profile',  label: 'Profile',  icon: <User />,       to: '/profile' },
];
export const manufacturerNav: NavItem[] = [
  { id: 'discover', label: 'Discover', icon: <Compass />,    to: '/discover' },
  { id: 'matches',  label: 'Matches',  icon: <Heart />,      to: '/matches' },
  { id: 'bids',     label: 'Bids',     icon: <FileText />,   to: '/bids' },
  { id: 'trust',    label: 'Trust',    icon: <ShieldCheck />,to: '/trust' },
  { id: 'profile',  label: 'Profile',  icon: <User />,       to: '/profile' },
];

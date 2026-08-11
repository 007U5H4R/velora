import { useNavigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { brandNav, manufacturerNav } from './navItems';
import { useStore } from '../../state/store';

// Role-aware, navigating wrapper around BottomNav. Picks brandNav/manufacturerNav
// from the store's role and turns taps into real route changes (PRD §4 / Task 5.3).
export function AppBottomNav({ activeId, badges }: { activeId: string; badges?: Record<string, number> }) {
  const navigate = useNavigate();
  const role = useStore((s) => s.role);
  const items = role === 'brand' ? brandNav : manufacturerNav;
  return (
    <BottomNav
      items={items}
      activeId={activeId}
      badges={badges}
      onNavigate={(_id, to) => navigate(to)}
    />
  );
}

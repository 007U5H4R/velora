import { useStore } from '../state/store';
import { BuyerDiscover } from './BuyerDiscover/BuyerDiscover';
import { VendorDiscover } from './VendorDiscover/VendorDiscover';

// Role-conditional switch for /discover: brand sees the vendor deck, manufacturer
// sees the RFP deck (Task 5.3).
export function DiscoverRoute() {
  const role = useStore((s) => s.role);
  return role === 'brand' ? <BuyerDiscover /> : <VendorDiscover />;
}

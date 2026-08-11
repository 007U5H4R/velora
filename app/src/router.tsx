import { createBrowserRouter } from 'react-router-dom';
import { Gallery } from './screens/Gallery/Gallery';
import { TrustProfile } from './screens/TrustProfile/TrustProfile';
import { BuyerDiscover } from './screens/BuyerDiscover/BuyerDiscover';
import { BuyerMatches } from './screens/BuyerMatches/BuyerMatches';
import { CreateRFP } from './screens/CreateRFP/CreateRFP';
import { BuyerRFPs } from './screens/BuyerRFPs/BuyerRFPs';
import { VendorDiscover } from './screens/VendorDiscover/VendorDiscover';
import { SubmitBid } from './screens/SubmitBid/SubmitBid';
import { BidsReceived } from './screens/BidsReceived/BidsReceived';

export const router = createBrowserRouter([
  { path: '/', element: <Gallery /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/vendor/:id', element: <TrustProfile /> },
  { path: '/discover', element: <BuyerDiscover /> },
  { path: '/matches', element: <BuyerMatches /> },
  { path: '/create-rfp', element: <CreateRFP /> },
  { path: '/rfps', element: <BuyerRFPs /> },
  { path: '/vendor-discover', element: <VendorDiscover /> },
  { path: '/submit-bid/:rfpId', element: <SubmitBid /> },
  { path: '/bids', element: <BidsReceived /> },
  { path: '/bids/:rfpId', element: <BidsReceived /> },
]);

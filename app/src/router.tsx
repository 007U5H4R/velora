import { createBrowserRouter } from 'react-router-dom';
import { RoleSelect } from './screens/RoleSelect/RoleSelect';
import { Gallery } from './screens/Gallery/Gallery';
import { TrustProfile } from './screens/TrustProfile/TrustProfile';
import { DiscoverRoute } from './screens/DiscoverRoute';
import { BuyerMatches } from './screens/BuyerMatches/BuyerMatches';
import { CreateRFP } from './screens/CreateRFP/CreateRFP';
import { BuyerRFPs } from './screens/BuyerRFPs/BuyerRFPs';
import { VendorDiscover } from './screens/VendorDiscover/VendorDiscover';
import { SubmitBid } from './screens/SubmitBid/SubmitBid';
import { BidsReceived } from './screens/BidsReceived/BidsReceived';
import { Chat } from './screens/Chat/Chat';
import { Profile } from './screens/Profile/Profile';
import { RootLayout } from './motion/RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <RoleSelect /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/vendor/:id', element: <TrustProfile /> },
      { path: '/discover', element: <DiscoverRoute /> },
      { path: '/matches', element: <BuyerMatches /> },
      { path: '/create-rfp', element: <CreateRFP /> },
      { path: '/rfps', element: <BuyerRFPs /> },
      { path: '/vendor-discover', element: <VendorDiscover /> },
      { path: '/submit-bid/:rfpId', element: <SubmitBid /> },
      { path: '/bids', element: <BidsReceived /> },
      { path: '/bids/:rfpId', element: <BidsReceived /> },
      { path: '/chat', element: <Chat /> },
      { path: '/chat/:vendorId', element: <Chat /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

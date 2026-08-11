import { createBrowserRouter } from 'react-router-dom';
import { Gallery } from './screens/Gallery/Gallery';
import { TrustProfile } from './screens/TrustProfile/TrustProfile';

export const router = createBrowserRouter([
  { path: '/', element: <Gallery /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/vendor/:id', element: <TrustProfile /> },
]);

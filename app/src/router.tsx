import { createBrowserRouter } from 'react-router-dom';
import { Gallery } from './screens/Gallery/Gallery';

export const router = createBrowserRouter([
  { path: '/', element: <Gallery /> },
  { path: '/gallery', element: <Gallery /> },
]);

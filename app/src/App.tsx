import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { hydrateFromSupabase } from './data/remote';

export default function App() {
  // One-time, non-blocking mount hydration: no-op unless Supabase is
  // configured (see src/lib/supabase.ts + src/data/remote.ts). The app
  // always renders the mock seed instantly; if configured, it swaps to
  // live data once the fetch resolves.
  useEffect(() => {
    void hydrateFromSupabase();
  }, []);

  return <RouterProvider router={router} />;
}

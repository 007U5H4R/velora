import { describe, test, expect } from 'vitest';
import { isSupabaseConfigured } from '../lib/supabase';
import { hydrateFromSupabase } from './remote';
import { appStore } from '../state/store';

describe('Supabase fallback', () => {
  test('hydrateFromSupabase() is a no-op when unconfigured — mock data stays intact', async () => {
    // No VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in this env (no .env.local
    // is ever committed) — this is the same default state the app ships in.
    expect(isSupabaseConfigured).toBe(false);

    const before = appStore.getState().vendorDeck;
    await hydrateFromSupabase();
    const after = appStore.getState();

    // Same array reference: setState was never called, nothing was touched.
    expect(after.vendorDeck).toBe(before);
    expect(after.vendorDeck.length).toBeGreaterThanOrEqual(10);
    expect(after.vendorDeck[0].name).toBe('Loomcraft');
  });
});

import loomcraftImg from './kalighat-parrot-loomcraft.png';
import genericImg from './kalighat-parrot.png';

const map: Record<string, string> = { loomcraft: loomcraftImg };
export function avatarUrl(slug?: string): string {
  if (slug && map[slug]) return map[slug];
  return genericImg; // faithful Kalighat fallback for all other vendors/brands
}

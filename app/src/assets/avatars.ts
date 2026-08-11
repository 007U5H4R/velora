import loomcraftImg from './kalighat-parrot-loomcraft.png';
import genericImg from './kalighat-parrot.png';
import noorImg from './avatars/noor.png';
import saanjhImg from './avatars/saanjh.png';
import indigoImg from './avatars/indigo.png';
import kadwaImg from './avatars/kadwa.png';
import nadiImg from './avatars/nadi.png';
import meherImg from './avatars/meher.png';
import ratnaImg from './avatars/ratna.png';
import surajImg from './avatars/suraj.png';
import vastraImg from './avatars/vastra.png';
import angaImg from './avatars/anga.png';
import aaravImg from './avatars/aarav.png';
import miraImg from './avatars/mira.png';
import kalaImg from './avatars/kala.png';
import rheaImg from './avatars/rhea.png';

// Kalighat pat-chitra avatars: Noor (buyer portrait) + one distinct folk-art
// creature per deck vendor. Inbound-likes + authored brands fall back to the
// generic Kalighat art until Phases 3–4 give them their own.
const map: Record<string, string> = {
  loomcraft: loomcraftImg,
  noor: noorImg,
  saanjh: saanjhImg,
  indigo: indigoImg,
  kadwa: kadwaImg,
  nadi: nadiImg,
  meher: meherImg,
  ratna: ratnaImg,
  suraj: surajImg,
  vastra: vastraImg,
  anga: angaImg,
  aarav: aaravImg,
  mira: miraImg,
  kala: kalaImg,
  rhea: rheaImg,
};

export function avatarUrl(slug?: string): string {
  if (slug && map[slug]) return map[slug];
  return genericImg; // faithful Kalighat fallback for any unmapped vendor/brand
}

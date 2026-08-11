// Garment line-icons exported verbatim from Figma (file AwWhewtdrQAGoS9jCs3uXi,
// nodes icon/tshirt·shirt·woven·denim·outer·tank). Stroke-based, stroke-width 1.5,
// round caps/joins — rendered with `currentColor` so they inherit text/accent color
// like the lucide icons used elsewhere. Each icon carries its native viewBox.
const ICONS: Record<string, { d: string; vb: string }> = {
  tshirt: { vb: '0 0 16 16', d: 'M5.66667 2.33333C5.66667 3.6 6.66667 4.33333 8 4.33333C9.33333 4.33333 10.3333 3.6 10.3333 2.33333L13 3.66667L14.3333 6L12 7.33333L11 6.33333V13.6667H5V6.33333L4 7.33333L1.66667 6L3 3.66667L5.66667 2.33333Z' },
  shirt: { vb: '0 0 16 16', d: 'M8 4.46667V13.3333M6 2.66667L8 4.33333L10 2.66667L13 4L14 6.33333L11.6667 7.33333L11.3333 6.8V13.6667H4.66667V6.8L4.33333 7.33333L2 6.33333L3 4L6 2.66667Z' },
  woven: { vb: '0 0 16 16', d: 'M2.66667 5.33333C4.44444 4.44444 6.22222 4.44444 8 5.33333C9.77778 6.22222 11.5556 6.22222 13.3333 5.33333M2.66667 8C4.44444 7.11111 6.22222 7.11111 8 8C9.77778 8.88889 11.5556 8.88889 13.3333 8M2.66667 10.6667C4.44444 9.77778 6.22222 9.77778 8 10.6667C9.77778 11.5556 11.5556 11.5556 13.3333 10.6667' },
  denim: { vb: '0 0 16 16', d: 'M5 4.33333H11M5 2.66667H11L11.3333 8L11.6667 13.6667H9L8 7.33333L7 13.6667H4.33333L4.66667 8L5 2.66667Z' },
  outer: { vb: '0 0 16 16', d: 'M8 4.33333L6 2.66667L3.66667 4L2.66667 6.33333L4.33333 7.33333L4.66667 6.66667V13.6667H11.3333V6.66667L11.6667 7.33333L13.3333 6.33333L12.3333 4L10 2.66667L8 4.33333ZM6 2.66667L7.33333 5M10 2.66667L8.66667 5M8 4.33333V13.6667' },
  tank: { vb: '0 0 22 22', d: 'M8.25 3.20833V5.5C9.16667 6.41667 10.0833 6.78333 11 6.78333C11.9167 6.78333 12.8333 6.41667 13.75 5.5V3.20833M7.88333 4.58333C7.60833 6.6 6.96667 7.7 5.95833 8.525L6.41667 18.7917H15.5833L16.0417 8.525C15.0333 7.7 14.3917 6.6 14.1167 4.58333' },
};

export type GarmentName = 'tshirt' | 'shirt' | 'woven' | 'denim' | 'outer' | 'tank';

export function GarmentIcon({ name, size = 16 }: { name: GarmentName; size?: number }) {
  const ic = ICONS[name];
  return (
    <svg width={size} height={size} viewBox={ic.vb} fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ic.d} />
    </svg>
  );
}

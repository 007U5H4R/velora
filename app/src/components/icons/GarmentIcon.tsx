// Garment line-icons exported verbatim from Figma (file AwWhewtdrQAGoS9jCs3uXi,
// nodes icon/tshirt·shirt·woven·denim·outer). Stroke-based, 16×16 viewBox,
// stroke-width 1.5, round caps/joins — rendered with `currentColor` so they inherit
// text/accent color like the lucide icons used elsewhere.
// (tank is added from frame 23:2 when Screen 06 RFPs is built.)
const PATHS = {
  tshirt:
    'M5.66667 2.33333C5.66667 3.6 6.66667 4.33333 8 4.33333C9.33333 4.33333 10.3333 3.6 10.3333 2.33333L13 3.66667L14.3333 6L12 7.33333L11 6.33333V13.6667H5V6.33333L4 7.33333L1.66667 6L3 3.66667L5.66667 2.33333Z',
  shirt:
    'M8 4.46667V13.3333M6 2.66667L8 4.33333L10 2.66667L13 4L14 6.33333L11.6667 7.33333L11.3333 6.8V13.6667H4.66667V6.8L4.33333 7.33333L2 6.33333L3 4L6 2.66667Z',
  woven:
    'M2.66667 5.33333C4.44444 4.44444 6.22222 4.44444 8 5.33333C9.77778 6.22222 11.5556 6.22222 13.3333 5.33333M2.66667 8C4.44444 7.11111 6.22222 7.11111 8 8C9.77778 8.88889 11.5556 8.88889 13.3333 8M2.66667 10.6667C4.44444 9.77778 6.22222 9.77778 8 10.6667C9.77778 11.5556 11.5556 11.5556 13.3333 10.6667',
  denim:
    'M5 4.33333H11M5 2.66667H11L11.3333 8L11.6667 13.6667H9L8 7.33333L7 13.6667H4.33333L4.66667 8L5 2.66667Z',
  outer:
    'M8 4.33333L6 2.66667L3.66667 4L2.66667 6.33333L4.33333 7.33333L4.66667 6.66667V13.6667H11.3333V6.66667L11.6667 7.33333L13.3333 6.33333L12.3333 4L10 2.66667L8 4.33333ZM6 2.66667L7.33333 5M10 2.66667L8.66667 5M8 4.33333V13.6667',
} as const;

export type GarmentName = keyof typeof PATHS;

export function GarmentIcon({ name, size = 16 }: { name: GarmentName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

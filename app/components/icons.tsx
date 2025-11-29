import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseSvgProps = (size?: number): SVGProps<SVGSVGElement> => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export function SparkIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M5.6 5.6l2.8 2.8" />
      <path d="M15.6 15.6l2.8 2.8" />
      <path d="M5.6 18.4l2.8-2.8" />
      <path d="M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

export function UsersIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function ShieldIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function GrowthIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 3 3 6-6" />
      <path d="m15 7 5 0 0 5" />
    </svg>
  );
}

export function ArrowUpIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <polyline points="18 9 12 3 6 9" />
      <line x1="12" x2="12" y1="3" y2="21" />
    </svg>
  );
}

export function ArrowDownIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...baseSvgProps(size)} {...rest}>
      <polyline points="6 15 12 21 18 15" />
      <line x1="12" x2="12" y1="3" y2="21" />
    </svg>
  );
}

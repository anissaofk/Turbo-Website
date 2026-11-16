import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconHome(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 13h18l-1.5-4.5A3 3 0 0 0 16.6 6.5H7.4A3 3 0 0 0 4.5 8.5L3 13Z" />
      <path d="M5 16h14" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconSwap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 7h11l-3-3" />
      <path d="M17 17H6l3 3" />
      <path d="M18 7v4M6 13v4" />
    </svg>
  );
}

export function IconWrench(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5Z" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <path d="M14.5 19c.3-1.8 1.8-3.2 4-3.5 1.5.2 3 1.2 3.5 3.5" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}

export function IconRobot(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 5v3M9 13h.01M15 13h.01M9 16h6" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19V8" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 13 12 21 3 12V3h9l8 10Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 12a7 7 0 0 1-7 7H7l-4 3V12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7Z" />
    </svg>
  );
}

export function IconTrend(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

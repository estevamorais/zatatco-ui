import type { SVGProps } from "react";

/**
 * Conjunto mínimo de ícones usados pelo Header e pelo Sidebar.
 *
 * Todos são SVG de traço 24x24 que herdam a cor via `currentColor`, então basta
 * definir `color` no elemento pai. Para usar sua própria biblioteca de ícones,
 * troque os componentes daqui — a assinatura é a de um `<svg>` comum.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10.5 12 3.5l9 7V20a1 1 0 0 1-1 1h-4.5v-6h-7v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </Icon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 8h14l-1 12.2a1 1 0 0 1-1 .8H7a1 1 0 0 1-1-.8L5 8Z" />
      <path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5" />
    </Icon>
  );
}

export function PageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5L13.5 3Z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M9.5 13h5M9.5 16.5h5" />
    </Icon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </Icon>
  );
}

export function DollarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v18" />
      <path d="M16 7.5c0-1.7-1.8-2.8-4-2.8s-4 1.1-4 2.8c0 4.3 8 2 8 6.3 0 1.8-1.8 3-4 3s-4-1.2-4-3" />
    </Icon>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5Z" />
      <path d="M3 8.5h15" />
      <path d="M16.5 13.5h1.5" />
    </Icon>
  );
}

export function GraphUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M7.5 15.5 11 11l3 2.5 4.5-6" />
      <path d="M18.5 7.5H15m3.5 0V11" />
    </Icon>
  );
}

export function HandCashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 13.5h2.5l3.2 3.2a2 2 0 0 0 1.4.6H14a1.5 1.5 0 0 0 0-3h-2.5" />
      <path d="M3 20h2.5l3.5 1h4.7a3 3 0 0 0 2-.8l4.1-3.8a1.6 1.6 0 0 0-2.2-2.3l-2.9 2.4" />
      <circle cx={15.5} cy={6.5} r={3.5} />
    </Icon>
  );
}

export function CoinsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <ellipse cx={9} cy={6.5} rx={5.5} ry={2.5} />
      <path d="M3.5 6.5v5c0 1.4 2.5 2.5 5.5 2.5" />
      <path d="M3.5 11.5v5c0 1.4 2.5 2.5 5.5 2.5h.5" />
      <ellipse cx={16} cy={13.5} rx={4.5} ry={2} />
      <path d="M11.5 13.5v4c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-4" />
    </Icon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 9a6 6 0 0 0-12 0c0 4.5-1.5 5.8-2 6.5a.6.6 0 0 0 .5 1h15a.6.6 0 0 0 .5-1c-.5-.7-2-2-2-6.5Z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </Icon>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6Z" />
      <circle cx={12} cy={12} r={2.8} />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 15 6-6 6 6" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="m8 12 2.8 2.8L16 9.5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 6.5h15" />
      <path d="M9.5 6.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5" />
      <path d="M6.5 6.5 7.4 20a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l.9-13.5" />
    </Icon>
  );
}

export function TransferIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9h11m0 0-3-3m3 3-3 3" />
      <path d="M20 15H9m0 0 3-3m-3 3 3 3" />
    </Icon>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={8} cy={12} r={4} />
      <path d="M12 12h8" />
      <path d="M17 12v3M20 12v2.5" />
    </Icon>
  );
}

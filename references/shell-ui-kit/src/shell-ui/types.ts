import type { ComponentType, SVGProps } from "react";

/** Assinatura dos ícones do kit (ver `icons.tsx`). Qualquer componente SVG serve. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface MenuChildItem {
  label: string;
  /** Caminho da rota, com ou sem barra inicial. Ex.: "v1/pix" ou "/v1/pix". */
  path: string;
  /** Texto do selo exibido à direita do item (ex.: "Novo"). Omita para não exibir. */
  badge?: string;
}

export interface MenuItem {
  label: string;
  icon: IconComponent;
  path: string;
  children?: MenuChildItem[];
}

export interface Company {
  id: string;
  name: string;
  /** CNPJ/CPF já formatado para exibição. */
  document: string;
}

export interface CurrentUser {
  displayName: string;
  /** Iniciais exibidas no avatar. Ex.: "MA". */
  initials: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body?: string;
  /** Epoch em milissegundos. Usado para ordenar e agrupar por mês. */
  timestamp: number;
  read: boolean;
}

export interface AccountMenuItem {
  label: string;
  onClick?: () => void;
}

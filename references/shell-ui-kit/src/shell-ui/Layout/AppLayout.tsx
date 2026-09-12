import type { ReactNode } from "react";
import { Header, type HeaderProps } from "../Header/Header";
import { Sidebar, type SidebarProps } from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: ReactNode;
  /** Props repassadas ao Sidebar (itens, activePath, onNavigate, logo...). */
  sidebarProps?: SidebarProps;
  /** Props repassadas ao Header (user, companies, notifications...). */
  headerProps?: HeaderProps;
}

/**
 * Composição de referência: sidebar fixo com faixa de 80px reservada + header
 * de 88px + área de conteúdo.
 *
 * O sidebar é `position: fixed` e cresce por cima do conteúdo ao expandir, do
 * mesmo jeito que no shell original — por isso o `padding-left` de 80px aqui.
 * Se preferir empurrar o conteúdo em vez de sobrepor, escute `onExpandedChange`
 * no Sidebar e anime esse padding.
 */
export function AppLayout({ children, sidebarProps, headerProps }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar {...sidebarProps} />

      <div className={styles.main}>
        <div className={styles.headerSlot}>
          <Header {...headerProps} />
        </div>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

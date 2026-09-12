import { useEffect, useState, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../icons";
import { LogoFull, LogoMark } from "../Logo";
import { mockMenuItems } from "../mocks/menuItems";
import type { MenuChildItem, MenuItem } from "../types";
import { useSidebar } from "./useSidebar";
import styles from "./Sidebar.module.css";

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
  isExpanded: boolean;
  onNavigate: (path: string) => void;
  isChildActive: (child: MenuChildItem) => boolean;
}

function SidebarItem({ item, isActive, isExpanded, onNavigate, isChildActive }: SidebarItemProps) {
  const [opened, setOpened] = useState(false);
  const hasChildren = !!item.children?.length;

  // Ao colapsar, o submenu some da tela; zeramos o estado para não reabrir
  // sozinho no próximo hover.
  useEffect(() => {
    if (!isExpanded) {
      setOpened(false);
    }
  }, [isExpanded]);

  const handleClick = () => {
    if (hasChildren && isExpanded) {
      setOpened((current) => !current);
      return;
    }
    onNavigate(item.path);
  };

  const ChevronIcon = opened ? ChevronUpIcon : ChevronDownIcon;
  const ItemIcon = item.icon;
  const submenuId = `shell-submenu-${item.path.replace(/\W+/g, "-")}`;

  return (
    <>
      <button
        type="button"
        className={`${styles.item} ${isActive && !hasChildren ? styles.itemActive : ""}`}
        onClick={handleClick}
        aria-current={isActive && !hasChildren ? "page" : undefined}
        aria-expanded={hasChildren && isExpanded ? opened : undefined}
        aria-controls={hasChildren && isExpanded ? submenuId : undefined}
        title={isExpanded ? undefined : item.label}
      >
        <span className={`${styles.itemRow} ${isExpanded ? styles.itemRowExpanded : ""}`}>
          <span className={styles.itemLabelGroup}>
            <ItemIcon className={styles.itemIcon} width={24} height={24} />
            {isExpanded && <span className={styles.itemLabel}>{item.label}</span>}
          </span>
          {hasChildren && isExpanded && <ChevronIcon className={styles.chevron} width={16} height={16} />}
        </span>
      </button>

      {hasChildren && isExpanded && (
        <div className={`${styles.collapse} ${opened ? styles.collapseOpen : ""}`}>
          <div className={styles.collapseInner}>
            <div className={styles.submenu} id={submenuId}>
              {item.children?.map((child) => {
                const active = isChildActive(child);
                return (
                  <button
                    type="button"
                    key={child.path}
                    className={`${styles.subItem} ${active ? styles.subItemActive : ""}`}
                    onClick={() => onNavigate(child.path)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.subItemLabel}>{child.label}</span>
                    {child.badge ? <span className={styles.badge}>{child.badge}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export interface SidebarProps {
  /** Itens do menu. Padrão: menu mocado de `mocks/menuItems.ts`. */
  items?: MenuItem[];
  /** Caminho ativo controlado. Se omitido, o sidebar marca o ativo sozinho. */
  activePath?: string;
  /** Caminho ativo inicial quando não controlado. */
  defaultActivePath?: string;
  /** Chamado ao clicar num item navegável — ligue seu router aqui. */
  onNavigate?: (path: string) => void;
  /** Notifica a expansão/colapso (para o layout reagir, se precisar). */
  onExpandedChange?: (expanded: boolean) => void;
  /** Substitui o bloco da logo por completo. */
  logo?: ReactNode;
  className?: string;
}

/**
 * Menu lateral que expande de 80px para 280px ao passar o mouse.
 *
 * O elemento é `position: fixed`, então a largura expandida se sobrepõe ao
 * conteúdo — reserve a faixa de 80px no layout (ver `AppLayout`).
 */
export function Sidebar({
  items = mockMenuItems,
  activePath,
  defaultActivePath,
  onNavigate,
  onExpandedChange,
  logo,
  className,
}: SidebarProps) {
  const {
    isExpanded,
    setIsExpanded,
    containerWidth,
    handleNavigate,
    isItemActive,
    isChildActive,
  } = useSidebar({ activePath, defaultActivePath, onNavigate });

  const setExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
    onExpandedChange?.(expanded);
  };

  return (
    <aside
      className={`${styles.sidebar} ${className ?? ""}`}
      style={{ width: containerWidth, minWidth: containerWidth }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      // Teclado: o foco entrando no menu expande, sair colapsa.
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setExpanded(false);
        }
      }}
      aria-label="Menu principal"
    >
      <div className={styles.logoBlock}>
        {logo ?? (
          <>
            {isExpanded ? (
              <LogoFull className={styles.logo} style={{ width: 140 }} />
            ) : (
              <LogoMark className={styles.logo} style={{ width: 40 }} />
            )}
          </>
        )}
      </div>

      <nav className={styles.nav}>
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            isActive={isItemActive(item)}
            isExpanded={isExpanded}
            onNavigate={handleNavigate}
            isChildActive={isChildActive}
          />
        ))}
      </nav>
    </aside>
  );
}

import { useCallback, useState } from "react";
import type { MenuChildItem, MenuItem } from "../types";

const COLLAPSED_WIDTH = 80;
const EXPANDED_WIDTH = 280;

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

interface UseSidebarOptions {
  /** Caminho ativo controlado. Se omitido, o sidebar controla o ativo internamente. */
  activePath?: string;
  /** Caminho ativo inicial quando não controlado. */
  defaultActivePath?: string;
  /** Chamado ao clicar em um item navegável. Ligue aqui seu router. */
  onNavigate?: (path: string) => void;
}

/**
 * Estado do sidebar: expansão por hover e resolução do item ativo.
 *
 * A expansão é um `useState` simples — sem contexto, sem store. Quem quiser
 * controlar a largura de fora pode ler `isExpanded` via `onExpandedChange` no
 * componente `Sidebar`.
 */
export function useSidebar({ activePath, defaultActivePath = "/", onNavigate }: UseSidebarOptions = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [internalPath, setInternalPath] = useState(() => normalizePath(defaultActivePath));

  const isControlled = activePath !== undefined;
  const currentPath = normalizePath(isControlled ? activePath : internalPath);
  const containerWidth = isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  const handleNavigate = useCallback(
    (path: string) => {
      const nextPath = normalizePath(path);
      if (!isControlled) {
        setInternalPath(nextPath);
      }
      onNavigate?.(nextPath);
    },
    [isControlled, onNavigate],
  );

  const isChildActive = useCallback(
    (child: MenuChildItem) => currentPath === normalizePath(child.path),
    [currentPath],
  );

  const isItemActive = useCallback(
    (item: MenuItem) => {
      const itemPath = normalizePath(item.path);
      return (
        currentPath === itemPath ||
        currentPath.startsWith(`${itemPath}/`) ||
        (item.children?.some(isChildActive) ?? false)
      );
    },
    [currentPath, isChildActive],
  );

  return {
    isExpanded,
    setIsExpanded,
    containerWidth,
    activePath: currentPath,
    handleNavigate,
    isItemActive,
    isChildActive,
  };
}

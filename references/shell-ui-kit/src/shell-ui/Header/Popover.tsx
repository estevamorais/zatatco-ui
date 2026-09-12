import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Popover.module.css";

interface PopoverProps {
  opened: boolean;
  onClose: () => void;
  /** Alinhamento do dropdown em relação ao gatilho. */
  align?: "start" | "end";
  /** O gatilho (botão). Fica dentro do wrapper relativo. */
  trigger: ReactNode;
  children: ReactNode;
  /** Largura do dropdown. Padrão: acompanha o conteúdo. */
  dropdownWidth?: number | string;
  className?: string;
}

/**
 * Popover mínimo: ancora o dropdown no gatilho, fecha em clique externo e Esc.
 * Substitui o `Popover` do design system sem trazer nenhuma dependência.
 */
export function Popover({
  opened,
  onClose,
  align = "start",
  trigger,
  children,
  dropdownWidth,
  className,
}: PopoverProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [opened, onClose]);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`} ref={wrapperRef}>
      {trigger}
      {opened && (
        <div
          className={`${styles.dropdown} ${align === "end" ? styles.alignEnd : styles.alignStart}`}
          style={dropdownWidth ? { width: dropdownWidth } : undefined}
          role="dialog"
        >
          {children}
        </div>
      )}
    </div>
  );
}

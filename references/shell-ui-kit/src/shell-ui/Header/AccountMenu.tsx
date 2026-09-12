import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, KeyIcon } from "../icons";
import { mockAccountMenuItems } from "../mocks/user";
import type { AccountMenuItem } from "../types";
import { Popover } from "./Popover";
import styles from "./AccountMenu.module.css";

export interface AccountMenuProps {
  userName: string;
  userInitials: string;
  /** Itens do dropdown. Padrão: itens mocados. */
  items?: AccountMenuItem[];
  /** Ação do botão "Sair". Sem isso, o botão só fecha o menu. */
  onLogout?: () => void;
}

/** Avatar + nome do usuário com dropdown de conta. */
export function AccountMenu({
  userName,
  userInitials,
  items = mockAccountMenuItems,
  onLogout,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (action?: () => void) => {
    setIsOpen(false);
    action?.();
  };

  return (
    <Popover
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      align="end"
      dropdownWidth={380}
      trigger={
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className={styles.avatar} aria-hidden="true">
            {userInitials}
          </span>
          <span className={styles.userName}>{userName}</span>
          <ChevronDownIcon
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
            width={24}
            height={24}
          />
        </button>
      }
    >
      <div className={styles.dropdownBody}>
        {items.map((item) => (
          <button
            type="button"
            key={item.label}
            className={styles.menuItem}
            onClick={() => handleItemClick(item.onClick)}
          >
            <span className={styles.menuItemLabel}>
              <KeyIcon className={styles.menuItemIcon} width={24} height={24} />
              {item.label}
            </span>
            <ChevronRightIcon className={styles.menuItemArrow} width={18} height={18} />
          </button>
        ))}

        <button
          type="button"
          className={styles.logoutButton}
          onClick={() => handleItemClick(onLogout)}
        >
          Sair
        </button>
      </div>
    </Popover>
  );
}

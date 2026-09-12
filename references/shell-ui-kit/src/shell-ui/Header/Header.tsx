import { useCallback, useState } from "react";
import { BellIcon, EyeIcon } from "../icons";
import { mockCompanies } from "../mocks/companies";
import { mockNotifications } from "../mocks/notifications";
import { mockAccountMenuItems, mockUser } from "../mocks/user";
import type { AccountMenuItem, AppNotification, Company, CurrentUser } from "../types";
import { AccountMenu } from "./AccountMenu";
import { CompanySelector } from "./CompanySelector";
import { NotificationPanel } from "./NotificationPanel";
import styles from "./Header.module.css";

export interface HeaderProps {
  /** Usuário exibido no avatar. Padrão: usuário mocado. */
  user?: CurrentUser;
  /** Empresas do seletor. Padrão: empresas mocadas. */
  companies?: Company[];
  /** Notificações iniciais do sino. Padrão: notificações mocadas. */
  notifications?: AppNotification[];
  /** Itens do dropdown de conta. Padrão: itens mocados. */
  accountMenuItems?: AccountMenuItem[];
  onSelectCompany?: (company: Company) => void;
  onLogout?: () => void;
  /** Oculta o sino de notificações. */
  hideNotifications?: boolean;
  className?: string;
}

/**
 * Barra superior: seletor de empresa à esquerda; sino, "olho" e menu de conta
 * à direita.
 *
 * As notificações são mantidas em estado local (mock). Para plugar uma API,
 * troque o `useState` abaixo por seu hook e repasse os handlers.
 */
export function Header({
  user = mockUser,
  companies = mockCompanies,
  notifications: initialNotifications = mockNotifications,
  accountMenuItems = mockAccountMenuItems,
  onSelectCompany,
  onLogout,
  hideNotifications = false,
  className,
}: HeaderProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }, []);

  return (
    <header className={`${styles.header} ${className ?? ""}`}>
      <CompanySelector companies={companies} onSelectCompany={onSelectCompany} />

      <div className={styles.actions}>
        {!hideNotifications && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsPanelOpen((current) => !current)}
            aria-expanded={isPanelOpen}
            aria-haspopup="dialog"
            aria-label={unreadCount > 0 ? `Notificações (${unreadCount} não lidas)` : "Notificações"}
          >
            <span className={`${styles.bell} ${unreadCount > 0 ? styles.bellRinging : ""}`}>
              <BellIcon width={24} height={24} />
              {unreadCount > 0 ? <span className={styles.bellDot} data-testid="bell-unread-dot" /> : null}
            </span>
          </button>
        )}

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setIsBalanceHidden((current) => !current)}
          aria-pressed={isBalanceHidden}
          aria-label={isBalanceHidden ? "Exibir saldos" : "Ocultar saldos"}
        >
          <EyeIcon width={24} height={24} />
        </button>

        <AccountMenu
          userName={user.displayName}
          userInitials={user.initials}
          items={accountMenuItems}
          onLogout={onLogout}
        />
      </div>

      {isPanelOpen && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setIsPanelOpen(false)}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onRemove={removeNotification}
        />
      )}
    </header>
  );
}

import { useEffect, useMemo, useState } from "react";
import { CheckIcon, CloseIcon, TransferIcon, TrashIcon } from "../icons";
import type { AppNotification } from "../types";
import styles from "./NotificationPanel.module.css";

function formatMonthHeading(timestamp: number): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" })
      .format(new Date(timestamp))
      .toLowerCase();
  } catch {
    return "";
  }
}

function formatShortDayMonth(timestamp: number): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

function groupByMonth(notifications: AppNotification[]) {
  const groups: { label: string; items: AppNotification[] }[] = [];
  for (const notification of notifications) {
    const label = formatMonthHeading(notification.timestamp);
    const previous = groups[groups.length - 1];
    if (previous && previous.label === label) {
      previous.items.push(notification);
    } else {
      groups.push({ label, items: [notification] });
    }
  }
  return groups;
}

interface NotificationPanelProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemove: (id: string) => void;
}

/** Painel aberto pelo sino. Clicar num item revela as ações daquele item. */
export function NotificationPanel({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
}: NotificationPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const groups = useMemo(
    () => groupByMonth([...notifications].sort((a, b) => b.timestamp - a.timestamp)),
    [notifications],
  );
  const hasUnread = notifications.some((notification) => !notification.read);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <div className={styles.panel} role="dialog" aria-label="Notificações">
        <div className={styles.header}>
          <span className={styles.title}>Notificações</span>
          <div className={styles.headerActions}>
            {hasUnread && (
              <button type="button" className={styles.markAllButton} onClick={onMarkAllAsRead}>
                Marcar todas como lidas
              </button>
            )}
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
              <CloseIcon width={18} height={18} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {notifications.length === 0 ? (
            <div className={styles.empty}>Você não tem notificações.</div>
          ) : (
            groups.map((group) => (
              <div key={group.label}>
                <div className={styles.monthHeading}>{group.label}</div>
                {group.items.map((notification) => {
                  const isSelected = selectedId === notification.id;
                  return (
                    <div key={notification.id}>
                      <button
                        type="button"
                        className={styles.item}
                        onClick={() => setSelectedId(isSelected ? null : notification.id)}
                        aria-expanded={isSelected}
                      >
                        <span className={styles.itemIcon}>
                          <TransferIcon width={20} height={20} />
                        </span>
                        <span className={styles.itemText}>
                          <span
                            className={`${styles.itemTitle} ${notification.read ? "" : styles.itemTitleUnread}`}
                          >
                            {notification.title}
                          </span>
                          {notification.body ? (
                            <span className={styles.itemBody}>{notification.body}</span>
                          ) : null}
                          <span className={styles.itemFooter}>
                            <span className={styles.itemDate}>
                              {formatShortDayMonth(notification.timestamp)}
                            </span>
                            {!notification.read ? <span className={styles.unreadDot} /> : null}
                          </span>
                        </span>
                      </button>

                      {isSelected && (
                        <div className={styles.actionMenu}>
                          {!notification.read && (
                            <button
                              type="button"
                              className={styles.actionItem}
                              onClick={() => {
                                onMarkAsRead(notification.id);
                                setSelectedId(null);
                              }}
                            >
                              <CheckIcon className={styles.actionIconSuccess} width={18} height={18} />
                              Marcar como lida
                            </button>
                          )}
                          <button
                            type="button"
                            className={styles.actionItem}
                            onClick={() => {
                              onRemove(notification.id);
                              setSelectedId(null);
                            }}
                          >
                            <TrashIcon className={styles.actionIconDanger} width={18} height={18} />
                            Remover notificação
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

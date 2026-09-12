/**
 * shell-ui — Header + Sidebar standalone.
 *
 * Uso mínimo:
 *   import "./shell-ui/tokens.css";
 *   import { AppLayout } from "./shell-ui";
 */

export { AppLayout } from "./Layout/AppLayout";

export { Header } from "./Header/Header";
export type { HeaderProps } from "./Header/Header";
export { CompanySelector } from "./Header/CompanySelector";
export type { CompanySelectorProps } from "./Header/CompanySelector";
export { AccountMenu } from "./Header/AccountMenu";
export type { AccountMenuProps } from "./Header/AccountMenu";
export { NotificationPanel } from "./Header/NotificationPanel";
export { Popover } from "./Header/Popover";

export { Sidebar } from "./Sidebar/Sidebar";
export type { SidebarProps } from "./Sidebar/Sidebar";
export { useSidebar } from "./Sidebar/useSidebar";

export { LogoFull, LogoMark } from "./Logo";
export * from "./icons";

export type {
  AccountMenuItem,
  AppNotification,
  Company,
  CurrentUser,
  IconComponent,
  MenuChildItem,
  MenuItem,
} from "./types";

export { mockMenuItems } from "./mocks/menuItems";
export { mockCompanies } from "./mocks/companies";
export { mockNotifications } from "./mocks/notifications";
export { mockAccountMenuItems, mockUser } from "./mocks/user";

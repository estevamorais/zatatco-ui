import type { AccountMenuItem, CurrentUser } from "../types";

/** Usuário mocado exibido no avatar + menu de conta. */
export const mockUser: CurrentUser = {
  displayName: "Maria Almeida",
  initials: "MA",
};

/** Itens mocados do dropdown do menu de conta. */
export const mockAccountMenuItems: AccountMenuItem[] = [
  { label: "Alterar senha" },
  { label: "Empresa padrão" },
  { label: "Dispositivos autorizados" },
];

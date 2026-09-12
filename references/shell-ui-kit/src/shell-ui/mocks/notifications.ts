import type { AppNotification } from "../types";

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

/**
 * Notificações mocadas. Os timestamps são relativos a "agora" para que o
 * agrupamento por mês do painel sempre tenha o que mostrar.
 */
export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Transferência recebida",
    body: "Você recebeu R$ 12.480,00 de Acme Logística ME.",
    timestamp: now - 2 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: "n2",
    title: "Pagamento agendado aprovado",
    body: "O pagamento de R$ 3.200,00 agendado para amanhã foi aprovado por João Pereira.",
    timestamp: now - 1 * DAY,
    read: false,
  },
  {
    id: "n3",
    title: "Novo boleto disponível",
    body: "Um boleto no valor de R$ 890,15 com vencimento em 10 dias foi registrado.",
    timestamp: now - 4 * DAY,
    read: true,
  },
  {
    id: "n4",
    title: "Limite transacional alterado",
    body: "O limite diário de Pix foi alterado para R$ 50.000,00.",
    timestamp: now - 38 * DAY,
    read: true,
  },
  {
    id: "n5",
    title: "Arquivo de remessa processado",
    body: "O arquivo REM0093.txt foi processado com 42 títulos aceitos.",
    timestamp: now - 45 * DAY,
    read: true,
  },
];

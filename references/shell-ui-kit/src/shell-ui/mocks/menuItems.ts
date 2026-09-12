import type { MenuItem } from "../types";
import {
  ArrowUpRightIcon,
  BagIcon,
  CoinsIcon,
  DollarIcon,
  GraphUpIcon,
  HandCashIcon,
  HomeIcon,
  PageIcon,
  WalletIcon,
} from "../icons";

/**
 * Menu mocado — troque pelos itens do seu produto.
 *
 * Cada item de primeiro nível precisa de `label`, `icon` e `path`. Itens com
 * `children` não navegam no clique: abrem/fecham o submenu (e só quando o
 * sidebar está expandido, como no original).
 */
export const mockMenuItems: MenuItem[] = [
  { label: "Home", icon: HomeIcon, path: "/dashboard" },
  { label: "Oportunidades", icon: BagIcon, path: "/oportunidades" },
  { label: "Extrato", icon: PageIcon, path: "/extrato" },
  {
    label: "Transações",
    icon: ArrowUpRightIcon,
    path: "/transacoes",
    children: [
      { label: "Aprovações", path: "/transacoes/aprovacoes" },
      { label: "DDA", path: "/transacoes/dda" },
      { label: "Comprovantes", path: "/transacoes/comprovantes" },
      { label: "Alterar limites transacionais", path: "/transacoes/limites" },
      { label: "Pagamentos", path: "/transacoes/pagamentos", badge: "Novo" },
      { label: "Pix", path: "/transacoes/pix" },
      { label: "Transferências", path: "/transacoes/transferencias" },
    ],
  },
  {
    label: "Cobrança",
    icon: DollarIcon,
    path: "/cobranca",
    children: [
      { label: "Transferências de arquivos", path: "/cobranca/arquivos" },
      { label: "Cadastrar título", path: "/cobranca/cadastrar-titulo" },
      { label: "Consulta", path: "/cobranca/consulta" },
      { label: "Segunda via de boleto", path: "/cobranca/segunda-via" },
    ],
  },
  {
    label: "Produtos",
    icon: WalletIcon,
    path: "/produtos",
    children: [
      { label: "Comércio Exterior", path: "/produtos/comercio-exterior" },
      { label: "Capital Ágil", path: "/produtos/capital-agil", badge: "Novo" },
      { label: "Derivativos", path: "/produtos/derivativos" },
    ],
  },
  { label: "Investimentos", icon: GraphUpIcon, path: "/investimentos" },
  { label: "Operações de Crédito", icon: HandCashIcon, path: "/operacoes-credito" },
  { label: "Informe de rendimentos", icon: CoinsIcon, path: "/informe-rendimentos" },
];

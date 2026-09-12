# shell-ui — Header + Sidebar standalone

Header e menu lateral extraídos de um shell bancário e reescritos **sem nenhuma dependência**
além do React. Sem design system privado, sem Mantine, sem styled-components, sem `.npmrc`.
Todos os dados são mocados e trocáveis por props.

O que vem pronto:

- **Sidebar** que expande de 80px para 280px no hover, com submenus, item ativo e selo "Novo".
- **Header** com seletor de empresa, sino com painel de notificações, botão de ocultar saldos e
  menu de conta com avatar.
- **AppLayout** de exemplo, juntando os dois com uma área de conteúdo.

## Requisitos

- React 18 ou 19
- TypeScript
- Um bundler com suporte a CSS Modules — Vite, Next.js e CRA suportam por padrão.

## Instalação

1. Copie `src/shell-ui/` para dentro do `src/` do seu projeto.
2. Importe os tokens **uma vez**, no entrypoint (`main.tsx`, `App.tsx` ou `app/layout.tsx`):

```ts
import "./shell-ui/tokens.css";
```

3. Use o layout:

```tsx
import "./shell-ui/tokens.css";
import { AppLayout } from "./shell-ui";

export default function App() {
  return (
    <AppLayout>
      <h1>Conteúdo da página</h1>
    </AppLayout>
  );
}
```

Isso já roda: sidebar abrindo no hover, dropdowns funcionando, notificações mocadas.

> **Next.js (app router):** os componentes usam estado e eventos, então marque o arquivo que os
> importa com `"use client"`.

## Usando os componentes separadamente

```tsx
import { Header, Sidebar } from "./shell-ui";

<div style={{ display: "flex", minHeight: "100vh" }}>
  <Sidebar />
  <div style={{ flex: 1, paddingLeft: 80 }}>
    <div style={{ height: 88 }}>
      <Header />
    </div>
    <main>{/* ... */}</main>
  </div>
</div>;
```

O `Sidebar` é `position: fixed` e cresce **por cima** do conteúdo ao expandir (igual ao original),
por isso a faixa de 80px reservada com `padding-left`. Se preferir empurrar o conteúdo, escute
`onExpandedChange` e anime esse padding.

## Trocando os mocks por dados reais

Tudo é prop, e toda prop tem um default mocado. Nada precisa ser alterado dentro dos componentes.

### Sidebar

```tsx
import { Sidebar, type MenuItem } from "./shell-ui";
import { HomeIcon } from "./shell-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

const items: MenuItem[] = [
  { label: "Home", icon: HomeIcon, path: "/dashboard" },
  {
    label: "Transações",
    icon: HomeIcon,
    path: "/transacoes",
    children: [
      { label: "Pix", path: "/transacoes/pix" },
      { label: "Pagamentos", path: "/transacoes/pagamentos", badge: "Novo" },
    ],
  },
];

const navigate = useNavigate();
const { pathname } = useLocation();

<Sidebar items={items} activePath={pathname} onNavigate={navigate} logo={<MinhaLogo />} />;
```

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `items` | `MenuItem[]` | menu mocado |
| `activePath` | `string` | não controlado (marca o ativo sozinho) |
| `defaultActivePath` | `string` | `"/"` |
| `onNavigate` | `(path: string) => void` | — |
| `onExpandedChange` | `(expanded: boolean) => void` | — |
| `logo` | `ReactNode` | `LogoMark` / `LogoFull` |

Itens com `children` **não navegam** no clique: abrem/fecham o submenu, e só quando o sidebar
está expandido — comportamento idêntico ao do shell original.

### Header

```tsx
<Header
  user={{ displayName: "Maria Almeida", initials: "MA" }}
  companies={companiesFromApi}
  notifications={notificationsFromApi}
  accountMenuItems={[{ label: "Alterar senha", onClick: openPasswordModal }]}
  onSelectCompany={(company) => selectCompany(company.id)}
  onLogout={logout}
/>
```

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `user` | `CurrentUser` | usuário mocado |
| `companies` | `Company[]` | 3 empresas mocadas |
| `notifications` | `AppNotification[]` | 5 notificações mocadas |
| `accountMenuItems` | `AccountMenuItem[]` | itens mocados |
| `onSelectCompany` | `(company: Company) => void` | — |
| `onLogout` | `() => void` | — |
| `hideNotifications` | `boolean` | `false` |

As notificações vivem em estado local dentro do `Header` (marcar como lida, marcar todas,
remover). Para persistir no backend, copie o `Header.tsx` e troque o `useState` pelo seu hook —
os handlers passados ao `NotificationPanel` são os pontos de ligação.

### Tipos

```ts
interface MenuItem      { label: string; icon: IconComponent; path: string; children?: MenuChildItem[] }
interface MenuChildItem { label: string; path: string; badge?: string }
interface Company       { id: string; name: string; document: string }
interface CurrentUser   { displayName: string; initials: string }
interface AppNotification { id: string; title: string; body?: string; timestamp: number; read: boolean }
interface AccountMenuItem { label: string; onClick?: () => void }
```

## Identidade visual

Todas as cores, espaçamentos e dimensões estão em [`tokens.css`](src/shell-ui/tokens.css) como
variáveis CSS. Sobrescreva depois do import para rebrandar sem tocar nos componentes:

```css
:root {
  --shell-azul-primario: #1b3a2f;   /* fundo do sidebar */
  --shell-azul-agilidade: #2e9e6b;  /* bloco da logo, destaques, foco */
  --shell-font-family: "Inter", system-ui, sans-serif;
}
```

Larguras do sidebar (`--shell-sidebar-width-collapsed` / `-expanded`) e altura do header
(`--shell-header-height`) também são tokens.

**Logo:** [`Logo.tsx`](src/shell-ui/Logo.tsx) tem um placeholder com duas variantes — `LogoMark`
(colapsado, ~1:1) e `LogoFull` (expandido, ~3.5:1). Substitua o conteúdo pelos seus SVGs mantendo
as proporções, ou passe `logo={<SuaLogo />}` ao `Sidebar` para trocar o bloco inteiro.

**Ícones:** [`icons.tsx`](src/shell-ui/icons.tsx) traz 20 ícones de traço 24x24 que herdam a cor
via `currentColor`. Para usar sua biblioteca (lucide, iconoir, heroicons), basta passar os
componentes dela em `MenuItem.icon` — a assinatura é a de um `<svg>` comum.

## Estrutura

```
src/shell-ui/
  index.ts                  barrel de exports
  tokens.css                variáveis CSS (único import global)
  types.ts                  MenuItem, Company, AppNotification, ...
  icons.tsx                 ícones SVG inline
  Logo.tsx                  logo placeholder (ponto de troca)
  css-modules.d.ts          tipagem de *.module.css (apague se já tiver)
  Sidebar/
    Sidebar.tsx             Sidebar + SidebarItem + submenu
    Sidebar.module.css
    useSidebar.ts           hover/expansão e resolução do item ativo
  Header/
    Header.tsx              barra superior
    CompanySelector.tsx     seletor de empresa
    AccountMenu.tsx         avatar + dropdown de conta
    NotificationPanel.tsx   painel do sino
    Popover.tsx             popover mínimo (clique fora + Esc)
    *.module.css
  Layout/
    AppLayout.tsx           composição de referência
    AppLayout.module.css
  mocks/
    menuItems.ts  companies.ts  notifications.ts  user.ts
```

## Acessibilidade

Itens de menu e gatilhos são `<button>` reais, navegáveis por teclado. O sidebar também expande
quando o foco entra nele via Tab. Os dropdowns fecham com `Esc` e com clique fora. `:focus-visible`
usa `--shell-azul-agilidade`. Animações (largura do sidebar, balanço do sino, entrada dos popovers)
respeitam `prefers-reduced-motion`.

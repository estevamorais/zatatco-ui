import type { SVGProps } from "react";

/**
 * Logo placeholder do sidebar — PONTO DE TROCA.
 *
 * O sidebar troca entre as duas variantes conforme expande:
 *   - `LogoMark`: colapsado (80px), símbolo quadrado de ~40px
 *   - `LogoFull`: expandido (280px), símbolo + wordmark de ~140px
 *
 * Substitua o conteúdo dos dois componentes pela sua marca (SVG inline, <img>
 * ou o que preferir). Mantenha as proporções (mark ~1:1, full ~3.5:1) para não
 * quebrar a animação de troca. Ambos desenham em branco sobre o bloco azul.
 */

type LogoProps = SVGProps<SVGSVGElement>;

export function LogoMark(props: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" role="img" aria-label="Logo" {...props}>
      <rect width={48} height={48} rx={12} fill="rgba(255,255,255,0.16)" />
      <path
        d="M17 34V15a1 1 0 0 1 1-1h13v4.4h-9.4v5h8.2v4.4h-8.2V34H17Z"
        fill="#fff"
      />
    </svg>
  );
}

export function LogoFull(props: LogoProps) {
  return (
    <svg viewBox="0 0 168 48" fill="none" role="img" aria-label="Logo" {...props}>
      <rect width={48} height={48} rx={12} fill="rgba(255,255,255,0.16)" />
      <path
        d="M17 34V15a1 1 0 0 1 1-1h13v4.4h-9.4v5h8.2v4.4h-8.2V34H17Z"
        fill="#fff"
      />
      <text
        x={62}
        y={31}
        fill="#fff"
        fontFamily="var(--shell-font-family)"
        fontSize={20}
        fontWeight={700}
        letterSpacing="0.06em"
      >
        SUA MARCA
      </text>
    </svg>
  );
}

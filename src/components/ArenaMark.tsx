interface ArenaMarkProps {
  readonly size?: number;
  readonly className?: string;
}

/** Original hexagonal-shield emblem used as the Global Arena logomark. */
export function ArenaMark({ size = 28, className }: ArenaMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 2 L44 13 V35 L24 46 L4 35 V13 Z" stroke="currentColor" strokeWidth="3" />
      <path
        d="M24 12 L24 24 L34 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="GoodDrummer"
    >
      <defs>
        <linearGradient id="gd-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="55%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="gd-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="url(#gd-bg)" />

      {/* corpo do tambor */}
      <rect x="15" y="30" width="34" height="15" fill="url(#gd-shell)" />
      <ellipse cx="32" cy="45" rx="17" ry="5.5" fill="#d97706" />
      {/* aro/lugs */}
      {[20, 26, 32, 38, 44].map((x) => (
        <rect key={x} x={x - 1.2} y="30" width="2.4" height="15" fill="#b45309" opacity="0.55" />
      ))}
      {/* pele do tambor */}
      <ellipse cx="32" cy="30" rx="17" ry="5.5" fill="#fffbeb" stroke="#f3e8c7" strokeWidth="1.5" />

      {/* baquetas cruzadas */}
      <g transform="rotate(-32 32 26)">
        <rect x="30.5" y="8" width="3" height="26" rx="1.5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <circle cx="32" cy="8" r="3.4" fill="#fff7ed" stroke="#d97706" strokeWidth="1" />
      </g>
      <g transform="rotate(32 32 26)">
        <rect x="30.5" y="8" width="3" height="26" rx="1.5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <circle cx="32" cy="8" r="3.4" fill="#fff7ed" stroke="#d97706" strokeWidth="1" />
      </g>

      {/* brilho */}
      <path d="M12 14 l2.4 5.2 5.2 2.4 -5.2 2.4 -2.4 5.2 -2.4 -5.2 -5.2 -2.4 5.2 -2.4 Z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

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
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="url(#gd-bg)" />

      {/* baquetas cruzadas */}
      <line x1="10" y1="54" x2="47" y2="12" stroke="#d4a574" strokeWidth="6" strokeLinecap="round" />
      <line x1="54" y1="54" x2="17" y2="12" stroke="#d4a574" strokeWidth="6" strokeLinecap="round" />
      <circle cx="10" cy="54" r="5.6" fill="#e8c9a0" stroke="#7f1d1d" strokeWidth="1.2" />
      <circle cx="54" cy="54" r="5.6" fill="#e8c9a0" stroke="#7f1d1d" strokeWidth="1.2" />
      <circle cx="47" cy="12" r="5.6" fill="#e8c9a0" stroke="#7f1d1d" strokeWidth="1.2" />
      <circle cx="17" cy="12" r="5.6" fill="#e8c9a0" stroke="#7f1d1d" strokeWidth="1.2" />
    </svg>
  );
}

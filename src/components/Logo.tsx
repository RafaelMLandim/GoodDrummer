export function Logo({ size = 48, className }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/drumsticks.webp"
      alt="GoodDrummer"
      className={`inline-block shrink-0 object-contain ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}

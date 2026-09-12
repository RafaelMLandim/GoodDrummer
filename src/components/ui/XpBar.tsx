import { cn } from "@/lib/cn";

export function XpBar({ percent, className }: { percent: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={cn(
        "h-4 w-full overflow-hidden rounded-full border-2 border-slate-800/10 bg-slate-200",
        className
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-lime-400 to-green-500 transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

import { Crown, Flame, Sparkles, Star } from "lucide-react";
import type { LevelColor } from "@/generated/prisma/client";
import { getLevelTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

const ICON: Record<LevelColor, typeof Star> = {
  GREEN: Star,
  YELLOW: Flame,
  RED: Sparkles,
  GOLD: Crown,
};

export function LevelBadge({
  color,
  label,
  size = "md",
}: {
  color: LevelColor;
  label: string;
  size?: "sm" | "md";
}) {
  const theme = getLevelTheme(color);
  const Icon = ICON[color];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold",
        theme.chip,
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
      )}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.5} />
      {label}
    </span>
  );
}

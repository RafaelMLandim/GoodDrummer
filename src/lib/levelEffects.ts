import { FaBolt, FaDrum, FaFire, FaSkull } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { LevelColor } from "@/generated/prisma/client";

export interface LevelHoverEffect {
  Icon: IconType;
  badgeGradient: string;
  glowShadow: string;
  borderHover: string;
  animationClass: string;
}

const LEVEL_HOVER_EFFECTS: Record<LevelColor, LevelHoverEffect> = {
  GREEN: {
    Icon: FaDrum,
    badgeGradient: "from-emerald-400 to-green-600",
    glowShadow:
      "hover:shadow-[0_10px_0_0_theme(colors.slate.200),0_0_26px_6px_rgba(16,185,129,0.35)]",
    borderHover: "hover:border-emerald-300",
    animationClass: "animate-icon-bounce",
  },
  YELLOW: {
    Icon: FaBolt,
    badgeGradient: "from-amber-300 to-yellow-500",
    glowShadow:
      "hover:shadow-[0_10px_0_0_theme(colors.slate.200),0_0_26px_6px_rgba(234,179,8,0.4)]",
    borderHover: "hover:border-yellow-300",
    animationClass: "animate-icon-zap",
  },
  RED: {
    Icon: FaFire,
    badgeGradient: "from-orange-400 to-red-600",
    glowShadow:
      "hover:shadow-[0_10px_0_0_theme(colors.slate.200),0_0_28px_6px_rgba(239,68,68,0.4)]",
    borderHover: "hover:border-red-300",
    animationClass: "animate-flame",
  },
  GOLD: {
    Icon: FaSkull,
    badgeGradient: "from-fuchsia-500 to-purple-700",
    glowShadow:
      "hover:shadow-[0_10px_0_0_theme(colors.slate.200),0_0_30px_8px_rgba(168,85,247,0.45)]",
    borderHover: "hover:border-purple-300",
    animationClass: "animate-icon-glow",
  },
};

export function getLevelHoverEffect(color: LevelColor): LevelHoverEffect {
  return LEVEL_HOVER_EFFECTS[color];
}

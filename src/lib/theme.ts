import type { LevelColor } from "@/generated/prisma/client";

export interface LevelTheme {
  label: string;
  gradient: string;
  solid: string;
  border: string;
  text: string;
  ring: string;
  chip: string;
  buttonShadow: string;
}

const THEMES: Record<LevelColor, LevelTheme> = {
  GREEN: {
    label: "Iniciante",
    gradient: "from-emerald-400 to-green-500",
    solid: "bg-emerald-500",
    border: "border-emerald-600",
    text: "text-emerald-700",
    ring: "ring-emerald-300",
    chip: "bg-emerald-100 text-emerald-700",
    buttonShadow: "shadow-[0_6px_0_0_theme(colors.emerald.700)]",
  },
  YELLOW: {
    label: "Intermediário",
    gradient: "from-amber-300 to-yellow-500",
    solid: "bg-yellow-400",
    border: "border-yellow-600",
    text: "text-yellow-700",
    ring: "ring-yellow-300",
    chip: "bg-yellow-100 text-yellow-800",
    buttonShadow: "shadow-[0_6px_0_0_theme(colors.yellow.600)]",
  },
  RED: {
    label: "Avançado",
    gradient: "from-rose-400 to-red-600",
    solid: "bg-red-500",
    border: "border-red-700",
    text: "text-red-700",
    ring: "ring-red-300",
    chip: "bg-red-100 text-red-700",
    buttonShadow: "shadow-[0_6px_0_0_theme(colors.red.700)]",
  },
  GOLD: {
    label: "GodDrummer",
    gradient: "from-fuchsia-500 via-purple-500 to-amber-400",
    solid: "bg-purple-600",
    border: "border-purple-800",
    text: "text-purple-700",
    ring: "ring-purple-300",
    chip: "bg-purple-100 text-purple-700",
    buttonShadow: "shadow-[0_6px_0_0_theme(colors.purple.800)]",
  },
};

export function getLevelTheme(color: LevelColor): LevelTheme {
  return THEMES[color];
}

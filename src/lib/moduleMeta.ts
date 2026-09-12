import {
  BookOpen,
  Crown,
  ListMusic,
  Mic2,
  Repeat,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ModuleCategory } from "@/generated/prisma/client";

export const CATEGORY_ICON: Record<ModuleCategory, LucideIcon> = {
  RUDIMENTOS_TECNICA: Zap,
  GROOVES_RITMOS: Repeat,
  LEITURA_TEORIA: BookOpen,
  VIRADAS_FILLS: Sparkles,
  REPERTORIO: ListMusic,
  VIRTUOSIDADE_CHOPS: Crown,
  AUTONOMIA_ESTUDIO: Mic2,
};

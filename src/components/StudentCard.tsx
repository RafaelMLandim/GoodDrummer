import Link from "next/link";
import { Music2, Trophy } from "lucide-react";
import { studentPhotoSrc } from "@/lib/avatar";
import { getLevelTheme } from "@/lib/theme";
import { getLevelHoverEffect } from "@/lib/levelEffects";
import { LevelBadge } from "@/components/LevelBadge";
import { LevelRoadmapDots } from "@/components/LevelRoadmap";
import { XpBar } from "@/components/ui/XpBar";
import type { StudentSummary } from "@/lib/data";

export function StudentCard({ student }: { student: StudentSummary }) {
  const theme = getLevelTheme(student.currentLevel.color);
  const hoverEffect = getLevelHoverEffect(student.currentLevel.color);
  const HoverIcon = hoverEffect.Icon;

  return (
    <Link
      href={`/students/${student.id}`}
      className={`group relative block rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-[0_6px_0_0_theme(colors.slate.200)] transition-all hover:-translate-y-1 ${hoverEffect.borderHover} ${hoverEffect.glowShadow}`}
    >
      <span
        className={`pointer-events-none absolute -top-2.5 -right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${hoverEffect.badgeGradient} opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100`}
      >
        <HoverIcon className={`h-4 w-4 text-white ${hoverEffect.animationClass}`} />
      </span>

      <div className="flex items-center gap-4">
        <div
          className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} p-0.5`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studentPhotoSrc(student)}
            alt={student.name}
            className="h-full w-full rounded-[14px] bg-white object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-slate-800">{student.name}</p>
          <p className="text-sm font-semibold text-slate-400">{student.age} anos</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <LevelBadge color={student.currentLevel.color} label={student.currentLevel.name} size="sm" />
          <LevelRoadmapDots levels={student.levelRoadmap} currentLevelId={student.currentLevel.id} />
        </div>
        <div className="flex items-center gap-2">
          <XpBar percent={student.levelProgressPercent} />
          <span className="shrink-0 text-xs font-bold text-slate-400">
            {student.levelProgressPercent}%
          </span>
        </div>
        <div className="flex items-center gap-3 pt-0.5 text-xs font-bold text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5" />
            {student.exercisesCompleted}/{student.totalExercises} dominados
          </span>
          <span className="inline-flex items-center gap-1">
            <Music2 className="h-3.5 w-3.5" />
            {student.xp} XP
          </span>
        </div>
      </div>
    </Link>
  );
}

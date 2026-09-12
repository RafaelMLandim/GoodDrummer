import { Check } from "lucide-react";
import { getLevelTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import type { LevelColor } from "@/generated/prisma/client";

interface RoadmapLevel {
  id: string;
  order: number;
  name: string;
  color: LevelColor;
  percent: number;
}

export function LevelRoadmapDots({
  levels,
  currentLevelId,
}: {
  levels: RoadmapLevel[];
  currentLevelId: string;
}) {
  return (
    <div className="flex items-center gap-1">
      {levels.map((level) => {
        const theme = getLevelTheme(level.color);
        const isCurrent = level.id === currentLevelId;
        const isDone = level.percent >= 100;
        return (
          <span
            key={level.id}
            title={`${level.name}: ${level.percent}%`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all",
              isDone || level.percent > 0 ? theme.solid : "bg-slate-200",
              isCurrent && "ring-2 ring-offset-1 ring-slate-300 scale-125"
            )}
          />
        );
      })}
    </div>
  );
}

export function LevelRoadmapStrip({
  levels,
  currentLevelId,
}: {
  levels: RoadmapLevel[];
  currentLevelId: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {levels.map((level) => {
        const theme = getLevelTheme(level.color);
        const isCurrent = level.id === currentLevelId;
        const isDone = level.percent >= 100;
        return (
          <div
            key={level.id}
            className={cn(
              "rounded-2xl border-2 p-3 text-center transition-all",
              isCurrent ? `${theme.border} bg-white shadow-sm` : "border-slate-100 bg-slate-50"
            )}
          >
            <p className={cn("text-xs font-extrabold", isCurrent ? theme.text : "text-slate-400")}>
              {level.name}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1">
              {isDone && <Check className={cn("h-3.5 w-3.5", theme.text)} strokeWidth={3} />}
              <p className="text-sm font-bold text-slate-600">{level.percent}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { getLevelTheme } from "@/lib/theme";
import { CATEGORY_ICON } from "@/lib/moduleMeta";
import { LevelBadge } from "@/components/LevelBadge";
import { ExerciseNode } from "@/components/ExerciseNode";
import type { Curriculum } from "@/lib/data";
import type { ExerciseModalProgress } from "@/components/ExerciseModal";

export function SkillTree({
  studentId,
  curriculum,
  progresses,
}: {
  studentId: string;
  curriculum: Curriculum;
  progresses: { exerciseId: string; status: string; stars: number; currentBpm: number | null; bestBpm: number | null }[];
}) {
  const progressByExercise = new Map(progresses.map((p) => [p.exerciseId, p]));

  return (
    <div className="space-y-8">
      {curriculum.map((level) => {
        const theme = getLevelTheme(level.color);
        return (
          <section
            key={level.id}
            className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white"
          >
            <div className={`bg-gradient-to-r ${theme.gradient} p-5 text-white`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide opacity-80">
                    {level.worldName}
                  </p>
                  <h2 className="text-xl font-extrabold">{level.name}</h2>
                </div>
                <LevelBadge color={level.color} label={theme.label} />
              </div>
              <p className="mt-2 text-sm font-semibold opacity-90">{level.globalGoal}</p>
            </div>

            <div className="space-y-6 p-5">
              {level.modules.map((mod) => {
                const Icon = CATEGORY_ICON[mod.category];
                return (
                  <div key={mod.id}>
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${theme.text}`} strokeWidth={2.5} />
                      <h3 className="text-sm font-extrabold text-slate-600">{mod.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {mod.exercises.map((exercise) => {
                        const progress = progressByExercise.get(exercise.id);
                        return (
                          <ExerciseNode
                            key={exercise.id}
                            studentId={studentId}
                            exercise={exercise}
                            progress={progress as ExerciseModalProgress | undefined}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

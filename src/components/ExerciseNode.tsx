"use client";

import { useState } from "react";
import { Check, Lock, Star, Timer } from "lucide-react";
import { ExerciseModal, type ExerciseModalExercise, type ExerciseModalProgress } from "@/components/ExerciseModal";
import { ProgressStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/cn";

const STATUS_STYLE: Record<ProgressStatus, string> = {
  LOCKED: "bg-slate-100 text-slate-400 border-slate-200",
  IN_TRAINING: "bg-sky-100 text-sky-600 border-sky-300",
  COMPLETED: "bg-green-100 text-green-600 border-green-300",
};

const STATUS_ICON: Record<ProgressStatus, typeof Lock> = {
  LOCKED: Lock,
  IN_TRAINING: Timer,
  COMPLETED: Check,
};

export function ExerciseNode({
  studentId,
  exercise,
  progress,
}: {
  studentId: string;
  exercise: ExerciseModalExercise;
  progress?: ExerciseModalProgress;
}) {
  const [open, setOpen] = useState(false);
  const status = progress?.status ?? ProgressStatus.LOCKED;
  const StatusIcon = STATUS_ICON[status];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3 text-left transition-all hover:border-slate-200 hover:shadow-[0_3px_0_0_theme(colors.slate.200)]"
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2",
            STATUS_STYLE[status]
          )}
        >
          <StatusIcon className="h-5 w-5" strokeWidth={2.5} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold text-slate-700">
            {exercise.name}
          </span>
          {exercise.artist && (
            <span className="block truncate text-xs font-semibold text-slate-400">
              {exercise.artist}
            </span>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {progress && progress.stars > 0 && (
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < progress.stars
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-200 text-slate-200"
                  )}
                />
              ))}
            </span>
          )}
          {progress?.currentBpm && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
              {progress.currentBpm} BPM
            </span>
          )}
        </span>
      </button>

      <ExerciseModal
        studentId={studentId}
        exercise={exercise}
        progress={progress}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Target, Video } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { GameButton } from "@/components/ui/GameButton";
import { updateProgressAction } from "@/app/actions";
import { STATUS_LABEL } from "@/lib/gamification";
import { ProgressStatus, type ExerciseType } from "@/generated/prisma/enums";
import { cn } from "@/lib/cn";

export interface ExerciseModalExercise {
  id: string;
  name: string;
  type: ExerciseType;
  teacherTip: string;
  detail: string | null;
  targetBpm: number | null;
  artist: string | null;
}

export interface ExerciseModalProgress {
  status: ProgressStatus;
  stars: number;
  currentBpm: number | null;
  bestBpm: number | null;
}

const STATUS_OPTIONS = [
  ProgressStatus.LOCKED,
  ProgressStatus.IN_TRAINING,
  ProgressStatus.COMPLETED,
] as const;

export function ExerciseModal({
  studentId,
  exercise,
  progress,
  open,
  onClose,
}: {
  studentId: string;
  exercise: ExerciseModalExercise;
  progress?: ExerciseModalProgress;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ProgressStatus>(progress?.status ?? ProgressStatus.LOCKED);
  const [stars, setStars] = useState(progress?.stars ?? 0);
  const [bpm, setBpm] = useState(progress?.currentBpm?.toString() ?? "");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    ["bateria", exercise.name, exercise.artist].filter(Boolean).join(" ")
  )}`;

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await updateProgressAction({
        studentId,
        exerciseId: exercise.id,
        status,
        stars,
        currentBpm: bpm.trim() === "" ? null : Number(bpm),
      });
      if (!result.ok) {
        setError(result.error ?? "Erro ao salvar");
        return;
      }
      router.refresh();
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title={exercise.name}>
      <div className="space-y-5">
        {exercise.artist && (
          <p className="text-sm font-bold text-slate-400">{exercise.artist}</p>
        )}

        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-sky-600">
            Instrução para o professor
          </p>
          <p className="text-sm font-semibold text-slate-700">{exercise.teacherTip}</p>
          {exercise.detail && (
            <p className="mt-1 text-sm text-slate-500">{exercise.detail}</p>
          )}
        </div>

        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-sky-300 hover:text-sky-600"
        >
          <Video className="h-4 w-4" />
          Ver vídeos no YouTube
        </a>

        {exercise.targetBpm && (
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <Target className="h-4 w-4" />
            Meta de BPM: {exercise.targetBpm}
            {progress?.bestBpm ? ` · Recorde do aluno: ${progress.bestBpm}` : ""}
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={cn(
                  "rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition-colors",
                  status === option
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                )}
              >
                {STATUS_LABEL[option]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">Estrelas</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} estrela(s)`}
                onClick={() => setStars(stars === value ? value - 1 : value)}
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-colors",
                    value <= stars
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-100 text-slate-300"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="bpm" className="mb-1 block text-sm font-bold text-slate-600">
            BPM atual do aluno
          </label>
          <input
            id="bpm"
            type="number"
            min={0}
            max={400}
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            placeholder="Ex: 90"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
          />
        </div>

        {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}

        <GameButton onClick={handleSave} disabled={pending} className="w-full">
          {pending ? "Salvando..." : "Salvar progresso"}
        </GameButton>
      </div>
    </Modal>
  );
}

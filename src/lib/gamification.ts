import type { ProgressStatus } from "@/generated/prisma/client";

export const XP_PER_STAR = 10;
export const MAX_STARS = 3;
export const MAX_XP_PER_EXERCISE = XP_PER_STAR * MAX_STARS;

export const STATUS_LABEL: Record<ProgressStatus, string> = {
  LOCKED: "Bloqueado",
  IN_TRAINING: "Em Treino",
  COMPLETED: "Concluído",
};

export function xpForStars(stars: number): number {
  return Math.max(0, Math.min(stars, MAX_STARS)) * XP_PER_STAR;
}

interface ExerciseLike {
  id: string;
}

interface ProgressLike {
  exerciseId: string;
  stars: number;
}

/** XP total do aluno dentro de um conjunto de exercícios (ex.: os de um nível). */
export function xpEarned(exercises: ExerciseLike[], progresses: ProgressLike[]): number {
  const starsByExercise = new Map(progresses.map((p) => [p.exerciseId, p.stars]));
  return exercises.reduce((total, exercise) => {
    return total + xpForStars(starsByExercise.get(exercise.id) ?? 0);
  }, 0);
}

export function maxXpPossible(exercises: ExerciseLike[]): number {
  return exercises.length * MAX_XP_PER_EXERCISE;
}

export function progressPercent(earned: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((earned / max) * 100);
}

import { prisma } from "@/lib/prisma";
import { maxXpPossible, progressPercent, xpEarned } from "@/lib/gamification";
import type { LevelColor } from "@/generated/prisma/client";

export async function getCurriculum() {
  return prisma.level.findMany({
    orderBy: { order: "asc" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          exercises: { orderBy: { order: "asc" } },
        },
      },
    },
  });
}

export type Curriculum = Awaited<ReturnType<typeof getCurriculum>>;

export async function getLevels() {
  return prisma.level.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true, name: true, worldName: true, color: true },
  });
}

export async function getStudents() {
  const [students, curriculum] = await Promise.all([
    prisma.student.findMany({
      orderBy: { createdAt: "asc" },
      include: { progresses: true, currentLevel: true },
    }),
    getCurriculum(),
  ]);

  return students.map((student) => summarizeStudent(student, curriculum));
}

export async function getStudentDetail(studentId: string) {
  const [student, curriculum] = await Promise.all([
    prisma.student.findUnique({
      where: { id: studentId },
      include: {
        currentLevel: true,
        progresses: { include: { bpmRecords: { orderBy: { recordedAt: "desc" } } } },
      },
    }),
    getCurriculum(),
  ]);

  if (!student) return null;

  return {
    ...summarizeStudent(student, curriculum),
    progresses: student.progresses,
  };
}

interface StudentWithProgress {
  id: string;
  name: string;
  age: number;
  avatarSeed: string;
  photoDataUrl: string | null;
  currentLevelId: string;
  currentLevel: { id: string; order: number; name: string; worldName: string; color: LevelColor };
  xp: number;
  createdAt: Date;
  progresses: { exerciseId: string; stars: number; status: string }[];
}

function summarizeStudent(student: StudentWithProgress, curriculum: Curriculum) {
  const allExercises = curriculum.flatMap((level) =>
    level.modules.flatMap((mod) => mod.exercises)
  );
  const totalEarned = xpEarned(allExercises, student.progresses);

  const levelData = curriculum.find((level) => level.id === student.currentLevelId);
  const levelExercises = levelData ? levelData.modules.flatMap((m) => m.exercises) : [];
  const levelEarned = xpEarned(levelExercises, student.progresses);
  const levelMax = maxXpPossible(levelExercises);
  const exercisesCompleted = student.progresses.filter((p) => p.status === "COMPLETED").length;

  return {
    id: student.id,
    name: student.name,
    age: student.age,
    avatarSeed: student.avatarSeed,
    photoDataUrl: student.photoDataUrl,
    xp: totalEarned,
    exercisesCompleted,
    totalExercises: allExercises.length,
    createdAt: student.createdAt,
    currentLevel: {
      id: student.currentLevel.id,
      order: student.currentLevel.order,
      name: student.currentLevel.name,
      worldName: student.currentLevel.worldName,
      color: student.currentLevel.color,
    },
    levelProgressPercent: progressPercent(levelEarned, levelMax),
    levelRoadmap: getLevelRoadmap(curriculum, student.progresses),
  };
}

/** Percentual de conclusão de cada nível do currículo, para o mapa de jornada do aluno. */
function getLevelRoadmap(
  curriculum: Curriculum,
  progresses: { exerciseId: string; stars: number }[]
) {
  return curriculum.map((level) => {
    const exercises = level.modules.flatMap((m) => m.exercises);
    const earned = xpEarned(exercises, progresses);
    const max = maxXpPossible(exercises);
    return {
      id: level.id,
      order: level.order,
      name: level.name,
      color: level.color,
      percent: progressPercent(earned, max),
    };
  });
}

export type StudentSummary = Awaited<ReturnType<typeof getStudents>>[number];
export type StudentDetail = NonNullable<Awaited<ReturnType<typeof getStudentDetail>>>;

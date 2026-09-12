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

export async function getStudents() {
  const [students, curriculum] = await Promise.all([
    prisma.student.findMany({
      orderBy: { createdAt: "asc" },
      include: { progresses: true },
    }),
    getCurriculum(),
  ]);

  return students.map((student) => summarizeStudent(student, curriculum));
}

export async function getStudentDetail(studentId: string) {
  const [student, curriculum] = await Promise.all([
    prisma.student.findUnique({
      where: { id: studentId },
      include: { progresses: { include: { bpmRecords: { orderBy: { recordedAt: "desc" } } } } },
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
  xp: number;
  createdAt: Date;
  progresses: { exerciseId: string; stars: number; status: string }[];
}

function summarizeStudent(student: StudentWithProgress, curriculum: Curriculum) {
  const allExercises = curriculum.flatMap((level) =>
    level.modules.flatMap((mod) => mod.exercises)
  );
  const totalEarned = xpEarned(allExercises, student.progresses);

  const currentLevel =
    curriculum.find((level) => {
      const exercises = level.modules.flatMap((m) => m.exercises);
      const earned = xpEarned(exercises, student.progresses);
      const max = maxXpPossible(exercises);
      return max === 0 || earned < max;
    }) ?? curriculum[curriculum.length - 1];

  const levelExercises = currentLevel ? currentLevel.modules.flatMap((m) => m.exercises) : [];
  const levelEarned = xpEarned(levelExercises, student.progresses);
  const levelMax = maxXpPossible(levelExercises);

  return {
    id: student.id,
    name: student.name,
    age: student.age,
    avatarSeed: student.avatarSeed,
    xp: totalEarned,
    createdAt: student.createdAt,
    currentLevel: currentLevel
      ? {
          id: currentLevel.id,
          order: currentLevel.order,
          name: currentLevel.name,
          worldName: currentLevel.worldName,
          color: currentLevel.color as LevelColor,
        }
      : null,
    levelProgressPercent: progressPercent(levelEarned, levelMax),
  };
}

export type StudentSummary = Awaited<ReturnType<typeof getStudents>>[number];
export type StudentDetail = NonNullable<Awaited<ReturnType<typeof getStudentDetail>>>;

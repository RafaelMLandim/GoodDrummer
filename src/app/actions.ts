"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ProgressStatus } from "@/generated/prisma/client";

const photoDataUrlSchema = z
  .string()
  .max(2_000_000, "Foto muito grande")
  .regex(/^data:image\/(jpeg|png|webp);base64,/, "Formato de imagem inválido")
  .optional()
  .or(z.literal(""));

const createStudentSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(80),
  age: z.coerce.number().int().min(3).max(99),
  levelId: z.string().min(1, "Selecione um nível"),
  photoDataUrl: photoDataUrlSchema,
});

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function createStudentAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = createStudentSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    levelId: formData.get("levelId"),
    photoDataUrl: formData.get("photoDataUrl"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  await prisma.student.create({
    data: {
      name: parsed.data.name,
      age: parsed.data.age,
      currentLevelId: parsed.data.levelId,
      photoDataUrl: parsed.data.photoDataUrl || null,
      avatarSeed: `${parsed.data.name}-${Date.now()}`,
    },
  });

  revalidatePath("/");
  return { ok: true };
}

const updateStudentSchema = z.object({
  studentId: z.string().min(1),
  name: z.string().trim().min(1, "Nome é obrigatório").max(80),
  age: z.coerce.number().int().min(3).max(99),
  levelId: z.string().min(1, "Selecione um nível"),
  photoDataUrl: photoDataUrlSchema,
});

export async function updateStudentAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = updateStudentSchema.safeParse({
    studentId: formData.get("studentId"),
    name: formData.get("name"),
    age: formData.get("age"),
    levelId: formData.get("levelId"),
    photoDataUrl: formData.get("photoDataUrl"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  await prisma.student.update({
    where: { id: parsed.data.studentId },
    data: {
      name: parsed.data.name,
      age: parsed.data.age,
      currentLevelId: parsed.data.levelId,
      photoDataUrl: parsed.data.photoDataUrl || null,
    },
  });

  revalidatePath(`/students/${parsed.data.studentId}`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteStudentAction(studentId: string): Promise<void> {
  await prisma.student.delete({ where: { id: studentId } });
  revalidatePath("/");
}

const updateProgressSchema = z.object({
  studentId: z.string().min(1),
  exerciseId: z.string().min(1),
  status: z.enum([ProgressStatus.LOCKED, ProgressStatus.IN_TRAINING, ProgressStatus.COMPLETED]),
  stars: z.coerce.number().int().min(0).max(3),
  currentBpm: z.coerce.number().int().min(0).max(400).nullable(),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;

export async function updateProgressAction(input: UpdateProgressInput): Promise<ActionResult> {
  const parsed = updateProgressSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }
  const { studentId, exerciseId, status, stars, currentBpm } = parsed.data;

  const existing = await prisma.studentProgress.findUnique({
    where: { studentId_exerciseId: { studentId, exerciseId } },
  });

  const bpmChanged =
    currentBpm !== null && currentBpm !== undefined && currentBpm !== existing?.currentBpm;

  const bestBpm =
    currentBpm !== null
      ? Math.max(currentBpm, existing?.bestBpm ?? 0)
      : existing?.bestBpm ?? null;

  const progress = await prisma.studentProgress.upsert({
    where: { studentId_exerciseId: { studentId, exerciseId } },
    create: {
      studentId,
      exerciseId,
      status,
      stars,
      currentBpm,
      bestBpm: currentBpm ?? undefined,
    },
    update: {
      status,
      stars,
      currentBpm,
      bestBpm,
    },
  });

  if (bpmChanged && currentBpm !== null) {
    await prisma.bpmRecord.create({
      data: { progressId: progress.id, bpm: currentBpm },
    });
  }

  revalidatePath(`/students/${studentId}`);
  revalidatePath("/");
  return { ok: true };
}

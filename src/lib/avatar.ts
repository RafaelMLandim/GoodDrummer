import type { Gender } from "@/generated/prisma/client";

const MASCULINE_HAIR = [
  "short01",
  "short02",
  "short03",
  "short04",
  "short05",
  "short06",
  "short07",
  "short08",
  "short09",
  "short10",
];

const FEMININE_HAIR = [
  "long01",
  "long02",
  "long03",
  "long04",
  "long05",
  "long06",
  "long07",
  "long08",
  "long09",
  "long10",
];

/** Avatar cartoonesco gerado a partir de uma seed estável (nome + timestamp de criação). */
export function avatarUrl(seed: string, gender?: Gender | null): string {
  const params = new URLSearchParams({
    seed,
    backgroundType: "gradientLinear",
    radius: "50",
  });

  if (gender === "MASCULINO") {
    params.set("hair", MASCULINE_HAIR.join(","));
  } else if (gender === "FEMININO") {
    params.set("hair", FEMININE_HAIR.join(","));
  }

  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}

/** Foto real do aluno quando o professor cadastrou uma; caso contrário, cai no avatar cartoonesco. */
export function studentPhotoSrc(student: {
  photoDataUrl?: string | null;
  avatarSeed: string;
  gender?: Gender | null;
}): string {
  return student.photoDataUrl || avatarUrl(student.avatarSeed, student.gender);
}

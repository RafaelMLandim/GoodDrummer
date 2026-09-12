import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Music2, Trophy } from "lucide-react";
import { getCurriculum, getLevels, getStudentDetail } from "@/lib/data";
import { studentPhotoSrc } from "@/lib/avatar";
import { getLevelTheme } from "@/lib/theme";
import { LevelBadge } from "@/components/LevelBadge";
import { LevelRoadmapStrip } from "@/components/LevelRoadmap";
import { XpBar } from "@/components/ui/XpBar";
import { SkillTree } from "@/components/SkillTree";
import { DeleteStudentButton } from "@/components/DeleteStudentButton";
import { EditStudentDialog } from "@/components/EditStudentDialog";

export const dynamic = "force-dynamic";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [student, curriculum, levels] = await Promise.all([
    getStudentDetail(id),
    getCurriculum(),
    getLevels(),
  ]);

  if (!student) notFound();

  const theme = getLevelTheme(student.currentLevel.color);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao painel
      </Link>

      <div className="mb-6 rounded-3xl border-2 border-slate-200 bg-white p-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} p-0.5`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={studentPhotoSrc(student)}
                alt={student.name}
                className="h-full w-full rounded-[14px] bg-white object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">{student.name}</h1>
              <p className="text-sm font-semibold text-slate-400">{student.age} anos</p>
              <div className="mt-2">
                <LevelBadge color={student.currentLevel.color} label={student.currentLevel.name} />
              </div>
              <div className="mt-2 flex w-48 items-center gap-2">
                <XpBar percent={student.levelProgressPercent} />
                <span className="shrink-0 text-xs font-bold text-slate-400">
                  {student.levelProgressPercent}%
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs font-bold text-slate-400">
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
          </div>

          <div className="flex gap-2">
            <EditStudentDialog student={student} levels={levels} />
            <DeleteStudentButton studentId={student.id} studentName={student.name} />
          </div>
        </div>

        <div className="mt-6 border-t-2 border-slate-100 pt-5">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-400">
            Jornada completa
          </p>
          <LevelRoadmapStrip levels={student.levelRoadmap} currentLevelId={student.currentLevel.id} />
        </div>
      </div>

      <SkillTree studentId={student.id} curriculum={curriculum} progresses={student.progresses} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurriculum, getStudentDetail } from "@/lib/data";
import { avatarUrl } from "@/lib/avatar";
import { getLevelTheme } from "@/lib/theme";
import { LevelBadge } from "@/components/LevelBadge";
import { XpBar } from "@/components/ui/XpBar";
import { SkillTree } from "@/components/SkillTree";
import { DeleteStudentButton } from "@/components/DeleteStudentButton";

export const dynamic = "force-dynamic";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [student, curriculum] = await Promise.all([getStudentDetail(id), getCurriculum()]);

  if (!student) notFound();

  const theme = student.currentLevel ? getLevelTheme(student.currentLevel.color) : null;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao painel
      </Link>

      <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
              theme?.gradient ?? "from-slate-300 to-slate-400"
            } p-0.5`}
          >
            <Image
              src={avatarUrl(student.avatarSeed)}
              alt={student.name}
              width={76}
              height={76}
              className="h-full w-full rounded-[14px] bg-white object-cover"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">{student.name}</h1>
            <p className="text-sm font-semibold text-slate-400">{student.age} anos</p>
            {student.currentLevel && (
              <div className="mt-2">
                <LevelBadge color={student.currentLevel.color} label={student.currentLevel.name} />
              </div>
            )}
            <div className="mt-2 flex w-48 items-center gap-2">
              <XpBar percent={student.levelProgressPercent} />
              <span className="shrink-0 text-xs font-bold text-slate-400">
                {student.levelProgressPercent}%
              </span>
            </div>
          </div>
        </div>

        <DeleteStudentButton studentId={student.id} studentName={student.name} />
      </div>

      <SkillTree studentId={student.id} curriculum={curriculum} progresses={student.progresses} />
    </div>
  );
}

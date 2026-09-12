import Image from "next/image";
import Link from "next/link";
import { avatarUrl } from "@/lib/avatar";
import { getLevelTheme } from "@/lib/theme";
import { LevelBadge } from "@/components/LevelBadge";
import { XpBar } from "@/components/ui/XpBar";
import type { StudentSummary } from "@/lib/data";

export function StudentCard({ student }: { student: StudentSummary }) {
  const theme = student.currentLevel ? getLevelTheme(student.currentLevel.color) : null;

  return (
    <Link
      href={`/students/${student.id}`}
      className="group block rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-[0_6px_0_0_theme(colors.slate.200)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_0_theme(colors.slate.200)]"
    >
      <div className="flex items-center gap-4">
        <div
          className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
            theme?.gradient ?? "from-slate-300 to-slate-400"
          } p-0.5`}
        >
          <Image
            src={avatarUrl(student.avatarSeed)}
            alt={student.name}
            width={60}
            height={60}
            className="h-full w-full rounded-[14px] bg-white object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-slate-800">{student.name}</p>
          <p className="text-sm font-semibold text-slate-400">{student.age} anos</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {student.currentLevel && (
          <LevelBadge color={student.currentLevel.color} label={student.currentLevel.name} size="sm" />
        )}
        <div className="flex items-center gap-2 pt-1">
          <XpBar percent={student.levelProgressPercent} />
          <span className="shrink-0 text-xs font-bold text-slate-400">
            {student.levelProgressPercent}%
          </span>
        </div>
      </div>
    </Link>
  );
}

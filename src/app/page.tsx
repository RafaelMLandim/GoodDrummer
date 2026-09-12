import { Flame, Music2, Trophy, Users } from "lucide-react";
import { getLevels, getStudents } from "@/lib/data";
import { StudentCard } from "@/components/StudentCard";
import { AddStudentDialog } from "@/components/AddStudentDialog";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [students, levels] = await Promise.all([getStudents(), getLevels()]);

  const totalXp = students.reduce((sum, s) => sum + s.xp, 0);
  const totalCompleted = students.reduce((sum, s) => sum + s.exercisesCompleted, 0);
  const inTraining = students.filter((s) => s.levelProgressPercent > 0 && s.levelProgressPercent < 100).length;

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Logo size={52} />
            <div>
              <h1 className="font-hero text-4xl text-white sm:text-5xl">GoodDrummer</h1>
              <p className="text-sm font-semibold text-slate-300">Painel dos alunos</p>
            </div>
          </div>
          <AddStudentDialog levels={levels} />
        </header>

        {students.length > 0 && (
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile icon={Users} label="Alunos" value={students.length} color="text-sky-500" />
            <StatTile icon={Flame} label="Em treino" value={inTraining} color="text-amber-500" />
            <StatTile icon={Trophy} label="Dominados" value={totalCompleted} color="text-emerald-500" />
            <StatTile icon={Music2} label="XP total" value={totalXp} color="text-fuchsia-500" />
          </div>
        )}

        {students.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-20 text-center">
            <Logo size={56} className="mb-4 opacity-90" />
            <p className="text-lg font-bold text-slate-500">Nenhum aluno cadastrado ainda</p>
            <p className="mt-1 text-sm font-semibold text-slate-400">
              Clique em &quot;Novo Aluno&quot; para começar a jornada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5">
      <Icon className={`h-4 w-4 ${color}`} strokeWidth={2.5} />
      <p className="mt-1.5 text-xl font-extrabold text-slate-800">{value}</p>
      <p className="text-xs font-bold text-slate-400">{label}</p>
    </div>
  );
}

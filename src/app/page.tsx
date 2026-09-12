import { Music4 } from "lucide-react";
import { getStudents } from "@/lib/data";
import { StudentCard } from "@/components/StudentCard";
import { AddStudentDialog } from "@/components/AddStudentDialog";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const students = await getStudents();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-amber-400 text-white shadow-[0_4px_0_0_theme(colors.purple.800)]">
            <Music4 className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">GoodDrummer</h1>
            <p className="text-sm font-semibold text-slate-400">Painel dos alunos</p>
          </div>
        </div>
        <AddStudentDialog />
      </header>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white py-20 text-center">
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
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteStudentAction } from "@/app/actions";
import { GameButton } from "@/components/ui/GameButton";

export function DeleteStudentButton({ studentId, studentName }: { studentId: string; studentName: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Remover ${studentName}? Todo o progresso será perdido.`)) return;
    startTransition(async () => {
      await deleteStudentAction(studentId);
      router.push("/");
    });
  }

  return (
    <GameButton variant="danger" onClick={handleClick} disabled={pending}>
      <Trash2 className="h-4 w-4" strokeWidth={2.5} />
      {pending ? "Removendo..." : "Remover aluno"}
    </GameButton>
  );
}

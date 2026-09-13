"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, TriangleAlert } from "lucide-react";
import { deleteStudentAction } from "@/app/actions";
import { GameButton } from "@/components/ui/GameButton";
import { Modal } from "@/components/ui/Modal";

export function DeleteStudentButton({ studentId, studentName }: { studentId: string; studentName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await deleteStudentAction(studentId);
      router.push("/");
    });
  }

  return (
    <>
      <GameButton variant="danger" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" strokeWidth={2.5} />
        Remover aluno
      </GameButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Remover aluno">
        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
            <TriangleAlert className="h-6 w-6 shrink-0 text-rose-500" strokeWidth={2.5} />
            <p className="font-semibold text-slate-700">
              Remover <span className="font-extrabold">{studentName}</span>? Todo o progresso será perdido para
              sempre.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <GameButton variant="secondary" onClick={() => setOpen(false)} disabled={pending}>
              Cancelar
            </GameButton>
            <GameButton variant="danger" onClick={handleConfirm} disabled={pending}>
              {pending ? "Removendo..." : "Remover"}
            </GameButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

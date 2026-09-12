"use client";

import { useActionState, useState } from "react";
import { Pencil } from "lucide-react";
import { updateStudentAction, type ActionResult } from "@/app/actions";
import { GameButton } from "@/components/ui/GameButton";
import { Modal } from "@/components/ui/Modal";
import { PhotoPicker } from "@/components/PhotoPicker";
import { LevelSelect } from "@/components/LevelSelect";
import { studentPhotoSrc } from "@/lib/avatar";

const initialState: ActionResult = { ok: false };

export function EditStudentDialog({
  student,
  levels,
}: {
  student: {
    id: string;
    name: string;
    age: number;
    avatarSeed: string;
    photoDataUrl: string | null;
    currentLevel: { id: string };
  };
  levels: { id: string; name: string; worldName: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (prev: ActionResult, formData: FormData) => {
      const result = await updateStudentAction(prev, formData);
      if (result.ok) setOpen(false);
      return result;
    },
    initialState
  );

  return (
    <>
      <GameButton variant="secondary" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" strokeWidth={2.5} />
        Editar
      </GameButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Editar aluno">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="studentId" value={student.id} />

          <div>
            <label className="mb-1 block text-sm font-bold text-slate-600">Foto</label>
            <PhotoPicker
              name="photoDataUrl"
              initialPreview={student.photoDataUrl}
              fallbackPreview={studentPhotoSrc({ photoDataUrl: null, avatarSeed: student.avatarSeed })}
            />
          </div>

          <div>
            <label htmlFor="edit-name" className="mb-1 block text-sm font-bold text-slate-600">
              Nome
            </label>
            <input
              id="edit-name"
              name="name"
              required
              maxLength={80}
              defaultValue={student.name}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
            />
          </div>
          <div>
            <label htmlFor="edit-age" className="mb-1 block text-sm font-bold text-slate-600">
              Idade
            </label>
            <input
              id="edit-age"
              name="age"
              type="number"
              required
              min={3}
              max={99}
              defaultValue={student.age}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
            />
          </div>
          <div>
            <label htmlFor="edit-level" className="mb-1 block text-sm font-bold text-slate-600">
              Nível atual
            </label>
            <LevelSelect levels={levels} defaultValue={student.currentLevel.id} />
          </div>

          {state.error && <p className="text-sm font-semibold text-rose-600">{state.error}</p>}

          <GameButton type="submit" disabled={pending} className="w-full">
            {pending ? "Salvando..." : "Salvar alterações"}
          </GameButton>
        </form>
      </Modal>
    </>
  );
}

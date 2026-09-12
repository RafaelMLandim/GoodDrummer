"use client";

import { useActionState, useState } from "react";
import { UserPlus } from "lucide-react";
import { createStudentAction, type ActionResult } from "@/app/actions";
import { GameButton } from "@/components/ui/GameButton";
import { Modal } from "@/components/ui/Modal";

const initialState: ActionResult = { ok: false };

export function AddStudentDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (prev: ActionResult, formData: FormData) => {
      const result = await createStudentAction(prev, formData);
      if (result.ok) setOpen(false);
      return result;
    },
    initialState
  );

  return (
    <>
      <GameButton onClick={() => setOpen(true)}>
        <UserPlus className="h-5 w-5" strokeWidth={2.5} />
        Novo Aluno
      </GameButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar novo aluno">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-bold text-slate-600">
              Nome
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={80}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
              placeholder="Ex: Rafael"
            />
          </div>
          <div>
            <label htmlFor="age" className="mb-1 block text-sm font-bold text-slate-600">
              Idade
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              min={3}
              max={99}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
              placeholder="Ex: 12"
            />
          </div>

          {state.error && <p className="text-sm font-semibold text-rose-600">{state.error}</p>}

          <GameButton type="submit" disabled={pending} className="w-full">
            {pending ? "Salvando..." : "Cadastrar"}
          </GameButton>
        </form>
      </Modal>
    </>
  );
}

"use client";

import { Gender } from "@/generated/prisma/enums";
import { cn } from "@/lib/cn";

const OPTIONS: { value: Gender; label: string }[] = [
  { value: Gender.MASCULINO, label: "Masculino" },
  { value: Gender.FEMININO, label: "Feminino" },
];

export function GenderSelect({
  value,
  onChange,
  name = "gender",
}: {
  value: Gender | null;
  onChange: (value: Gender) => void;
  name?: string;
}) {
  return (
    <div className="flex gap-2">
      <input type="hidden" name={name} value={value ?? ""} />
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-colors",
            value === option.value
              ? "border-sky-500 bg-sky-500 text-white"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

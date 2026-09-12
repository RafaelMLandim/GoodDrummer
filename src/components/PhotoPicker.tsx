"use client";

import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

const OUTPUT_SIZE = 320;

function resizeToSquareJpeg(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;

        const canvas = document.createElement("canvas");
        canvas.width = OUTPUT_SIZE;
        canvas.height = OUTPUT_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas indisponível"));
        ctx.drawImage(img, sx, sy, side, side, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function PhotoPicker({
  name,
  initialPreview,
  fallbackPreview,
}: {
  name: string;
  initialPreview?: string | null;
  fallbackPreview: string;
}) {
  const [preview, setPreview] = useState<string>(initialPreview || fallbackPreview);
  const [value, setValue] = useState<string>(initialPreview || "");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    const dataUrl = await resizeToSquareJpeg(file);
    setPreview(dataUrl);
    setValue(dataUrl);
  }

  function handleClear() {
    setPreview(fallbackPreview);
    setValue("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <input type="hidden" name={name} value={value} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={preview}
        alt="Prévia da foto"
        className="h-16 w-16 rounded-2xl border-2 border-slate-200 object-cover"
      />
      <div className="flex flex-col gap-1.5">
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-slate-300">
          <Camera className="h-3.5 w-3.5" />
          {value ? "Trocar foto" : "Adicionar foto"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-500"
          >
            <X className="h-3 w-3" />
            Usar avatar padrão
          </button>
        )}
      </div>
    </div>
  );
}

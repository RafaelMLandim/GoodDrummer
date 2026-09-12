import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-sky-400 text-white border-sky-600 shadow-[0_5px_0_0_theme(colors.sky.600)] hover:bg-sky-300 active:shadow-none active:translate-y-[5px]",
  secondary:
    "bg-white text-slate-700 border-slate-300 shadow-[0_5px_0_0_theme(colors.slate.300)] hover:bg-slate-50 active:shadow-none active:translate-y-[5px]",
  danger:
    "bg-rose-400 text-white border-rose-600 shadow-[0_5px_0_0_theme(colors.rose.600)] hover:bg-rose-300 active:shadow-none active:translate-y-[5px]",
  ghost:
    "bg-transparent text-slate-500 border-transparent hover:bg-slate-100",
};

export const GameButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function GameButton({ className, variant = "primary", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-2.5 font-extrabold tracking-wide transition-all duration-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:translate-y-0",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
});

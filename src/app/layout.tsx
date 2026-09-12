import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GoodDrummer",
  description: "Plataforma gamificada de gestão de alunos de bateria",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${baloo.variable} ${nunito.variable} h-full`}>
      <body
        className="min-h-full flex flex-col bg-slate-50 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

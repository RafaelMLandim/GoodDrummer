import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";

const heroFont = localFont({
  src: "./fonts/NightmareHero.ttf",
  variable: "--font-heading",
  display: "swap",
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
    <html lang="pt-BR" className={`${heroFont.variable} ${nunito.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cható – Omnicanalidad para pequeños comercios desde Telegram",
  description:
    "Centraliza WhatsApp, Instagram, Facebook y web chat en Telegram. Responde a todos tus clientes desde un solo lugar. Económico y fácil de usar.",
  keywords: "omnicanalidad, telegram, whatsapp, pequeños comercios, chat multicanal, CRM",
  openGraph: {
    title: "Cható – Omnicanalidad para pequeños comercios",
    description: "Responde todos tus canales desde Telegram. Simple, económico y poderoso.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "../globals.css";
import Header from "@/app/components/Header";
import { helveticaNeue } from "../ui/fonts";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Catálogo de viviendas - ELEMENTAL",
  description: "Catálogo de viviendas diseñadas por ELEMENTAL ",
};

export const viewport: Viewport = {
  themeColor: '#505050'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="es">
      <body
        className={`${helveticaNeue.className} ${helveticaNeue.variable} flex flex-col h-svh decoration-3 underline-offset-6 transition duration-300 antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
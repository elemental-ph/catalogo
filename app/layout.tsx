import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer"
import { helveticaNeue } from "./ui/fonts";


export const metadata: Metadata = {
  title: "VIVIENDA INDUSTRIALIZADA ELEMENTAL",
  description: "Casas diseñadas por ELEMENTAL con tecnologías industrializadas para proyectos DS19, DS49 y situaciones de emergencia.",
  keywords: "vivienda, social, DS49, incremental, elemental, alejandro aravena, arquitectura, entidad patrocinante, casas, industrializada, industrialización"
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.className} ${helveticaNeue.variable} flex flex-col min-h-screen antialiased`}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}

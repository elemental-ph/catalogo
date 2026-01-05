import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { helveticaNeue } from "./ui/fonts";


export const metadata: Metadata = {
  title: "ELEMENTAL PREFAB",
  description: "Casas diseñadas por ELEMENTAL con tecnologías industrializadas para proyectos DS19, DS49 y situaciones de emergencia.",
  keywords: "vivienda, social, DS49, incremental, elemental, alejandro aravena, arquitectura, entidad patrocinante, casas, industrializada, industrialización"
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
    <html lang="en">
      
      <body
        className={`${helveticaNeue.className} ${helveticaNeue.variable} flex flex-col min-h-svh decoration-3 underline-offset-6 transition duration-300 antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
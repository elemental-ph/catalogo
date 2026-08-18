import type { Metadata, Viewport } from "next";
import "../globals.css";
import Header from "@/app/components/Header";
import { helveticaNeue } from "../ui/fonts";
import Footer from "@/app/components/Footer";

// Reemplaza 'https://tu-dominio.com' por tu dominio de producción o URL de Vercel/ngrok
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://catalogo-topaz-eight.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Catálogo de viviendas - ELEMENTAL",
  description: "Casas diseñadas por ELEMENTAL",
  keywords: "vivienda, social, DS49, incremental, elemental, alejandro aravena, vivienda de emergencia, arquitectura, entidad patrocinante, casas, industrializada, industrialización",
  openGraph: {
    title: "Catálogo de viviendas - ELEMENTAL",
    description: "Casas diseñadas por ELEMENTAL",
    url: siteUrl,
    siteName: "ELEMENTAL",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de viviendas - ELEMENTAL",
    description: "Casas diseñadas por ELEMENTAL",
  },
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
        <Footer />
      </body>
    </html>
  );
}
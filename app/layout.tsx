import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer"
import { helveticaNeue } from "./ui/fonts";


export const metadata: Metadata = {
  title: "VIVIENDA ELEMENTAL",
  description: "catalogo de vivienda industrializada",
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

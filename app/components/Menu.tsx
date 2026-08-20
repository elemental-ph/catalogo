"use client"; // <--- Ahora es Client Component para usar hooks

import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook para leer la URL

const TIPOLOGIAS_QUERY = `*[_type == "tipologia"]|order(sort asc)[0...12]{_id, sigla}`;

export default function Menu() {
  const pathname = usePathname(); // Ejemplo: "/tipologia/VIV-01"
  const [tipologias, setTipologias] = useState<SanityDocument[]>([]);

  // Cargamos los datos en el cliente (puedes usar SWR si prefieres cache avanzado)
  useEffect(() => {
    client.fetch<SanityDocument[]>(TIPOLOGIAS_QUERY).then(setTipologias);
  }, []);

  return (
    <div className="flex flex-row">
      {tipologias.map((tipologia) => {
        // Verificamos si la URL actual termina con la sigla
        const isActive = pathname === `/tipologia/${tipologia.sigla}`;

        return (
          <Link 
            href="/" 
        className="flex items-center gap-1.5 font-bold decoration-3 underline-offset-6 transition duration-300 hover:underline"
      >
        <span className="text-3xl leading-none font-light">&times;</span>
        <span className="text-xl leading-none">volver</span>

          </Link>
        );
      })}
    </div>
  );
}
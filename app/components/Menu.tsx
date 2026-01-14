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
            href={`/tipologia/${tipologia.sigla}`} 
            className={`pointer-events-auto decoration-3 underline-offset-6 transition duration-300 hover:underline ${
              isActive ? "underline font-bold" : "" 
            }`} 
            key={tipologia._id}
          >
            <h1 className="pr-5">{tipologia.sigla}</h1>
          </Link>
        );
      })}
    </div>
  );
}
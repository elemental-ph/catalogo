import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

const TIPOLOGIA_QUERY = `*[_type == "tipologia" && sigla.current == $sigla][0]`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
const options = { next: { revalidate: 30 } };

export default async function TipologiaPage({
  params,
}: {
  params: Promise<{ sigla: string }>;
}) {
  const tipologia = await client.fetch<SanityDocument>(TIPOLOGIA_QUERY, await params, options);
  const TipologíaImageUrl = tipologia.imagen_portada
    ? urlFor(tipologia.imagen_portada)?.width(550).height(310).url()
    : null;
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {TipologíaImageUrl && (
        <img
          src={TipologíaImageUrl}
          alt={tipologia.name}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{tipologia.title}</h1>
      <div className="">
        <p>Published: {new Date(tipologia.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(tipologia.descripcion) && <PortableText value={tipologia.descripcion} />}
      </div>
    </main>
  );
}
import Link from 'next/link'

interface ContactoProps {
  fillColor?: string
}

const Contacto = ({ fillColor = '#fff' }: ContactoProps) => {
  return (
            <Link href="https://www.elementalchile.cl/es/contact" className="pointer-events-auto decoration-3 underline-offset-6 transition duration-300 hover:underline">
               Contacto
            </Link>
  )
}

export default Contacto
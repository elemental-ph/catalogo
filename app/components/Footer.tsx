// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white flex justify-center">
      <div className="max-w-6xl mx-auto font-mono pt-10 pb-10">
            <Link href="https://www.elementalchile.cl/es/contact" className="text-sm hover:underline">
              Contacto
            </Link>
      </div>
    </footer>
  );
};

export default Footer;

// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="text-white flex z-10 justify-center">
      <div className="max-w-6xl mx-auto pt-5 pb-5">
        <p>
            <Link href="https://www.elementalchile.cl/es/contact" className="hover:underline">
               contáctanos
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;

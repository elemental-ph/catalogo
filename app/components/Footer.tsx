// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="text-white flex justify-center">
      <div className="max-w-6xl mx-auto bg-[#505050] z-10 pb-5">
        <p>
            <Link href="https://www.elementalchile.cl/es/contact" className="p-5 hover:underline">
               contáctanos
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;

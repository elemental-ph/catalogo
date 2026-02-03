// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="fixed w-full bottom-0 flex justify-center">
      <div className="w-full mx-auto text-center bg-[#505050] font-bold px-5 py-3 h-12 z-10">
        <p>
            <Link href="/" className="decoration-3 underline-offset-6 transition duration-300 hover:underline">
               Volver a Catálogo
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;

// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="flex justify-center">
      <div className="max-w-6xl mx-auto bg-[#505050] font-bold px-5 py-3 h-14 z-10">
        <p>
            <Link href="https://www.elementalchile.cl/es/" className="decoration-3 underline-offset-6 transition duration-300 hover:underline">
               www.elementalchile.cl
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;

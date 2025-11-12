// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white flex justify-center">
      <div className="max-w-6xl mx-auto font-mono pt-10 pb-10">
        <p>
            <Link href="https://www.elementalchile.cl/es/contact" className="hover:underline">
               contactanos
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="fixed z-30 top-15 right-8 flex justify-end">
      <Link 
        href="/" 
        className="flex items-center gap-1.5 font-bold decoration-3 underline-offset-6 transition duration-300 hover:underline"
      >
        
        <span className="text-xl leading-none">volver</span>
        <span className="text-xl leading-none font-light">&#128473;</span>
        
      </Link>
    </footer>
  );
};

export default Footer;

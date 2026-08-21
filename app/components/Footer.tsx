import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="fixed z-51 top-23 md:top-13 right-5 md:right-8 md:bg-transparent bg-[#505050] flex justify-end">
      <Link 
        href="/" 
        className="flex items-center font-bold decoration-3 underline-offset-6 transition duration-300 hover:underline"
      >
        
        <span className="text-2xl leading-none">volver</span>
        <svg 
          className="w-7 h-7 pt-1 shrink-0 align-bottom" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="3"
          >
            <path strokeLinecap="square" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        
      </Link>
    </footer>
  );
};

export default Footer;

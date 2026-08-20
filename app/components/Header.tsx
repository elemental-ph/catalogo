// components/Footer.tsx
import React from 'react';
import Logo from './logo';
import Link from 'next/link'

const Header: React.FC = () => {

  return (
    <header className="fixed z-50 pointer-events-none transition-all w-full px-6 md:px-8">
  <div className="flex items-center justify-center py-6 md:h-[110px] md:py-0 decoration-3 underline-offset-6 transition duration-300 hover:underline">
    <Link className='flex-column w-[200px] w-full md:w-[300px] pointer-events-auto ' href="/contacto" >
    <div className="md:relative md:right-65 md:top-6 text-xl md:h-fit md:leading-none flex font-bold justify-center">
      Contacte a
    </div>
    
    <div className="flex justify-center">
      <Logo />
    </div>

    </Link>
  </div>
</header>
  );
};

export default Header;

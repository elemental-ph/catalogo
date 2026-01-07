// components/Footer.tsx
import React from 'react';
import Menu from './Menu';
import Logo from './logo';
import Contacto from './contacto';

const Header: React.FC = () => {

  return (
    <header className="fixed z-50 pointer-events-none transition-all w-full">
      <div className='flex  justify-between items-center w-full'>
        <div className='md:h-[130px] flex w-full relative'>
          <div className=' w-full grid grid-cols-2 bg-[#505050] lg:bg-transparent md:grid-cols-3 justify-items-stretch px-6 md:px-8 '>
            <div className="items-center md:hidden flex col-span-2 py-6 justify-center h-full">
            <Logo/>
          </div>
          <div className="flex items-center justify-start">
            <Menu/>
          </div>
          <div className="items-center hidden md:flex justify-center h-full">
            <div className='w-[300px]'>
            <Logo/>
            </div>
          </div>
        <div className="z-10 relative flex items-center justify-end">
            <Contacto/>
        </div>
      </div>
      </div>
      </div>
    </header>
  );
};

export default Header;

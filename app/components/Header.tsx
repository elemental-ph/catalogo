// components/Footer.tsx
import React from 'react';
import Menu from './Menu';
import Logo from './logo';
import Contacto from './contacto';

const Header: React.FC = () => {

  return (
    <header className="fixed z-50 pointer-events-none transition-all w-screen">
      <div className='flex justify-between items-center w-full'>
        <div className='h-[130px] flex flex-col sm:flex-row w-full relative'>
          <div className=' w-full grid grid-cols-2 sm:grid-cols-3 justify-items-stretch py-0 sm:py-10 px-6 sm:px-8'>
          <div className="flex items-center justify-start">
            <Menu/>
          </div>
          <div className="flex items-center justify-center h-full">
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

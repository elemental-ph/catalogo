// components/Footer.tsx
import React from 'react';
import Menu from './Menu';
import Logo from './logo';
import Contacto from './contacto';

const Header: React.FC = () => {

  return (
    <header className="fixed z-50 pointer-events-none transition-all w-full bg-[#505050] px-6 md:px-8">
  <div className="flex items-center justify-center py-6 md:h-[130px] md:py-0">
    <div className="w-[200px] w-full md:w-[300px] flex justify-center">
      <Logo />
    </div>
  </div>
</header>
  );
};

export default Header;

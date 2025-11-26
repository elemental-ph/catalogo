// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const BotonVolver: React.FC = () => {

  return (
       <div className="absolute top-0 text-center bg-[#505050] font-bold w-15 pb-4 px-4 pt-1 right-0">
      <Link className="hover:underline text-4xl" href='/'>&times;</Link>
       </div>
  );
};

export default BotonVolver;
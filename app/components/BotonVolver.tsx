// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const BotonVolver: React.FC = () => {

  return (
       <div className="absolute top-4 left-0">
      <Link className="pt-5 hover:underline bg-[#505050] p-2" href='/'>←volver a inicio</Link>
       </div>
  );
};

export default BotonVolver;
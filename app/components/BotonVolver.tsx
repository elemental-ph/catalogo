// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const BotonVolver: React.FC = () => {

  return (
       <div className="absolute top-0 left-0">
      <Link className="pt-10 font-mono hover:underline bg-[#505050] p-2" href='/'>←volver a inicio</Link>
       </div>
  );
};

export default BotonVolver;
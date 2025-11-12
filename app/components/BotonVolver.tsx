// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const BotonVolver: React.FC = () => {

  return (
       <div className="pb-10 absolute top-8 left-8">
      <Link className="hover:underline bg-[#505050] p-2" href='/'>←volver a inicio</Link>
       </div>
  );
};

export default BotonVolver;
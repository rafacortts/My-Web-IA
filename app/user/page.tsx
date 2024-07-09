import { UserProfile } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Importando o ícone de seta para a esquerda

function UserProfilePage() {
  return (
    <div className='relative flex flex-col items-center justify-center h-full'>
      <UserProfile />
      <Link href="/">
        <button className='absolute top-4 left-4 flex items-center px-2 py-2 text-black border rounded transition-all hover:bg-gray-200'>
          <ArrowLeft className="" />

        </button>
      </Link>
    </div>
  );
}

export default UserProfilePage;

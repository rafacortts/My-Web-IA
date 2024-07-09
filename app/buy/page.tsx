import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Importando o ícone de seta para a esquerda

function UserProfilePage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <button className="flex items-center px-2 py-2 text-black border rounded transition-all hover:bg-gray-200">
            <ArrowLeft className="w-6 h-6 mr-2" />
            Voltar
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">Página em Construção :(</h1>
        <p className="text-gray-600">Esta página está sendo construída. Por favor, volte a usar o chat gratuitamente.</p>
      </div>
    </div>
  );
}

export default UserProfilePage;

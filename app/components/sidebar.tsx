import { UserButton, useUser } from "@clerk/nextjs";
import { Home, Settings2, UserPlus, PlusCircle, CircleFadingPlusIcon, Menu } from "lucide-react"; // Adicionando Info da lucide-react
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function SideNav() {
  const { isSignedIn } = useUser();
  const [showNotification, setShowNotification] = useState(false); // Estado para controlar a exibição da notificação
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar a abertura do menu mobile

  const MenuList = [
    {
      nome: "Entrar",
      icon: Home,
      path: "/buy",
      show: !isSignedIn,
    },
    {
      nome: "Cadastrar",
      icon: UserPlus,
      path: "/buy",
      show: !isSignedIn,
    },
    {
      nome: "Upgrade",
      icon: PlusCircle,
      path: "/buy",
      show: true,
    },
    {
      nome: "Settings",
      icon: Settings2,
      path: "/user",
      show: isSignedIn,
    },
  ];

  // Função para lidar com o clique no ícone de reportar
  const handleReportClick = () => {
    // Implemente aqui a lógica para relatar algo, como abrir um modal ou realizar uma ação específica
    setShowNotification(true); // Exibe a notificação de report
    setTimeout(() => {
      setShowNotification(false); // Esconde a notificação após alguns segundos
    }, 3000); // Esconde após 3 segundos
  };

  // Função para abrir o menu mobile
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  // Função para fechar o menu mobile
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative p-6 shadow-sm border text-black">
      {/* Barra superior */}
      <div className="flex items-center justify-between mb-4">
        <UserButton />
        {/* Botão para abrir o menu mobile */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={openMobileMenu}
          aria-label="Abrir menu"
        >
          <Menu  className="w-8 h-8" />
        </button>
      </div>

      {/* Logo (somente visível em telas maiores) */}
      <div className="hidden sm:flex justify-center mb-6">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>

      {/* Menu de ícones para dispositivos mobile */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-0 right-0 bottom-0 bg-gray-100 w-64 px-4 py-8 shadow-lg z-50">
          {/* Botão para fechar o menu mobile */}
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500"
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Itens do menu */}
          {MenuList.filter((menu) => menu.show).map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded">
                <menu.icon className="w-6 h-6" />
                <span>{menu.nome}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Componente de notificação como modal */}
      {showNotification && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <strong className="font-bold">Notificação:</strong>
            <span className="block sm:inline"> Bug report enviado com sucesso!</span>

            <svg
              className="fill-current h-6 w-6 text-green-500 mt-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 0 1 .707 0l4 4a.5.5 0 0 1 0 .707l-4 4a.5.5 0 0 1-.707-.707L17.293 10l-3.646-3.646a.5.5 0 0 1 0-.707zm-8 0a.5.5 0 0 0-.707 0l-4 4a.5.5 0 0 0 0 .707l4 4a.5.5 0 0 0 .707-.707L2.707 10l3.646-3.646a.5.5 0 0 0 0-.707z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Menu principal para telas maiores */}
      <div className="hidden sm:flex flex-col">
        {MenuList.filter((menu) => menu.show).map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded">
              <menu.icon className="w-6 h-6" />
              <span>{menu.nome}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;

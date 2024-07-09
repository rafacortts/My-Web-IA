import { UserButton, useUser } from "@clerk/nextjs";
import { FileClock, Home, Settings2, Wallet, Share2, Info } from "lucide-react"; // Adicionando Info da lucide-react
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SideNav() {
  const { isSignedIn } = useUser();
  const MenuList = [
    {
      nome: "Entrar",
      icon: Home,
      path: "/buy",
      show: !isSignedIn,
    },
    {
      nome: "Criar Conta",
      icon: FileClock,
      path: "/buy",
      show: !isSignedIn,
    },
    {
      nome: "Faça Upgrade",
      icon: Wallet,
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

  return (
    <div className="h-screen p-6 shadow-sm border text-black bg-gray-100">
      <div className="flex items-center justify-end gap-2">
        <Share2 className="w-6 h-6 cursor-pointer" />
        <UserButton />
      </div>
      <div className="flex justify-center mb-6">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>
     
      <div>
        {MenuList.filter(menu => menu.show).map((menu, index) => (
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

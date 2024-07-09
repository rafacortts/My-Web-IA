import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-5 shadow-sm border-b-2 justify-between items-center flex">
      <div className="flex gap-2 items-center p-2 rounded-md max-w-md">
        <Search />
        <input type="text" placeholder="Pesquise" className="outline-none"/>
      </div>
      <div>
        <h2 className="bg-orange-600 p-1 rounded-full text-white ">
            Lorem ipsum dolor sit amet.
        </h2>
      </div>
    </div>
  );
}

export default Header;

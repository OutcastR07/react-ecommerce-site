import React, { useContext } from "react";
import { BsCart } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  return (
    <header className="bg-pink-200">
      <div>Header</div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex relative"
      >
        <BsCart className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;

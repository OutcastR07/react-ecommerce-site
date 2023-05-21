import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { UserContext } from "../contexts/UserContext";
import { default as Logo } from "../img/logo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);

  // Event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div>
            <Link to={"/"}>
              <img className="w-14 lg:h-[75px] lg:w-[75px]" src={Logo} alt="" />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            {user ? (
              <>
                <div>{user.username}</div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to={"/login"}>
                <button className="hover:underline">Login</button>
              </Link>
            )}
            {/* cart */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex relative"
            >
              <ShoppingCartIcon />
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-sm w-5 h-5 text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 640px) {
            .container {
              padding: 0 1rem;
            }
            .text-xl {
              font-size: 1rem;
            }
            .text-sm {
              font-size: 0.75rem;
            }
            .hidden {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;

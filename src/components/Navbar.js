import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { UserContext } from "../contexts/UserContext";
import { default as Logo } from "../img/logo.png";
import UserModal from "./UserModal";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleUsernameClick = () => {
    setShowLists(!showLists);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowLists(false);
    }
  };

  const handleDetailsClick = () => {
    setShowLists(false);
    handleOpenModal();
  };

  const handleHistoryClick = () => {
    setShowLists(false);
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
              <div className="relative" ref={userMenuRef}>
                <div className="cursor-pointer" onClick={handleUsernameClick}>
                  {user.username}
                </div>
                {showLists && (
                  <div className="absolute mt-2 py-2 bg-white shadow-md rounded-md text-sm z-10">
                    <button
                      className="block w-full px-4 py-2 hover:bg-gray-100"
                      onClick={handleDetailsClick}
                    >
                      Details
                    </button>
                    <Link to="/history" className="nav-link">
                      <button
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                        onClick={handleHistoryClick}
                      >
                        History
                      </button>
                    </Link>
                    <button
                      className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
      <UserModal open={modalOpen} onClose={handleCloseModal} user={user} />
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

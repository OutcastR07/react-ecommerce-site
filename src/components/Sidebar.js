import { ArrowForward, DeleteOutline } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { UserContext } from "../contexts/UserContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, totalPrice, itemAmount, addPurchaseToHistory } =
    useContext(CartContext);
  const { user } = useContext(UserContext);

  // Generate a unique order ID
  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `ORDER${timestamp}${randomNum}`;
  };

  // Handle purchase action
  const handlePurchase = () => {
    if (user) {
      // Create purchase data
      const purchaseData = {
        orderId: generateOrderId(),
        products: cart,
        totalPrice: totalPrice,
        timestamp: new Date().toLocaleString(),
        // Add other relevant purchase details
      };

      // Add purchase data to history
      addPurchaseToHistory(purchaseData);

      // Clear the cart
      clearCart();
    } else {
      // User is not logged in, handle accordingly
      console.log("User is not logged in");
      // You can show an error message or redirect to the login page
    }
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[50vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Cart({`${itemAmount}`})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <ArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[340px] lg:h-[450px] sm:h-[700px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* total price */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>${" "}
            {parseFloat(totalPrice).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <DeleteOutline />
          </div>
        </div>
        {user ? (
          <Link
            to="/"
            onClick={handlePurchase}
            className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
          >
            Purchase
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
          >
            Log in to Purchase
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

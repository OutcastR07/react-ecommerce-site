import BackspaceIcon from "@mui/icons-material/Backspace";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const PurchaseHistory = () => {
  const { purchaseHistory } = useContext(CartContext);

  return (
    <div className="mt-10 px-8 sm:px-12 lg:px-14">
      <div className="mt-8">
        <Link
          to="/"
          className="flex items-center gap-x-2 text-gray-500 hover:underline"
        >
          <BackspaceIcon />
          <span className="text-primary text-lg">Back</span>
        </Link>
      </div>
      <h2 className="my-10 font-semibold text-5xl">Purchase History</h2>
      {purchaseHistory.length > 0 ? (
        purchaseHistory.map((purchase, index) => (
          <div key={index}>
            <p>
              <span className="text-base text-red-500 font-semibold">
                Order ID:{" "}
              </span>
              <span className="text-lg">{purchase.orderId}</span>
            </p>
            <p>
              <span className="text-base text-red-500 font-semibold">
                Total Price:{" "}
              </span>
              <span className="text-lg">
                {parseFloat(purchase.totalPrice).toFixed(2)}
              </span>
            </p>
            <p>
              <span className="text-base text-red-500 font-semibold">
                Ordered at:{" "}
              </span>
              <span className="text-lg">{purchase.timestamp}</span>
            </p>
            {index !== purchaseHistory.length - 1 && (
              <hr className="my-8 border-t border-gray-300" />
            )}
          </div>
        ))
      ) : (
        <p className="my-10 font-semibold text-5xl">
          No purchase history available.
        </p>
      )}
    </div>
  );
};

export default PurchaseHistory;

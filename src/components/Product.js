import React, { useContext } from "react";
import { BsEyeFill, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { image, id, description, title, price } = product;
  return (
    <div className="max-w-sm rounded shadow-lg p-4">
      <div className="h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-1 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-y-2">
          <button onClick={() => addToCart(product, id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-2 text-lg">{title}</h2>
        </Link>
        <div className="font-semibold text-3xl">$ {price}</div>
        <div className="text-xs text-gray-500 mt-2 text-justify">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Product;

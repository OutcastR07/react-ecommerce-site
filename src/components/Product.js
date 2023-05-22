import { Add, Visibility } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { image, id, category, title, price } = product;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Timer cleanup
    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

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
              <Add className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <Visibility />
          </Link>
        </div>
      </div>
      <div>
        <Link to={`/product/${id}`}>
          <div className="font-semibold mb-2 text-3xl">$ {price}</div>
          <div className="text-gray-500 text-justify text-sm capitalize">
            {category}
          </div>
          <h2 className="font-semibold mt-2 text-lg">{title}</h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;

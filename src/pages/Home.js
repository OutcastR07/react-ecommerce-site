import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import Banner from "../components/Banner";
import Product from "../components/Product";
import { ProductContext } from "../contexts/ProductContext";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  let sortedProducts = currentProducts;

  switch (sortOption) {
    case "price-low-to-high":
      sortedProducts = currentProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high-to-low":
      sortedProducts = currentProducts.sort((a, b) => b.price - a.price);
      break;
  }

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSortOption(""); // Reset the sorting option
  };

  return (
    <div>
      <Banner />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-start mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`${
                sortOption ? "border-none" : "border"
              } bg-transparent p-2 focus:outline-none`}
            >
              <option value="">Sort By</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl-grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {sortedProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center mt-14">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              className="bg-gray-200 hover:bg-blue-400 py-2 px-2 mr-2 rounded hover:text-white"
            >
              <ArrowBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={`${
                    currentPage === pageNumber
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-400 hover:text-white py-2 px-4 rounded mx-2`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
              className="bg-gray-200 hover:bg-blue-400 py-2 px-2 ml-2 rounded hover:text-white"
            >
              <ArrowForward />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

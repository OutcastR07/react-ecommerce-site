import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CartProvider from "./contexts/CartContext"; // Import CartProvider
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import PurchaseHistory from "./pages/PurchaseHistory";

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            {" "}
            {/* Wrap the CartProvider */}
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <RoutesOutlet />
                    <Footer />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route exact path="/history" element={<PurchaseHistory />} />
            </Routes>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

const RoutesOutlet = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <UserProvider>
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
          </Routes>
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

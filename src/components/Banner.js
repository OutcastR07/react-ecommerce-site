import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="h-[675px] bg-blue-200 py-24">
      <div className="container mx-auto flex justify-start h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>WHAT'S NEW
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            GET YOUR DEAL NOW! <br />
            <span className="font-semibold">UPTO 50% OFF</span>
          </h1>
          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 border-primary"
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;

import React from "react";
import img from "../assets/img/home.png";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center bg-home bg-no-repeat bg-cover bg-fixed bg-left lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10">
      <div className=" w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0 text-white">
        <h1 className="font-semibold text-5xl text-center lg:text-start leading-tight">

          Roasting the finest coffee the globe has to offer

        </h1>
        <p>
          Our coffee is proudly roasted on the north shore in Vancouver,
          British Columbia. <br></br> Want to see more products?
          Check our product catalog!
        </p>
        <br></br>
        <div className=" flex flex-row gap-6 text-black">
          <Button title="PRODUCT CATALOG" />

        </div>
      </div>

    </div>
  );
};

export default Home;

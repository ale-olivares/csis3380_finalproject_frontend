import React from "react";
import img1 from "../assets/img/coffeebeasns.png";
import MenuCard from "../layouts/MenuCard";

const Menu = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor">
      <h1 className=" font-semibold text-center text-4xl mt-24 mb-8 text-white">
        Our products
      </h1>

      <div className=" flex flex-wrap pb-8 gap-8 justify-center">
        <MenuCard img={img1} title="Costa Rica Rainforest Medium Roast Coffee" />
        <MenuCard img={img1} title="Sun-Dried Ethiopia Kayon Mountain Farm" />
        <MenuCard img={img1} title="Harar (Harrar) Artisan Coffee Beans" />
        <MenuCard img={img1} title="Jamaican Blue Mountain" />
        <MenuCard img={img1} title="Maragatura Coffee Beans" />
        <MenuCard img={img1} title="Tanzania Peaberry Coffee" />
      </div>
    </div>
  );
};

export default Menu;

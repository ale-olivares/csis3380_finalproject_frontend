import React from "react";

const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-backgroundColor to-brightColor  text-white  mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">CoffeBeans.</h1>
          <p className=" text-sm">
            Our proudly owned coffee wholesale
            provides the highest quality in coffe brought from the South America, with
            artisanal flavour and different roast types to boost your health and mindset.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              coffebeans@wholesale.com
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              +1 778 345 8534
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Social media
            </a>
          </nav>
        </div>
      </div>

      <div>
          <p className=" text-sm text-center py-2">
            Copyright © 2024 developed by
            <span className=" text-hoverColor">
              {" "}
              CoffeeBeans.{" "}
            </span>
            | All rights reserved
          </p>
      </div>

    </div>
  );
};

export default Footer;

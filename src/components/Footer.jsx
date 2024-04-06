import React from "react";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-backgroundColor to-brightColor  text-white  mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">CoffeeBeans.</h1>
          <p className=" text-sm">
            Our proudly owned coffee wholesale
            provides the highest quality in coffe brought from the South America, with
            artisanal flavour and different roast types to boost your health and mindset.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Details</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-hoverColor transition-all cursor-pointer"
              href="/"
            >
              coffeebeans@wholesale.com
            </a>
            <a
              className=" hover:text-hoverColor transition-all cursor-pointer"
              href="/"
            >
              +1 778 345 8534
            </a>
            <NavLink
              to="/contactForm"
            >
              <span className="hover:text-hoverColor transition-all cursor-pointer">Contact us</span>
            </NavLink>
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

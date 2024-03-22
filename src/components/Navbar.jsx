import React, { useState } from "react";
import { Link } from "react-scroll";
import { GiCoffeeBeans } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";



import Button from "../layouts/Button";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  let navigate = useNavigate();
  const ToLogin = () => {
    let path = "/aboutus";
    navigate(path);
  }

  return (
    <div className="fixed-top w-full z-10">
      <div>
        <div className=" flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className=" flex flex-row items-center cursor-pointer gap-2">
            <NavLink to="/">
              <span>
                <GiCoffeeBeans size={25} style={{ color: "white" }} />
              </span>
            </NavLink>

            <h1 className=" text-xl text-white font-semibold">CoffeeBeans.</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg text-white font-medium gap-8">
            <NavLink
              to="/"
              className="group relative inline-block cursor-pointer hover:text-hoverColor"
            >
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/catalog"
              className="group relative inline-block cursor-pointer hover:text-hoverColor"
            >
              Product Catalog
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/wholesale"

              className="group relative inline-block cursor-pointer hover:text-hoverColor"
            >
              Wholesale
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/aboutus"
              className="group relative inline-block cursor-pointer hover:text-hoverColor"
            >
              About us
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </NavLink>


          </nav>

          <div className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <NavLink to="/wholesale">
              <FaCartShopping size={25} style={{ color: "white" }} />

            </NavLink>
            <NavLink to="/login">
              <Button title="Login" />

            </NavLink>

          </div>


          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="catalog"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Product Catalog
          </Link>
          <Link
            to="wholesale"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Wholesale
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About us
          </Link>
          <Button title="login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

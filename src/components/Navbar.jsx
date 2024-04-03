import React, { useEffect, useState } from "react";
import { GiCoffeeBeans } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getCurrentUser, isAdmin as checkAdmin, logout } from "../services/AuthService";


import Button from "../layouts/Button";

const Navbar = () => {
  const { totalItemsCart } = useCart();
  const [menu, setMenu] = useState(false);
  let navigate = useNavigate();
  const user = getCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(checkAdmin());
  }, [user]); 

  return (
      <div className="fixed-top w-full z-10">
         {!user ? (
            <div className=" flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className=" flex flex-row items-center cursor-pointer gap-2">
                  <NavLink to="/">
                    <span> <GiCoffeeBeans size={25} style={{ color: "white" }} /> </span>
                  </NavLink>
                  <h1 className=" text-xl text-white font-semibold">CoffeeBeans.</h1>
              </div>

              <nav className="hidden md:flex flex-row items-center text-lg text-white font-medium gap-8">
                <NavLink to="/" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Home</NavLink>
                <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Product Catalog</NavLink>
                <NavLink to="/wholesale" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Wholesale</NavLink>
                <NavLink to="/aboutus" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>About us</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Contact Form</NavLink>
              </nav>

              <div className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                <NavLink to="/login">
                  <Button title="Login" />
                </NavLink>
              </div>
            </div>
            ):(
              isAdmin?(
                <div className=" flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className=" flex flex-row items-center cursor-pointer gap-2">
                    <NavLink to="/">
                      <span> <GiCoffeeBeans size={25} style={{ color: "white" }} /> </span>
                    </NavLink>
                    <h1 className=" text-xl text-white font-semibold">CoffeeBeans.</h1>
                  </div>

                  <nav className="hidden md:flex flex-row items-center text-lg text-white font-medium gap-8">
                    <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Product Catalog</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Products</NavLink>
                    <NavLink to="/users" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Users</NavLink>
                    <NavLink to="/createUser" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Create User</NavLink>
                    <NavLink to="/inquiries" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Inquiries</NavLink>
                  </nav>

                  <div className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                    <NavLink to="/">
                      <Button onClick={()=>logout()} title="Logout" />
                    </NavLink>
                  </div>
                </div>
              ):(
                <div className=" flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className=" flex flex-row items-center cursor-pointer gap-2">
                    <NavLink to="/">
                      <span> <GiCoffeeBeans size={25} style={{ color: "white" }} /> </span>
                    </NavLink>
                    <h1 className=" text-xl text-white font-semibold">CoffeeBeans.</h1>
                  </div>

                  <nav className="hidden md:flex flex-row items-center text-lg text-white font-medium gap-8">
                    <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Product Catalog</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}>Contact Form</NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor"}> Profile</NavLink>
                  </nav>

                  <div className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                    <NavLink to="/cart" className="relative">
                      <FaCartShopping size={25} style={{ color: "white" }} />
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">{totalItemsCart} </span>
                    </NavLink>
                    <NavLink to="/">
                      <Button onClick={()=>logout()} title="Logout" />
                    </NavLink>
                  </div>
                </div>
              )
            )
          }
      </div> 
    
  );
};

export default Navbar;

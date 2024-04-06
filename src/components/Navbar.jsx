import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { GiCoffeeBeans } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";
import { getCurrentUser, isAdmin as checkAdmin, logout } from "../services/AuthService";
import DropdownMenu from "./Menus/DropdownMenu";
import GeneralLinks from "./Menus/GeneralLinks";
import AdminLinks  from "./Menus/AdminLinks";
import UserLinks from "./Menus/UserLinks";

const Navbar = () => {
  const { totalItemsCart } = useCart();
  const user = getCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(checkAdmin());
  }, [user]); 

  useEffect(() => {
    setIsNavbarOpen(false);
  }, [location]);


   //Toggle NavBar
   const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
    <div className="fixed-top w-full z-10">
      <section className="relative mx-auto">


          {/* <!-- navbar --> */}
        <nav className="flex justify-between  bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <NavLink to="/">
                <span> <GiCoffeeBeans size={25} style={{ color: "white" }} /> </span>
              </NavLink>
              <h1 className="pl-2 text-xl text-white font-semibold">CoffeeBeans.</h1>

            {/* <!-- Nav Links --> */}
            {!user ? (
              <nav className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 lg:text-lg">
                <GeneralLinks />
            </nav>):
            (isAdmin?(
              <nav className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 lg:text-lg">
                <AdminLinks />
              </nav>
            ):(
              <nav className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 lg:text-lg">
                <UserLinks/>
              </nav>
            ))}
            
            {/* <!-- Header Icons --> */}
            <div className="hidden xl:flex items-center space-x-5 items-center lg:text-lg font-medium gap-4">
              {/* <!-- Cart Icon --> */}
              {user ? (
                <>
                  <p className="text-white">Hello, {user.username}!</p>
                  {!isAdmin && (
                    <NavLink to="/cart" className="relative">
                      <FaCartShopping size={25} style={{ color: "white" }} />
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">{totalItemsCart}</span>
                    </NavLink>
                  )}
                  <NavLink to="/">
                  <button onClick={() => logout()} className="mr-10 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-xs text-white">Logout</span>
                  </button>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login" className="mr-10 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-white">Login</span>
                </NavLink>
              )
            }  
            </div>
          </div>

          {/* <!-- Responsive navbar --> */}
          {user && !isAdmin && (
            <NavLink to="/cart" className="xl:hidden flex mr-6 items-center">
              <FaCartShopping size={25} style={{ color: "white" }} />
              {totalItemsCart > 0 && (
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
              
            </NavLink>
          )}
          <button onClick={toggleNavbar} className="navbar-burger mr-12 xl:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
       
        </nav>
        {isNavbarOpen && (
          <DropdownMenu/>
        )}
        
      </section>
    </div>
    </>
    
  );
};

export default Navbar;

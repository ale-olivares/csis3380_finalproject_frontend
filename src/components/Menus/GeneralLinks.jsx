import React from "react";
import { NavLink } from 'react-router-dom';

const GeneralLinks = () => {
    return(
        <>
            <NavLink to="/" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Home</NavLink>
              <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Catalog</NavLink>
              <NavLink to="/wholesale" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Wholesale</NavLink>
              <NavLink to="/aboutus" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>About us</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Contact Us</NavLink>
        </>
    );
}

export default GeneralLinks;
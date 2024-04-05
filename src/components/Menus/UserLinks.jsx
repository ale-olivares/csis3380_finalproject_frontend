import React from "react";
import { NavLink } from 'react-router-dom';

const UserLinks = () => {
    return(
        <>
            <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Catalog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Contact Us</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Profile</NavLink>
        </>
    );
}

export default UserLinks;
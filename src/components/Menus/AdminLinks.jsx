import React from "react";
import { NavLink } from 'react-router-dom';

const AdminLinks = () => {
    return(
        <>
            <NavLink to="/catalog" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Catalog</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Products</NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}>Users</NavLink>
            <NavLink to="/createUser" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Create User</NavLink>
            <NavLink to="/inquiries" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Inquiries</NavLink>
        </>
    );
}

export default AdminLinks;
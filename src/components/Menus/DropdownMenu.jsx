import React,  {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentUser, isAdmin as checkAdmin, logout } from "../../services/AuthService";
import GeneralLinks from './GeneralLinks';
import UserLinks from './UserLinks';
import AdminLinks from './AdminLinks';
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
    const user = getCurrentUser();
    const [isAdmin, setIsAdmin] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(checkAdmin());
      }, [user]); 

    //Handle logout
    const handleLogout = () => {
        logout();
        navigate("/");
    }
      
  return (
    <div className="lg:hidden bg-gradient-to-r from-backgroundColor to-brightColor bg-opacity-0 p-4 mx-auto flex flex-wrap justify-center items-center font-semibold font-heading space-x-4 space-y-1">
      {!user ? (
        <>
           <GeneralLinks/>
            <NavLink to="/login" className={({ isActive }) => isActive  ?"group relative inline-block cursor-pointer text-hoverColor"  : "group relative inline-block cursor-pointer hover:text-hoverColor text-white"}> Login</NavLink>
        </>
      ) : isAdmin ? (
        <>
          < AdminLinks/>
          <button onClick={handleLogout} className="group relative inline-block cursor-pointer hover:text-hoverColor text-white">Logout </button>
        </>
      ) : (
        <>
          <UserLinks/>
          <button onClick={handleLogout} className="group relative inline-block cursor-pointer hover:text-hoverColor text-white">Logout </button>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;


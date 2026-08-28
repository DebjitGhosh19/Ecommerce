import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";
const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const { search, showSearch, setSearch, setShowSearch, getCartCount } =
    useContext(ShopContext);
  return (
    <div className=" cursor-pointer flex justify-between items-center py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="logo" className="w-20 sm:w-36 " />
      </Link>
      <div className="hidden sm:flex  justify-center text-sm text-gray-700 ">
        <ul className="flex gap-2 ">
          <NavLink to="/" className="flex flex-col items-center  gap-1 ">
            <p className="uppercase">Home</p>
            <hr className="w-2/4 border-none h-[1.5px]  bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center  gap-1 "
          >
            <p className="uppercase">Collection</p>
            <hr className="w-2/4 border-none h-[1.5px]  bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center  gap-1 ">
            <p className=" uppercase ">About</p>
            <hr className="w-2/4 border-none h-[1.5px]  bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center  gap-1 ">
            <p className="uppercase">Contact</p>
            <hr className="w-2/4 border-none h-[1.5px]  bg-gray-700 hidden" />
          </NavLink>
        </ul>
      </div>
      <div className="flex gap-6 items-center ">
        <img
          src={assets.search_icon}
          className="w-5"
          alt="searchIcon"
          onClick={() => setShowSearch(true)}
        />
        <div className="relative group ">
        <Link to="/login">  <img src={assets.profile_icon} className="w-5" alt="" /></Link>
          <div className=" absolute hidden group-hover:flex flex-col w-36  bg-slate-100 text-gray-600 p-2 right-0 rounded ">
            <p className="border p-4 m-1 cursor-pointer hover:text-green-600">
              My Profile
            </p>
            <p className="border p-4 m-1 cursor-pointer hover:text-green-600">
              Orders
            </p>
            <p className="border p-4 m-1 cursor-pointer hover:text-green-600">
              Logout
            </p>
          </div>
        </div>
        <Link to="/cart" className="relative ">
          <img src={assets.cart_icon} alt="cartIcon" className="w-5  " />
          <span className="absolute bg-black text-white right-[-5px] bottom-[-5px] rounded-full w-4 text-center leading-4 text-[8px] ">
            {getCartCount()}
          </span>
        </Link>
        <img
          onClick={() => setMenu(!menu)}
          src={assets.menu_icon}
          className="w-6  sm:hidden "
          alt=""
        />
      </div>

      {menu ? (
        <div className=" top-0 right-0 bottom-0 absolute  z-50 flex  flex-col w-full h-screen bg-amber-50">
          <div className="flex justify-between mx-2 items-center mt-2 ">
            <div className="flex items-center" onClick={() => setMenu(false)}>
              <img
                src={assets.dropdown_icon}
                className=" rotate-180 p-2 w-6  "
                alt=""
              />
              <p>Back</p>
            </div>
          </div>
          <ul className="flex flex-col  m-2  ">
            <NavLink
              onClick={() => setMenu(false)}
              to="/"
              className="flex flex-col items-center justify-center gap-1 border p-2"
            >
              <p className="uppercase">Home</p>
            </NavLink>
            <NavLink
              onClick={() => setMenu(false)}
              to="/collection"
              className="flex flex-col items-center justify-center gap-1 border-x p-2"
            >
              <p className="uppercase">Collection</p>
            </NavLink>
            <NavLink
              onClick={() => setMenu(false)}
              to="/about"
              className="flex flex-col items-center justify-center gap-1 border p-2"
            >
              <p className=" uppercase ">About</p>
            </NavLink>
            <NavLink
              onClick={() => setMenu(false)}
              to="/contact"
              className="flex flex-col items-center justify-center gap-1 border-x  border-b p-2"
            >
              <p className="uppercase">Contact</p>
            </NavLink>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;

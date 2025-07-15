// Example of updated Sidebar.jsx with dark mode classes

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSideOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <aside className={`hidden lg:flex fixed top-0 min-h-screen text-white z-50`}>
        <div className="w-16 bg-black dark:bg-gray-800 flex flex-col justify-between items-center py-6 z-20">
          <img src={logo} alt="Yummy Logo" className="w-10" />
          <div
            onClick={handleSideOpen}
            className="text-2xl cursor-pointer mt-4 hover:text-lime-500 transition"
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <ThemeToggle />
          <div className="flex flex-col items-center text-sm space-y-3 mb-4">
            <i className="fa-solid fa-globe"></i>
            <i className="fa-solid fa-share-nodes"></i>
          </div>
        </div>

        <div
          className={`fixed top-0 left-16 h-full bg-black dark:bg-gray-800 w-64 p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-10 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="space-y-4 mt-6 text-lg font-medium">
            {[
              ["/", "Home"],
              ["/category", "Categories"],
              ["/area", "Area"],
              ["/ingredients", "Ingredients"],
              ["/contact", "Contact Us"],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink
                  onClick={handleCloseSidebar}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lime-400"
                      : "hover:text-lime-400 transition"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="flex space-x-4 mb-2 text-xl hover:text-lime-400 cursor-pointer transition">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-solid fa-globe"></i>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">© 2019 All Rights Reserved.</p>
          </div>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black dark:bg-gray-800 z-50">
        <ul className="flex items-center justify-around py-3 text-white text-sm">
          {[
            ["/", "Home", "fa-house"],
            ["/category", "Categories", "fa-list"],
            ["/area", "Area", "fa-map-marker-alt"],
            ["/ingredients", "Ingredients", "fa-carrot"],
            ["/contact", "Contact", "fa-envelope"],
          ].map(([to, label, icon]) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-all duration-200 ${
                    isActive ? "text-yellow-300" : ""
                  }`
                }
              >
                <i className={`fas ${icon}`}></i>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <div className="container-fluid bg-slate-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 lg:hidden">
      <div className="container  flex justify-between items-center py-4 px-2 md:px-0  ">
        <div className="logo">
          <img src={logo} alt="yummyLogo" className="w-12 md:w-16" />
        </div>
        <div className="theme">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

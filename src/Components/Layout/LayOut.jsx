// Example of updated LayOut.jsx with dark mode classes

import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function LayOut() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        <Sidebar />
        <main className="mt-16 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </>
  );
}

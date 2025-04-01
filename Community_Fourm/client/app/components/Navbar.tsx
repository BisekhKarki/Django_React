"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b-1 border-b-gray-100 shadow-md">
      <div className=" flex justify-between px-10 py-4">
        <p>Redit</p>
        <input
          placeholder="search"
          className="border-1 border-gray-300 rounded px-3"
        />
        <button className="border-1 border-gray-300 rounded px-5 py-1">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

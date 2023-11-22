import React, { useState } from "react";
import { Bars4Icon } from "@heroicons/react/24/solid";

function MobileDropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative group">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-800 hover:text-gray-600 focus:outline-none"
      >
        <Bars4Icon className="h-5 w-5 text-gray-500" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul className="p-2">
            <li className="hover:bg-gray-100 cursor-pointer">Products</li>
            <li className="hover:bg-gray-100 cursor-pointer">Services</li>
            <li className="hover:bg-gray-100 cursor-pointer">Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileDropdown;

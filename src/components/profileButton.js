import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';


function ProfileButton({ avatarUrl }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {logout} = useAuth0();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) =>{
    toggleDropdown();
    logout();
  }

  return (
    <div className="relative group">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-800 hover:text-gray-600 focus:outline-none"
      >
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul className="p-2">
            <li className="hover:bg-gray-100 cursor-pointer">Profile</li>

            <li className="hover:bg-gray-100 cursor-pointer">Settings</li>

            <li className="hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;

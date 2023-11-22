import { useState } from "react";
import Cart from "../context/cart";
import { useAuth0 } from "@auth0/auth0-react";
import { ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/solid";
import ProfileButton from "./profileButton";
import MobileDropdown from "./mobileDropdown";
import logo from "../assets/images/cslogo.png";

export default function Navbar() {
  const [showModal, setshowModal] = useState(false);
  const { user } = useAuth0();

  const { loginWithPopup } = useAuth0();

  const toggle = () => {
    setshowModal(!showModal);
  };

  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section with Logo */}
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </a>
        </div>

        {/* Mobile Dropdown Button (displayed on mobile) */}
        <div className="md:hidden">
          <MobileDropdown />
        </div>

        {/* Middle Section with Options (displayed on desktop and tablet) */}
        <div className="hidden md:flex space-x-4 font-medium text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
          <a
            href="/products"
            className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:shadow-lg ..."
          >
            Products
          </a>
          <a
            href="/services"
            className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none  hover:shadow-lg ..."
          >
            Services
          </a>
          <a
            href="/about"
            className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:shadow-lg ..."
          >
            About
          </a>
          <a
            href="/contact"
            className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:shadow-lg ..."
          >
            Contact
          </a>
        </div>

        {/* Right Section with Cart Icon and Login Button */}
        <div className="flex items-center space-x-4">
          {!showModal && (
            <button
              className="px-4 py-2 text-white text-xs font-bold uppercase rounded hover:bg-[#3F2305] focus:outline-none focus:bg-gray-700 "
              onClick={toggle}
            >
              <ShoppingCartIcon className="h-5 w-5 text-gray-500" />
            </button>
          )}

          {!user ? (
            <button
              className="px-4 py-2 text-black text-xs font-semibold  uppercase rounded hover:bg-[#3F2305] focus:outline-none focus:bg-gray-700"
              onClick={() => loginWithPopup()}
            >
              <UsersIcon className="h-5 w-5 text-gray-500" />
            </button>
          ) : (
            <ProfileButton avatarUrl={user.picture} />
          )}
          <Cart showModal={showModal} toggle={toggle} />
        </div>
      </div>
    </nav>
  );
}

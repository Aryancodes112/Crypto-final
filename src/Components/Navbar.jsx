import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../assets/Logo.png';
import './Navbar.css'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-container bg-gray-800 p-4 flex justify-between items-center">
      <div className="logo">
       
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="text-white px-2 py-2 pt-1 block md:inline-block">
          Home
        </Link>
        <Link to="/coins" className="text-white ml-4 px-2 py-2 pt-1 block md:inline-block">
          Coins
        </Link>
        <Link to="/exchanges" className="text-white ml-4 px-2 py-2 pt-1 block md:inline-block">
          Exchanges
        </Link>
        <Link to="/news" className="text-white ml-4 px-2 py-2 pt-1 block md:inline-block">
          News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-4 ">
      <nav className="container mx-auto px-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold text-[#6300B3] tracking-wide transition-all duration-300 hover:text-[#9b59b6]"
        >
          QuickFix Nepal
        </Link>

        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="px-6 py-2 bg-[#6300B3] text-white rounded-md shadow-lg hover:bg-[#9b59b6] transition-all duration-300"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            className="px-6 py-2 bg-[#6300B3] text-white rounded-md shadow-lg hover:bg-[#9b59b6] transition-all duration-300"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;

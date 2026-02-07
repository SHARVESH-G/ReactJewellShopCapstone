import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-logo">💎 Jewelry Finder</a>
        <div className="nav-links">
          <a href="/">Search</a>
          <a href="/admin">Admin</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <h1 className="navbar-brand">My Dashboard</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/createorder" className="navbar-link">
          Create Order
        </Link>
        <Link to="/updateorder" className="navbar-link">
          Update Order
        </Link>

        <Link to="/trackorder" className="navbar-link">
          Track Order
        </Link>
        <Link to="/myorders" className="navbar-link">
          My Orders
        </Link>
        <Link to="/" className="navbar-link login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/reset.css";
import "../styles/common.css";
import "../styles/utilities.css";
import "../styles/NavBar.css";

export const NavBar = () => {
  return (
    <nav className="nav-wrap">
      <ul className="flex-center g30">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Social</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

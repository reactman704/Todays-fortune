import React from "react";
import "../styles/common.css";
import "../styles/utilities.css";
import "../styles/NavBar.css";

export const NavBar = () => {
  return (
    <>
      <nav>
        <ul className="nav-wrap flex-center g30">
          <li>
            <a href="">Menu</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Social</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

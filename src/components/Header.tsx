import React from "react";
import "../styles/Header.css";
import { NavBar } from "./NavBar";

export const Header = () => {
  return (
    <>
      <header>
        <a href="/">
          <img src="/assets/Logo.png" alt="Logo" />
        </a>
        <NavBar />
      </header>
    </>
  );
};

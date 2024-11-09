import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/wishList">Wish List</Link>
        </li>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
        <li>
          <Link to="/profile">User Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

export default function NavBar(props) {
  const { wishList, userData, isAuthenticated } = props;
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

        {isAuthenticated ? (
          userData.role === "Admin" ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/profile">User Profile</Link>
            </li>
          )
        ) : (
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

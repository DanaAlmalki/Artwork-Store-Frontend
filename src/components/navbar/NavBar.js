import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo-artify.png";
import "./NavBar.css";

export default function NavBar(props) {
  const { userData, isAuthenticated } = props;
  return (
    <nav className="navBar">
      <img src={logo} alt="logo"></img>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {/*<li>
          <Link to="/wishList">Wish List</Link>
        </li>*/}
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {isAuthenticated ? (
          userData.role === "Admin" ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/profile">
                {userData.role === "Artist" ? "Artist Profile" : "My Profile"}
              </Link>
            </li>
          )
        ) : (
          <>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

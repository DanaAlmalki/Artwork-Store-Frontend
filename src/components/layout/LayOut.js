import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer.js";
import "./LayOut.css";

export default function LayOut(prop) {
  const { wishList, userData, isAuthenticated } = prop;
  return (
    <div>
      <NavBar
        wishList={wishList}
        userData={userData}
        isAuthenticated={isAuthenticated}
      />
      <div className="layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

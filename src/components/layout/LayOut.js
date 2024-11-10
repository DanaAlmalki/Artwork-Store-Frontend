import React from "react";

import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer.js";
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { wishList, userData, isAuthenticated } = prop;
  return (
    <div>
      <NavBar
        wishList={wishList}
        userData={userData}
        isAuthenticated={isAuthenticated}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

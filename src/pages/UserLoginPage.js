import React from "react";
import UserLogin from "../components/user/UserLogin.js";

export default function UserLoginPage(prop) {
  const { getUserData } = prop;
  return (
    <div>
      <UserLogin getUserData={getUserData} />
    </div>
  );
}

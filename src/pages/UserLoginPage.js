import React from "react";
import UserLogin from "../components/user/UserLogin.js";

export default function UserLoginPage(prop) {
  const { userData, getUserData } = prop;
  return (
    <div>
      <UserLogin userData={userData} getUserData={getUserData} />
    </div>
  );
}

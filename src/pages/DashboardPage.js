import React from "react";

import UserProfile from "../components/user/UserProfile.js";
import DashBoard from "../components/dashboard/DashBoard.js";

export default function DashboardPage(prop) {
  const { userData, setUserData } = prop;
  return (
    <div>
      <h2>Admin profile</h2>
      <UserProfile userData={userData} setUserData={setUserData} />
      <DashBoard />
    </div>
  );
}

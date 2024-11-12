import React from "react";
import UserProfile from "../components/user/UserProfile";
import CustomerProfile from "../components/user/CustomerProfile.js";
import ArtworkDashboard from "../components/artist/ArtworkDashboard.js";

export default function UserProfilePage(prop) {
  const { userData, setUserData, categories } = prop;
  return (
    <div>
      <UserProfile userData={userData} setUserData={setUserData} />
      {userData.role === "Artist" ? (
        <ArtworkDashboard userData={userData} categories={categories} />
      ) : (
        <CustomerProfile />
      )}
    </div>
  );
}

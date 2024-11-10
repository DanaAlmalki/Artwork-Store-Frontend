import React from "react";
import UserProfile from "../components/user/UserProfile";

export default function UserProfilePage(prop) {
  const { userData, setUserData } = prop;
  return (
    <div>
      {userData.role === "Artist" ? (
        <h2>Artist Profile</h2>
      ) : (
        <h2>User Profile</h2>
      )}
      <UserProfile userData={userData} setUserData={setUserData} />
    </div>
  );
}

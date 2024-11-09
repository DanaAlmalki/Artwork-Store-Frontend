import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const {
    isUserDataLoading,
    isAuthenticated,
    element,
    userData,
    shouldCheckAdmin,
  } = prop;

  if (isUserDataLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  // check if user is admin
  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
}

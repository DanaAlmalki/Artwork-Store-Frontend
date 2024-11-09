import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(prop) {
  const { isUserDataLoading, isAuthenticated, element } = prop;

  if (isUserDataLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}

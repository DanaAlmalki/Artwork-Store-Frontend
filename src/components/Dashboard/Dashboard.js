import React from "react";
import Link from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <p>DashBoard</p>
      <Link to="/product-dashboard">Products</Link>
      <p>Orders</p>
      <p>Users</p>
    </div>
  );
}

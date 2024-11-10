import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <p>DashBoard</p>
      <Link to="/product-dashboard">Products</Link>
      <br />
      <Link to="/user-dashboard">Users</Link>
      <p>Orders</p>
    </div>
  );
}

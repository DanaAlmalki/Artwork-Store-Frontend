import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./DashBoard.css";

export default function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Manage</h2>
      <div className="dashboard-elements">
        <Link to="/dashboard/order-dashboard">
          <div>Orders</div>
        </Link>
        <Link to="/dashboard/user-dashboard">
          <div>Users</div>
        </Link>
        <Link to="/dashboard/category-dashboard">
          <div>Categories</div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

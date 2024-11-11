import React from "react";
import { Link } from "react-router-dom";

import "./DashBoard.css";

export default function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h2>DashBoard</h2>
      <div className="dashboard-elements">
        <Link to="/order-dashboard">
          <div>Orders</div>
        </Link>
        <Link to="/user-dashboard">
          <div>Users</div>
        </Link>
      </div>
    </div>
  );
}

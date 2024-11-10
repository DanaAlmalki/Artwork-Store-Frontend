import React from "react";

import ProductDashboard from "../components/dashboard/ProductDashboard.js";

export default function ProductDashboardPage(prop) {
  const { response, loading } = prop;
  return (
    <div>
      <h2>Product Dashboard Page</h2>
      <ProductDashboard response={response} loading={loading} />
    </div>
  );
}

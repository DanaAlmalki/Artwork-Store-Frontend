import React from "react";

export default function ProductDashboard(prop) {
  const { response, loading } = prop;
  console.log(response);
  return <div>Product Dashboard component</div>;
}

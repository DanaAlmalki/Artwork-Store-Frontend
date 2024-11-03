import React from "react";

import "./Products.css";

export default function Products(prop) {
  const { response } = prop;
  const { artworks, totalCount } = response;
  console.log(artworks);
  console.log(totalCount);

  return (
    <div>
      <p>Products</p>
    </div>
  );
}

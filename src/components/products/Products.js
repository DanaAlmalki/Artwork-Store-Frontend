import React from "react";

import "./Products.css";
import Product from "./Product";

export default function Products(prop) {
  const { response } = prop;
  const { artworks, totalCount } = response;
  console.log(artworks);
  console.log(totalCount);

  return (
    <div className="productsContainer">
      <p>Products</p>
      <div className="products">
        {artworks.map((productItem) => {
          return (
            <div key={productItem.id}>
              <Product product={productItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

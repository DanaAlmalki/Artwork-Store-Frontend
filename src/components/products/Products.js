import React from "react";

import "./Products.css";
import Product from "./Product";
import ProductsPagination from "./ProductsPagination";

export default function Products(prop) {
  const { response, wishList, setWishList, page, pageSize, handleChange } =
    prop;
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
              <Product
                product={productItem}
                wishList={wishList}
                setWishList={setWishList}
              />
            </div>
          );
        })}
      </div>
      <ProductsPagination
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        handleChange={handleChange}
      />
    </div>
  );
}

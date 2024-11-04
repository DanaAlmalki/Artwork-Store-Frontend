import React from "react";
import { useState } from "react";

import "./Products.css";
import Product from "./Product";
import Form from "./Form";
import ProductsPagination from "./ProductsPagination";

export default function Products(prop) {
  const {
    response,
    input,
    setInput,
    setSort,
    setMinPrice,
    setMaxPrice,
    defaultMinPrice,
    defaultMaxPrice,
    wishList,
    setWishList,
    page,
    pageSize,
    handleChange,
  } = prop;

  const { artworks, totalCount } = response;
  console.log(artworks);
  console.log(totalCount);

  return (
    <div className="productsContainer">
      <h2>Products</h2>
      <Form
        input={input}
        setInput={setInput}
        setSort={setSort}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        defaultMinPrice={defaultMinPrice}
        defaultMaxPrice={defaultMaxPrice}
      />
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

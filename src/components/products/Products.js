import React from "react";
import { useState } from "react";

import "./Products.css";
import Product from "./Product";
import ProductsPagination from "./ProductsPagination";

export default function Products(prop) {
  const {
    response,
    input,
    setInput,
    wishList,
    setWishList,
    page,
    pageSize,
    handleChange,
  } = prop;

  const { artworks, totalCount } = response;
  console.log(artworks);
  console.log(totalCount);

  const [searchText, setSearchText] = useState("");
  function onChangeHandler(event) {
    setSearchText(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setInput(searchText);
  }

  return (
    <div className="productsContainer">
      <div className="search">
        <h2>Products</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter product name"
            onChange={onChangeHandler}
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>
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

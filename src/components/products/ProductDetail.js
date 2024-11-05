import React from "react";

export default function ProductDetail(prop) {
  const product = prop.product;
  return (
    <div>
      <h2>Product Detail</h2>
      <div className="detail" key={product.id}>
        <h3 className="title">{product.title}</h3>
        {/*<img className="productImg" src={product.image} alt="product" />*/}
        <p className="description">{product.description}</p>
        <div>${product.price}</div>
        <div>Artist: {product.user.name}</div>
      </div>
    </div>
  );
}

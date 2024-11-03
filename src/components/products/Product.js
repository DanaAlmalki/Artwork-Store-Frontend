import React from "react";

export default function Product(prop) {
  const { product } = prop;
  return <div>{product.title}</div>;
}

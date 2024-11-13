import React from "react";
import { useNavigate } from "react-router-dom";

import "./ProductDetail.css";
import { Button } from "@mui/material";

export default function ProductDetail(prop) {
  const { product } = prop;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // goes back to the previous page
  };

  return (
    <div className="product-detail" key={product.id}>
      <h3 className="title">{product.title}</h3>
      <div className="detail">
        <img className="productImg" src={product.imageUrl} alt="artwork" />
        <div className="right">
          <p className="description">{product.description}</p>
          <div>
            <span>Price:</span> $ {product.price}
          </div>
          <div>
            <span>Artist:</span> {product.user.name}
          </div>
          <div>
            <span>Quantity:</span> {product.quantity}
          </div>
          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

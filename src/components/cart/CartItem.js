import React from "react";
import { Link } from "react-router-dom";

import BlueFire from "../../assets/artworks/BlueFire.jpg";
import "./Cart.css";

export default function CartItem(prop) {
  const { product } = prop;
  return (
    <div>
      <div className="cart-item-container">
        <img className="cart-item-image" src={BlueFire} alt="art work" />
        <div className="cart-item-title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </div>
        <div className="cart-item-price">${product.price}</div>
      </div>
    </div>
  );
}

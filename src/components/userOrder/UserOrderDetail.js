import React from "react";

import { Link } from "react-router-dom";

export default function userOrderDetail(prop) {
  const { detail } = prop;
  return (
    <div className="user-order-detail-container">
      <img
        className="user-order-detail-image"
        src={detail.artwork.imageUrl}
        alt="art work"
      />
      <div className="user-order-detail-title">
        <Link to={`/products/${detail.artwork.id}`}>
          {detail.artwork.title}
        </Link>
      </div>
      <div>Quantity: {detail.quantity}</div>
      <div className="user-order-detail-price">${detail.artwork.price}</div>
    </div>
  );
}

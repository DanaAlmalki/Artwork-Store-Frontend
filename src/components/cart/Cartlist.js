import React from "react";

import CartItem from "./CartItem";
import "./Cart.css";

export default function Cartlist(prop) {
  const { cartList, userData } = prop;

  const prices = cartList.map((product) => product.price);
  const totalPrice = prices.reduce((acc, curr) => acc + curr);

  return (
    <div>
      <h2>Cart List</h2>
      <div className="cart-items-container">
        {cartList.map((productItem) => {
          return (
            <div key={productItem.id}>
              <CartItem product={productItem} />
            </div>
          );
        })}
        <div className="cart-total">
          <p>Total:</p>
          <p>$ {totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

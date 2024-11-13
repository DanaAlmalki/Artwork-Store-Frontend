import React from "react";

import CartItem from "./CartItem";
import "./Cart.css";

export default function Cartlist(prop) {
  const { cartList, setCartList, userData } = prop;
  let totalPrice = 0;
  let prices = [];

  if (cartList.length !== 0) {
    prices = cartList.map((product) => product.price);
    totalPrice = prices.reduce((acc, curr) => acc + curr);
  }

  return (
    <div>
      <h2>Cart List</h2>
      {cartList.length === 0 ? (
        <div>Cart is empty.</div>
      ) : (
        <div className="cart-items-container">
          {cartList.map((cartItem) => {
            return (
              <div key={cartItem.id}>
                <CartItem
                  cartItem={cartItem}
                  cartList={cartList}
                  setCartList={setCartList}
                />
              </div>
            );
          })}
          <div className="cart-total">
            <p>Total:</p>
            <p>$ {totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

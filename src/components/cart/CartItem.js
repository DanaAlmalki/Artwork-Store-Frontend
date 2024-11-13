import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { Button, TextField } from "@mui/material";

export default function CartItem(prop) {
  const { cartItem, cartList, setCartList } = prop;

  function increaseQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.min(item.quantity, item.orderQuantity + 1);
        return { ...item, orderQuantity: newQuantity };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function decreaseQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.orderQuantity - 1);
        return { ...item, orderQuantity: newQuantity };
      }
      return item;
    });
    setCartList(newCartList);
  }

  return (
    <div>
      <div className="cart-item-container">
        <img
          className="cart-item-image"
          src={cartItem.imageUrl}
          alt="art work"
        />
        <div className="cart-item-title">
          <Link to={`/products/${cartItem.id}`}>{cartItem.title}</Link>
        </div>
        <div className="cart-item-quantity">
          <button onClick={() => decreaseQuantity(cartItem.id)}>-</button>
          <div>Quantity: {cartItem.orderQuantity}</div>
          <button onClick={() => increaseQuantity(cartItem.id)}>+</button>
        </div>
        <div className="cart-item-price">${cartItem.price}</div>
      </div>
    </div>
  );
}

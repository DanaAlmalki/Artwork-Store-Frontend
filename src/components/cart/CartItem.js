import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlueFire from "../../assets/artworks/BlueFire.jpg";
import "./Cart.css";
import { TextField } from "@mui/material";

export default function CartItem(prop) {
  const { cartItem, cartList, setCartList } = prop;

  const [orderQuantity, setOrderQuantity] = useState(
    cartItem.orderQuantity || 1
  );

  // Update quantity state when input changes
  function handleInputChange(e) {
    const newQuantity = e.target.value;
    // Allow empty string input temporarily for user typing
    if (newQuantity === "") {
      setOrderQuantity("");
      return;
    }

    const parsedQuantity = parseInt(newQuantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
      setOrderQuantity(parsedQuantity);
    }
  }

  // Finalize quantity when input loses focus
  function handleBlur() {
    let sanitizedQuantity = parseInt(orderQuantity, 10) || 1;
    sanitizedQuantity = Math.min(sanitizedQuantity, cartItem.quantity);

    setOrderQuantity(sanitizedQuantity);

    // Update the cartList with the new quantity
    const newCartList = cartList.map((item) =>
      item.id === cartItem.id
        ? { ...item, orderQuantity: sanitizedQuantity }
        : item
    );
    setCartList(newCartList);
  }

  return (
    <div>
      <div className="cart-item-container">
        <img className="cart-item-image" src={BlueFire} alt="art work" />
        <div className="cart-item-title">
          <Link to={`/products/${cartItem.id}`}>{cartItem.title}</Link>
        </div>
        <div>
          <TextField
            label="Quantity"
            size="small"
            value={orderQuantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="cart-item-price">${cartItem.price}</div>
      </div>
    </div>
  );
}

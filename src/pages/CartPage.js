import React from "react";
import Cart from "../components/cart/Cartlist.js";

export default function CartPage(prop) {
  const { cartList, userData } = prop;
  return (
    <div>
      <h2>Cart Page</h2>
      <Cart cartList={cartList} userData={userData} />
    </div>
  );
}

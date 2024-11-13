import React from "react";
import Cart from "../components/cart/Cartlist.js";

export default function CartPage(prop) {
  const { cartList, setCartList, userData } = prop;
  return (
    <div>
      <Cart cartList={cartList} setCartList={setCartList} userData={userData} />
    </div>
  );
}

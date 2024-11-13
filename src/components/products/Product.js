import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Heart from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleFilledIcon from "@mui/icons-material/AddCircle";
import { green } from "@mui/material/colors";

import "../products/Product.css";
import BlueFire from "../../assets/artworks/BlueFire.jpg";

export default function Product(prop) {
  const { product, wishList, setWishList, cartList, setCartList } = prop;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isFav, setIsFav] = useState(
    wishList.some((item) => item.id === product.id)
  );
  const [isAdded, setIsAdded] = useState(
    cartList.some((item) => item.id === product.id)
  );

  function addToFav() {
    const isIncluded = wishList.some((item) => item.id === product.id);
    if (!isIncluded) {
      setWishList([...wishList, product]);
      setIsFav(true);
      setOpen(true);
      setMessage("Product Added to Wishlist");
    } else {
      setWishList(wishList.filter((item) => item.id !== product.id));
      setIsFav(false);
      setOpen(true);
      setMessage("Product removed from Wishlist");
    }
  }

  function addToCart() {
    const isIncluded = cartList.some((item) => item.id === product.id);
    if (!isIncluded) {
      setCartList([...cartList, { ...product, orderQuantity: 1 }]);
      setIsAdded(true);
      setOpen(true);
      setMessage("Product Added to cart");
    } else {
      setCartList(cartList.filter((item) => item.id !== product.id));
      setIsAdded(false);
      setOpen(true);
      setMessage("Product removed from cart");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log(wishList);
  console.log(cartList);
  return (
    <div>
      <div className="product-container">
        <img className="product-image" src={BlueFire} alt="art work" />
        <div className="product-buttons">
          <Heart
            className="favIcon"
            fontSize="large"
            onClick={() => addToFav()}
            sx={{ color: isFav ? "red" : "black", cursor: "pointer" }}
          />
          {isAdded ? (
            <AddCircleFilledIcon
              fontSize="large"
              onClick={() => addToCart()}
              style={{
                cursor: "pointer",
                color: green[500],
              }}
            />
          ) : (
            <AddCircleIcon
              fontSize="large"
              onClick={() => addToCart()}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <Link className="label" to={`${product.id}`}>
          <div className="artist">{product.user.name}</div>
          <div className="title">
            {product.title}, <span>{product.createdAt.slice(0, 4)}</span>
          </div>
          <div className="medium">{product.category.name}</div>
        </Link>
      </div>

      {/*<div className="price">${product.price}</div>*/}

      <div>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
        />
      </div>
    </div>
  );
}

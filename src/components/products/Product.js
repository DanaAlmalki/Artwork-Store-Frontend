import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Heart from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";

import "../products/Product.css";
import BlueFire from "../../assets/artworks/BlueFire.jpg";

export default function Product(prop) {
  const { product, wishList, setWishList } = prop;
  const [isFav, setIsFav] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function addToFav(product) {
    const isIncluded = wishList.some((item) => item.id === product.id);
    if (!isIncluded) {
      setWishList([...wishList, product]);
      setIsFav(true);
      setOpen(true);
      setMessage("Product Added to Wishlist");
    } else {
      setOpen(true);
      setMessage("Product already in Wishlist");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={BlueFire} alt="art work" />
      </div>
      <div className="title">{product.title}</div>
      <div className="price">${product.price}</div>
      <div className="medium">{product.category.name}</div>
      <div className="artist">{product.user.name}</div>
      <div className="favIconContainer">
        <Heart
          className="favIcon"
          fontSize="large"
          onClick={() => addToFav(product)}
          sx={{ color: isFav ? "red" : "#4b4b4bae" }}
        />
      </div>
      <Link to={`${product.id}`}>
        <button className="more">
          <p> Product Detail </p>
        </button>
      </Link>
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

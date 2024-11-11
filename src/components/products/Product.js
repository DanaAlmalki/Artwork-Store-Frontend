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
    <div>
      <div className="product-container">
        <img className="product-image" src={BlueFire} alt="art work" />
        <div className="product-buttons">
          <Heart
            className="favIcon"
            fontSize="large"
            onClick={() => addToFav(product)}
            sx={{ color: isFav ? "red" : "#4b4b4bae" }}
          />
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

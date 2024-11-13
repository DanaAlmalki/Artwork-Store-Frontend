import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cartlist(prop) {
  const { cartList, setCartList, userData } = prop;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  let totalPrice = 0;
  if (cartList.length !== 0) {
    totalPrice = cartList.reduce(
      (acc, item) => acc + item.price * item.orderQuantity,
      0
    );
  }

  function checkOut() {
    const orderDetails = cartList.map((item) => ({
      artworkId: item.id,
      quantity: item.orderQuantity,
    }));

    const newOrderData = {
      shippingAddress: address,
      orderDetails: orderDetails,
    };
    console.log(newOrderData);
    createOrder(newOrderData);
  }

  function handleCreateOrder() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setAddress("");
    setError("");
  }

  function handleAddressSubmit() {
    if (address.length < 10 || address.length > 30) {
      setError("Address must be between 10 and 30 characters.");
      return;
    }
    checkOut();
    setError("");
    setDialogOpen(false);
  }
  const navigate = useNavigate();

  function createOrder(orderData) {
    setLoading(true);
    const orderUrl = "http://localhost:5125/api/v1/Orders/add";
    const token = localStorage.getItem("token");
    axios
      .post(orderUrl, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 401) {
          alert("You need to be logged in to create an order.");
        }
        if (res.status === 201) {
          setCartList([]);
          alert("Order created successfully.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <div className="cart-list">
      <h2>Cart List</h2>
      {cartList.length === 0 ? (
        <div>
          <div>Your cart is empty.</div>
          <Button variant="contained" onClick={() => navigate("/products")}>
            Starting shopping now
          </Button>
        </div>
      ) : (
        <div className="cart-items-container">
          {cartList.map((cartItem) => (
            <div key={cartItem.id}>
              <CartItem
                cartItem={cartItem}
                cartList={cartList}
                setCartList={setCartList}
              />
            </div>
          ))}
          <div className="cart-total">
            <p>Total:</p>
            <p>$ {totalPrice}</p>
          </div>
          <Button variant="contained" onClick={() => handleCreateOrder()}>
            Create Order
          </Button>
        </div>
      )}

      {/* Dialog for Address Input */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Enter Shipping Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Shipping Address"
            type="text"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose()} color="error">
            Cancel
          </Button>
          <Button onClick={() => handleAddressSubmit()} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

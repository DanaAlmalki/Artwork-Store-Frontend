import React from "react";

import "./UserOrders.css";
import UserOrderDetail from "./UserOrderDetail.js";
import { Button } from "@mui/material";

export default function UserOrder(prop) {
  const { orderItem } = prop;
  return (
    <div className="user-order">
      <div className="user-order-item-container">
        <div className="user-order-item">
          <div>
            <span>Order #{orderItem.id}</span>
          </div>
          <div>
            <span>date of order:</span> {orderItem.createdAt.slice(0, 10)}
          </div>
          <div>
            <span>total items: </span>
            {orderItem.orderDetails.length}
          </div>
          <div>
            <span>total price:</span> $ {orderItem.totalAmount}
          </div>
        </div>
        <Button variant="contained">More Details</Button>
      </div>
      <h3>Order Details</h3>
      <div className="user-order-details-container">
        {orderItem.orderDetails.map((detailItem) => {
          return (
            <div key={detailItem.id}>
              <UserOrderDetail detail={detailItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

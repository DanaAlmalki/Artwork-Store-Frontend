import React, { useState } from "react";

import "./UserOrders.css";
import UserOrderDetail from "./UserOrderDetail.js";
import { Button } from "@mui/material";

export default function UserOrder(prop) {
  const { orderItem } = prop;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="user-order">
      <div className="user-order-item-container">
        <div className="user-order-item">
          <div>
            <span>Order #{orderItem.id}</span>
          </div>
          <div>
            <span>Date of order:</span> {orderItem.createdAt.slice(0, 10)}
          </div>
          <div>
            <span>Total items: </span>
            {orderItem.orderDetails.length}
          </div>
          <div>
            <span>Total price:</span> $ {orderItem.totalAmount}
          </div>
        </div>
        <Button variant="contained" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "More Details"}
        </Button>
      </div>

      {showDetails && (
        <>
          <h3>Order Details</h3>
          <div className="user-order-details-container">
            {orderItem.orderDetails.map((detailItem) => (
              <div key={detailItem.id}>
                <UserOrderDetail detail={detailItem} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

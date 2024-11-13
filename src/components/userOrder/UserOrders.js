import axios from "axios";
import React, { useEffect, useState } from "react";

import UserOrder from "./UserOrder.js";
import "./UserOrders.css";

export default function UserOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const ordersUrl = "http://localhost:5125/api/v1/orders/my-orders";

  function getMyOrders() {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(ordersUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <div>
        {myOrders.length === 0 ? (
          <p>There are no orders yet.</p>
        ) : (
          <div>
            {myOrders.map((orderItem) => {
              return (
                <div key={orderItem.id}>
                  <UserOrder orderItem={orderItem} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

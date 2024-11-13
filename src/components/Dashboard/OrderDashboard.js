import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const ordersUrl = "http://localhost:5125/api/v1/orders";

  function dateFormatter(timestamp) {
    const date = new Date(timestamp);

    const readableFormat = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });

    return readableFormat;
  }

  function getOrders() {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(ordersUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  const rows = orders;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      valueFormatter: (value) => {
        if (value == null) {
          return "";
        }
        return dateFormatter(value);
      },
    },
    {
      field: "orderDetails",
      headerName: "Quantity",
      flex: 1,
      valueGetter: (value, row) => row.orderDetails.length,
    },
    {
      field: "totalAmount",
      headerName: "Total price",
      flex: 1,
    },
  ];

  return (
    <div>
      <h2>Orders Dashboard</h2>
      <Paper sx={{ height: 400, width: "100%" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            isRowSelectable={(params) => params.row.role !== "Admin"}
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </div>
  );
}

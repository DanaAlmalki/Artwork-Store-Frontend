import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import InspectIcon from "@mui/icons-material/ManageSearch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./ArtworkDashboard.css";

export default function ArtworkDashboard(prop) {
  const { userData } = prop;
  const [artworkResponse, setArtworkResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedID, setSelectedID] = useState([]);

  let artworkUrl = `http://localhost:5125/api/v1/Artworks/artist/${userData.id}`;

  function dateFormatter(timestamp) {
    const date = new Date(timestamp);

    // Format the date to a readable format
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

  function getData() {
    axios
      .get(artworkUrl)
      .then((response) => {
        setArtworkResponse(response.data);
        setLoading(false);
        console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const rows = artworkResponse;

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      valueFormatter: (value) => {
        if (value == null) {
          return "";
        }
        return `$ ${value.toLocaleString()}`;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter: (value, row) => row.category?.name ?? "N/A",
    },
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
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className="artwork-dashboard">
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Artwork?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reversed and can cause the loss of related
            information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <h2>My Artwork</h2>
      <div className="modification-buttons">
        <Button
          size="small"
          className="delete-button"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={selectedID.length === 0 ? true : false}
          sx={{ margin: 3 }}
          onClick={() => setOpen(true)}
        >
          Delete Artwork
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<InspectIcon />}
          disabled={selectedID.length === 0 ? true : false}
          sx={{ margin: 3 }}
        >
          Inspect
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddCircleIcon />}
          sx={{ margin: 3 }}
        >
          Add new artwork
        </Button>
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={artworkResponse.length}
            paginationMode="server"
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableMultipleRowSelection
            onRowSelectionModelChange={(id) => {
              setSelectedID(id);
            }}
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import InspectIcon from "@mui/icons-material/ManageSearch";

import "./ArtworkDashboard.css";
import ArtworkDetail from "./ArtworkDetail";

export default function ArtworkDashboard(prop) {
  const { userData, categories } = prop;
  const [artworkResponse, setArtworkResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedID, setSelectedID] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // To store the selected row's data
  const [dialogType, setDialogType] = useState(null); // State to track the dialog type (create or modify)

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

  function getArtistArtwork() {
    setLoading(true);
    axios
      .get(artworkUrl)
      .then((response) => {
        setArtworkResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getArtistArtwork();
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

  const handleAddNewArtwork = () => {
    setDialogType("create"); // Set the dialog type to 'create' for adding a new artwork
  };

  const handleInspect = () => {
    const selectedRowData = rows.find((row) => row.id === selectedID[0]);
    setSelectedRow(selectedRowData);
    setDialogType("modify"); // Set the dialog type to 'modify' for inspecting the selected artwork
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="artwork-dashboard">
      <h2>My Artwork</h2>
      <div className="modification-buttons">
        <Button
          size="small"
          variant="outlined"
          startIcon={<InspectIcon />}
          disabled={selectedID.length === 0 ? true : false}
          sx={{ margin: 3 }}
          onClick={handleInspect}
        >
          Inspect
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddCircleIcon />}
          sx={{ margin: 3 }}
          onClick={handleAddNewArtwork}
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

      {/* Pass dialogType to ArtworkDetail */}
      {dialogType && (
        <ArtworkDetail
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          getArtistArtwork={getArtistArtwork}
          categories={categories}
          artwork={dialogType === "modify" ? selectedRow : null}
          dialogType={dialogType}
          onClose={() => setDialogType(null)} // Close dialog when done
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}

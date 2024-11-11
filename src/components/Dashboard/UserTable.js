import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    flex: 1,
  },
];

export default function DataTable(prop) {
  const { getData, userResponse, setPage, setPageSize, loading } = prop;
  const [selectedID, setSelectedID] = useState([]);

  const rows = userResponse.users;
  const totalCount = userResponse.totalCount;

  const handlePaginationChange = (newPaginationModel) => {
    const newPage = newPaginationModel.page + 1; // Convert to one-based index
    const newPageSize = newPaginationModel.pageSize;
    setPage(newPage);
    setPageSize(newPageSize);
  };

  // delete user
  function deleteUser() {
    setOpen(false);
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5125/api/v1/users/${selectedID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reversed and can cause the loss of related
            user information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={deleteUser}>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/*User Table*/}
      <Paper sx={{ height: 400, width: "100%" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalCount}
            paginationMode="server"
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            onPaginationModelChange={handlePaginationChange}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableColumnSorting
            checkboxSelection
            disableMultipleRowSelection
            isRowSelectable={(params) => params.row.role !== "Admin"}
            onRowSelectionModelChange={(id) => {
              setSelectedID(id);
            }}
            sx={{ border: 0 }}
          />
        )}
      </Paper>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        disabled={selectedID.length === 0 ? true : false}
        sx={{ margin: 3 }}
        onClick={handleClickOpen}
      >
        {loading ? <CircularProgress size={24} /> : "Delete User"}
      </Button>
    </div>
  );
}

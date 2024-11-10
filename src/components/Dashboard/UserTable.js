import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

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
  const { userResponse, setPage, setPageSize, loading } = prop;

  const rows = userResponse.users;
  const totalCount = userResponse.totalCount;

  const handlePaginationChange = (newPaginationModel) => {
    const newPage = newPaginationModel.page + 1; // Convert to one-based index
    const newPageSize = newPaginationModel.pageSize;
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return (
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
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableColumnSorting
          checkboxSelection
          onPaginationModelChange={handlePaginationChange}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}

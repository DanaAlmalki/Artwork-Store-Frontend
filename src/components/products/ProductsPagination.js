import React from "react";
import Pagination from "@mui/material/Pagination";

export default function ProductsPagination(prop) {
  const { totalCount, page, pageSize, handleChange } = prop;
  const count = Math.ceil(totalCount / pageSize);
  return (
    <div>
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}

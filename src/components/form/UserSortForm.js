import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import "../dashboard/UserDashboard.css";

export default function UserSortForm(prop) {
  const { sortValue, setSortValue } = prop;

  const handleChange = (event) => {
    setSortValue(event.target.value); // Update state with selected value
    console.log(event.target.value);
  };

  return (
    <div className="user-sort-form">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Sort by
          </InputLabel>
          <NativeSelect
            value={sortValue} // Bind the value to state
            onChange={handleChange} // Handle changes
            inputProps={{
              name: "sort",
              id: "controlled-native",
            }}
          >
            <option value={"name"}>Name asc</option>
            <option value={"name_desc"}>Name desc</option>
            <option value={"email_asc"}>Email asc</option>
            <option value={"email_desc"}>Email desc</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
}

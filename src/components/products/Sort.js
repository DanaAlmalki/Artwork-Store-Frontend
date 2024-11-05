import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function Sort(prop) {
  const { sortValue, setSortValue } = prop;

  const handleChange = (event) => {
    setSortValue(event.target.value); // Update state with selected value
    console.log(event.target.value);
  };

  return (
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
          <option value={"price"}>Price asc</option>
          <option value={"price_desc"}>Price desc</option>
          <option value={"date"}>Date asc</option>
          <option value={"date_desc"}>Date desc</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

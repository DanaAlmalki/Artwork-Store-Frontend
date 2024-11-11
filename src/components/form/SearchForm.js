import React from "react";
import TextField from "@mui/material/TextField";

export default function SearchForm(prop) {
  const { setSearchText } = prop;

  function onChangeHandler(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="search-form">
      <TextField
        id="keyword"
        label="Search by Email"
        variant="outlined"
        onChange={onChangeHandler}
        size="small"
      />
    </div>
  );
}

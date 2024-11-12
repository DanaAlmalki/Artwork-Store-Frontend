import React from "react";
import TextField from "@mui/material/TextField";

export default function SearchForm(prop) {
  const { setSearchText, label } = prop;

  function onChangeHandler(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="search-form">
      <TextField
        id="keyword"
        label={label}
        variant="outlined"
        onChange={onChangeHandler}
        size="small"
      />
    </div>
  );
}

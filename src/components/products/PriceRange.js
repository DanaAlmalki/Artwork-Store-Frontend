import React from "react";
import { TextField } from "@mui/material";

export default function PriceRange(prop) {
  const { setTempMin, setTempMax, defaultMinPrice, defaultMaxPrice } = prop;

  function onChangeHandlerMinPrice(event) {
    const value = event.target.value;
    setTempMin(value === "" ? defaultMinPrice : Number(value));
  }

  function onChangeHandlerMaxPrice(event) {
    const value = event.target.value;
    setTempMax(value === "" ? defaultMaxPrice : Number(value));
  }

  return (
    <div>
      <TextField
        id="min-price"
        label="Min Price"
        variant="standard"
        helperText="Enter the minimum price"
        type="number"
        onChange={onChangeHandlerMinPrice}
        defaultValue={0}
      />
      <TextField
        id="max-price"
        label="Max Price"
        variant="standard"
        helperText="Enter the maximum price"
        type="number"
        onChange={onChangeHandlerMaxPrice}
        defaultValue={10000}
      />
    </div>
  );
}
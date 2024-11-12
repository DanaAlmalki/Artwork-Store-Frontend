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
    <div className="price-range">
      <TextField
        id="min-price"
        label="Min Price"
        variant="standard"
        type="number"
        onChange={onChangeHandlerMinPrice}
        defaultValue={defaultMinPrice}
      />
      <TextField
        id="max-price"
        label="Max Price"
        variant="standard"
        type="number"
        onChange={onChangeHandlerMaxPrice}
        defaultValue={defaultMaxPrice}
      />
    </div>
  );
}

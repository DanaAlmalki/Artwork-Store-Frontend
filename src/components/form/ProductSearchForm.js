import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

import PriceRange from "./PriceRangeForm.js";
import Sort from "./ProductSortForm.js";
import SearchForm from "./SearchForm.js";

export default function Form(prop) {
  const {
    setInput,
    setSort,
    defaultSort,
    setMinPrice,
    setMaxPrice,
    defaultMinPrice,
    defaultMaxPrice,
  } = prop;

  const [tempMin, setTempMin] = useState(defaultMinPrice);
  const [tempMax, setTempMax] = useState(defaultMaxPrice);
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState(defaultSort);

  function handleSearch(event) {
    event.preventDefault();
    setInput(searchText);
    setSort(sortValue);
    setMinPrice(tempMin);
    setMaxPrice(tempMax);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <SearchForm setSearchText={setSearchText} />
        <PriceRange
          setTempMin={setTempMin}
          setTempMax={setTempMax}
          defaultMinPrice={defaultMinPrice}
          defaultMaxPrice={defaultMaxPrice}
        />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <Button type="submit" variant="outlined">
          Search
        </Button>
      </form>
    </div>
  );
}

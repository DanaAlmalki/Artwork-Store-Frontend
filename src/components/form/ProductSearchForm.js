import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

import PriceRange from "./PriceRangeForm.js";
import Sort from "./ProductSortForm.js";
import SearchForm from "./SearchForm.js";
import "../products/Products.css";

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
    <form className="products-search-form" onSubmit={handleSearch}>
      <div className="products-search-feilds">
        <SearchForm setSearchText={setSearchText} label={"Search by name"} />
        <PriceRange
          setTempMin={setTempMin}
          setTempMax={setTempMax}
          defaultMinPrice={defaultMinPrice}
          defaultMaxPrice={defaultMaxPrice}
        />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
      </div>
      <Button size="small" type="submit" variant="contained">
        Search
      </Button>
    </form>
  );
}

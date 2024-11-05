import React, { useState, useEffect } from "react";

import PriceRange from "./PriceRange";
import Sort from "./Sort.js";

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

  function onChangeHandler(event) {
    setSearchText(event.target.value);
  }

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
        <input
          id="keyword"
          type="text"
          placeholder="Enter product name"
          onChange={onChangeHandler}
        ></input>
        <PriceRange
          setTempMin={setTempMin}
          setTempMax={setTempMax}
          defaultMinPrice={defaultMinPrice}
          defaultMaxPrice={defaultMaxPrice}
        />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

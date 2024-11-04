import React from "react";
import { useState } from "react";

import PriceRange from "./PriceRange";

export default function Form(prop) {
  const {
    input,
    setInput,
    setSort,
    setMinPrice,
    setMaxPrice,
    defaultMinPrice,
    defaultMaxPrice,
  } = prop;

  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(10000);
  const [searchText, setSearchText] = useState("");

  function onChangeHandler(event) {
    setSearchText(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setInput(searchText);
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
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

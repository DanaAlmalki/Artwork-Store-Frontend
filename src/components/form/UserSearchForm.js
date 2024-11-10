import React, { useState } from "react";

import Sort from "./UserSortForm.js";
import SearchForm from "./SearchForm.js";

export default function UserSearchForm(prop) {
  const { setInput, setSort, defaultSort } = prop;

  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState(defaultSort);

  function handleSearch(event) {
    event.preventDefault();
    setInput(searchText);
    setSort(sortValue);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <SearchForm setSearchText={setSearchText} />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

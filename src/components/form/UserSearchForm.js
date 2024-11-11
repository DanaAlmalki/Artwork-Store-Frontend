import React, { useState } from "react";

import Sort from "./UserSortForm.js";
import SearchForm from "./SearchForm.js";
import Button from "@mui/material/Button";

import "../dashboard/UserDashboard.css";

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
    <div className="user-search-form">
      <form onSubmit={handleSearch}>
        <SearchForm setSearchText={setSearchText} />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
        <Button type="submit" variant="outlined">
          Search
        </Button>
      </form>
    </div>
  );
}

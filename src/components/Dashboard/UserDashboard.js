import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

import UserSearchForm from "../form/UserSearchForm";
import UserSortForm from "../form/UserSortForm";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const defaultSort = "name";
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(defaultSort);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [userResponse, setUserResponse] = useState({
    users: [],
    totalCount: 0,
  });

  const pageSize = 10;
  let userUrl = `http://localhost:5125/api/v1/Users?PageSize=${pageSize}&PageNumber=${page}&SortOrder=${sort}`;

  if (input) {
    userUrl += `&Search=${input}`;
  }

  function getData() {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(userUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUserResponse(response.data);
        setLoading(false);
        //console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setPage(1);
  }, [input, sort]);

  useEffect(() => {
    getData();
  }, [page, input, sort]);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <UserSearchForm
        setInput={setInput}
        setSort={setSort}
        defaultSort={defaultSort}
      />
    </div>
  );
}

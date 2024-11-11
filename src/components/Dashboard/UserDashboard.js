import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import UserTable from "./UserTable.js";

import UserSearchForm from "../form/UserSearchForm";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const defaultSort = "name";
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState(defaultSort);

  const [userResponse, setUserResponse] = useState({
    users: [],
    totalCount: 0,
  });

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
    setLoading(true);
    setPage(1);
    setLoading(false);
  }, [pageSize, input, sort]);

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, [pageSize, page, input, sort]);

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
      <UserTable
        getData={getData}
        userResponse={userResponse}
        setPageSize={setPageSize}
        setPage={setPage}
        loading={loading}
      />
    </div>
  );
}

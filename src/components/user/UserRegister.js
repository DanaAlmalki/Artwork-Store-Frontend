import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  {
    /*const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);}*/
  }
  const url = "http://localhost:5125/api/v1/users";
  const [userInfo, setUserInfo] = useState({
    Name: "User",
    email: "",
    password: "",
    PhoneNumber: "+966555555555",
  });

  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  }

  console.log(userInfo, " user");

  const navigate = useNavigate();

  function registerNewUser() {
    axios
      .post(url, userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          if (error.response.data.errors.Email) {
            alert(error.response.data.errors.Email[0]);
            return;
          }
          if (error.response.data.errors.Password) {
            alert(error.response.data.errors.Password[0]);
            return;
          }
        }
        console.log(error);
      });
  }

  return (
    <div>
      <h1>User Register</h1>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        helperText="please enter your email"
        required
        onChange={onChangeHandler}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        helperText="please enter a password"
        required
        onChange={onChangeHandler}
      />
      <Button onClick={registerNewUser}>Register</Button>
    </div>
  );
}

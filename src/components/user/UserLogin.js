import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const url = "http://localhost:5125/api/v1/users/signin";
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
    // Clear any existing errors for the field
    setErrors({ ...errors, [event.target.id]: "" });
  }

  function loginUser() {
    // Basic validation
    let validationErrors = {};
    if (!userInfo.email.trim()) {
      validationErrors.email = "Email is required.";
    }
    if (!userInfo.password.trim()) {
      validationErrors.password = "Password is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    axios
      .post(url, userInfo)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 400) {
            if (error.response.data.errors) {
              if (error.response.data.errors.Email) {
                setErrors({
                  ...errors,
                  email: error.response.data.errors.Email[0],
                });
              }
              if (error.response.data.errors.Password) {
                setErrors({
                  ...errors,
                  password: error.response.data.errors.Password[0],
                });
              }
            } else {
              alert("Invalid login credentials. Please try again.");
            }
          } else {
            console.error("An error occurred:", error.response.data);
            alert("An error occurred during login. Please try again.");
          }
        } else {
          console.error("Network error:", error);
          alert("Network error. Please check your connection.");
        }
      });
  }

  return (
    <div>
      <h1>User Login</h1>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        helperText={errors.email ? errors.email : "Please enter your email"}
        error={Boolean(errors.email)}
        required
        value={userInfo.email}
        onChange={onChangeHandler}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        helperText={
          errors.password ? errors.password : "Please enter your password"
        }
        error={Boolean(errors.password)}
        required
        value={userInfo.password}
        onChange={onChangeHandler}
      />
      <Button onClick={loginUser} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </div>
  );
}

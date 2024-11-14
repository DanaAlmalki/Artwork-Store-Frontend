import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./UserLogin.css";

export default function UserLogin(prop) {
  const { userData, getUserData } = prop;
  const url = "https://artify-store-backend.onrender.com/api/v1/users/signin";
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
        if (response.status === 200) {
          // Store the token
          localStorage.setItem("token", response.data);
          // Fetch user data after storing the token
          getUserData();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
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
            alert("An error occurred: " + error.response.data);
          }
        } else {
          console.error("Network error:", error);
          alert("Network error. Please check your connection.");
        }
      });
  }

  useEffect(() => {
    // Trigger navigation once user data is available
    if (userData && userData.role) {
      if (userData.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    }
  }, [userData, navigate]); // Only trigger effect when userData changes

  return (
    <div className="user-login">
      <h1>User Login</h1>
      <div className="login-fields">
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
        <Button variant="contained" onClick={loginUser} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const url = "http://localhost:5125/api/v1/users";
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role is 'customer'
    Description: "",
  });
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
    email: "",
    password: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for popup

  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
    setErrors({ ...errors, [event.target.id]: "" }); // Clear existing errors
  }

  function handleArtistCheck(event) {
    const checked = event.target.checked;
    setIsArtist(checked);
    setUserInfo({
      ...userInfo,
      role: checked ? "artist" : "customer",
      Description: "", // Reset description if unchecked
    });
    if (!checked) {
      setErrors({ ...errors, Description: "" }); // Clear description error if unchecking 'artist'
    }
  }

  function registerNewUser() {
    // Validation logic
    let validationErrors = {};
    if (!userInfo.email.trim()) {
      validationErrors.email = "Email is required.";
    }
    if (!userInfo.password.trim()) {
      validationErrors.password = "Password is required.";
    }
    if (isArtist) {
      if (!userInfo.Name.trim()) {
        validationErrors.Name = "Name is required for artists.";
      }
      if (!userInfo.Description.trim()) {
        validationErrors.Description = "Description is required for artists.";
      }
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
        if (response.status === 201) {
          setShowSuccessPopup(true); // Show success popup
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          if (error.response.data.errors.Email) {
            alert(error.response.data.errors.Email[0]);
            return;
          }
          if (error.response.data.errors.Password) {
            alert(error.response.data.errors.Password[0]);
            return;
          }
        }
      });
  }

  return (
    <div>
      <h1>User Register</h1>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        helperText={isArtist ? "Please enter your display name" : ""}
        error={Boolean(errors.Name)}
        required={isArtist}
        value={userInfo.Name}
        onChange={onChangeHandler}
        {...(isArtist && errors.Name ? { helperText: errors.Name } : {})}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        helperText={errors.email || "Please enter your email"}
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
        helperText={errors.password || "Please enter a password"}
        error={Boolean(errors.password)}
        required
        value={userInfo.password}
        onChange={onChangeHandler}
      />
      <FormControlLabel
        control={<Checkbox checked={isArtist} onChange={handleArtistCheck} />}
        label="Register as an Artist"
      />
      {isArtist && (
        <TextField
          id="Description"
          label="Description"
          variant="outlined"
          helperText={
            errors.Description ||
            "Provide a short description of yourself as an artist"
          }
          error={Boolean(errors.Description)}
          required
          value={userInfo.Description}
          onChange={onChangeHandler}
        />
      )}
      <Button onClick={registerNewUser} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>
      <Link to="/login">Already have an account?</Link>
      {/* Success Dialog */}
      <Dialog
        open={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      >
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <p>Your registration was successful!</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessPopup(false);
              navigate("/login"); // Navigate to login page on close
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

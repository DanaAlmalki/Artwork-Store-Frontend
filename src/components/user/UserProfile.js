import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import axios from "axios";

import "./UserProfile.css";

export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [newUserInfo, setNewUserInfo] = useState({
    name: userData.name || "",
    email: userData.email || "",
    password: "",
    description:
      userData.role === "Artist"
        ? userData.description || ""
        : "customer description",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const handleInputChange = (field) => (event) => {
    setNewUserInfo({ ...newUserInfo, [field]: event.target.value });
    setErrors({ ...errors, [field]: "" }); // Clear errors on input change
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    logOutHandler();
    setIsConfirmationOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const updateUserProfile = () => {
    // If a field is empty, use the original value
    const updatedUserInfo = {
      ...newUserInfo,
      name: newUserInfo.name.trim() ? newUserInfo.name : userData.name,
      email: newUserInfo.email.trim() ? newUserInfo.email : userData.email,
      password: newUserInfo.password.trim()
        ? newUserInfo.password
        : userData.password,
      description:
        userData.role === "Artist" && !newUserInfo.description.trim()
          ? userData.description
          : newUserInfo.description,
    };

    // Validation logic
    let validationErrors = {};
    if (!updatedUserInfo.email.trim()) {
      validationErrors.email = "Email is required.";
    }
    if (userData.role === "Artist" && !updatedUserInfo.name.trim()) {
      validationErrors.name = "Name is required for artists.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulated async request to update user profile
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .put(
        "https://artify-store-backend.onrender.com/api/v1/users/profile",
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUserData(response.data);
        setAnchorEl(null);
        setLoading(false);
        if (response.status === 200) {
          setShowSuccessPopup(true);
        }
      })
      .catch((error) => {
        alert("Error updating profile:", error.response?.data || error.message);
        console.log(error);
        setLoading(false);
      });
  };

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <div className="user-profile">
      <h2>{userData.role} profile</h2>
      <p>
        <span>Name:</span> {userData.name}
      </p>
      <p>
        <span>Email:</span> {userData.email}
      </p>
      {userData.role === "Artist" && (
        <p>
          <span>Description:</span> {userData.description}
        </p>
      )}
      <div className="user-profile-buttons">
        <Button
          size="small"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          Edit Profile
        </Button>
        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={() => setIsConfirmationOpen(true)}
        >
          Log out
        </Button>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "16px" }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={newUserInfo.name}
            onChange={handleInputChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name || "Please enter your name"}
            fullWidth
            margin="normal"
            required={userData.role === "artist"}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={newUserInfo.email}
            onChange={handleInputChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email || "Please enter your email"}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={newUserInfo.password}
            onChange={handleInputChange("password")}
            error={Boolean(errors.password)}
            helperText={errors.password || "Please enter a password"}
            fullWidth
            margin="normal"
          />
          {userData.role === "Artist" && (
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={newUserInfo.description}
              onChange={handleInputChange("description")}
              error={Boolean(errors.description)}
              helperText={errors.description || "Provide a short description"}
              fullWidth
              margin="normal"
            />
          )}
          <Button
            onClick={updateUserProfile}
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </div>
      </Popover>
      {/* Success Dialog */}
      <Dialog
        open={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      >
        <DialogTitle>Profile Updated Successfully</DialogTitle>
        <DialogContent>
          <p>Your profile has been updated!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <DialogTitle>Log out of this account?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsConfirmationOpen(false)}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

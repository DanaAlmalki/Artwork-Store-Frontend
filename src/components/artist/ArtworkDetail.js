import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ArtworkDetail(prop) {
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    getArtistArtwork,
    categories,
    artwork,
    dialogType,
    onClose,
  } = prop;

  // State initialization
  const [title, setTitle] = useState(artwork ? artwork.title : "");
  const [price, setPrice] = useState(artwork ? artwork.price : "");
  const [quantity, setQuantity] = useState(artwork ? artwork.quantity : "");
  const [categoryId, setCategoryId] = useState(
    artwork ? artwork.category.id : ""
  );
  const [description, setDescription] = useState(
    artwork ? artwork.description : ""
  );
  const [imageUrl, setImageUrl] = useState(artwork ? artwork.imageUrl : "");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  function confirmAction(action) {
    setConfirmationAction(() => action);
    setIsConfirmationOpen(true);
  }

  function handleConfirm() {
    if (confirmationAction) {
      confirmationAction();
    }
    setIsConfirmationOpen(false);
  }

  function deleteArtwork() {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://artify-store-backend.onrender.com/api/v1/Artworks/${artwork.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 204) {
          setIsLoading(false);
          setSnackbarMessage("Artwork deleted successfully.");
          setSnackbarOpen(true);
          getArtistArtwork();
          onClose();
        }
      })
      .catch((error) => {
        console.error("Error deleting artwork:", error);
      });
  }

  // Validate fields
  const validateFields = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title shouldn't be null";
    } else if (title.length < 6) {
      newErrors.title = "Title should be at least 6 characters";
    } else if (title.length > 30) {
      newErrors.title = "Title shouldn't be more than 30 characters";
    }

    if (!description) {
      newErrors.description = "Description shouldn't be null";
    } else if (description.length < 10) {
      newErrors.description = "Description should be at least 10 characters";
    }

    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity should be greater than zero.";
    }

    if (!price || price <= 0) {
      newErrors.price = "Price should be greater than zero.";
    }

    if (!categoryId) {
      newErrors.categoryId = "Category Id shouldn't be null";
    }

    if (!imageUrl) {
      newErrors.imageUrl = "Image URL shouldn't be null";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler
  const handleSave = () => {
    if (!validateFields()) {
      return;
    }

    const formData = {
      title: title || artwork?.title,
      price: parseFloat(price) || artwork?.price,
      quantity: parseInt(quantity, 10) || artwork?.quantity,
      categoryId: categoryId || artwork?.category.id,
      description: description || artwork?.description,
      imageUrl: imageUrl || artwork?.imageUrl,
    };

    setIsLoading(true);
    const token = localStorage.getItem("token");

    const apiRequest = artwork
      ? axios.put(
          `https://artify-store-backend.onrender.com/api/v1/Artworks/${artwork.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      : axios.post(
          `https://artify-store-backend.onrender.com/api/v1/Artworks`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

    apiRequest
      .then((response) => {
        setIsLoading(false);
        const message = artwork
          ? "Artwork updated successfully!"
          : "Artwork created successfully!";
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        getArtistArtwork();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });

    onClose();
  };

  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>
          {dialogType === "modify" ? "Edit Artwork" : "Create Artwork"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === "modify"
              ? "Modify the artwork details below and click save."
              : "Fill out the details below to create a new artwork."}
          </DialogContentText>

          {/* Form Fields */}

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.title}
            helperText={errors.title}
          />

          {/* Price Field */}
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.price}
            helperText={errors.price}
            type="number"
          />

          {/* Quantity Field */}
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.quantity}
            helperText={errors.quantity}
            type="number"
          />

          {/* Category Select */}
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.categoryId}
          >
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <p style={{ color: "red", margin: "4px 0" }}>
                {errors.categoryId}
              </p>
            )}
          </FormControl>

          {/* Description Field */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.description}
            helperText={errors.description}
          />

          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />

          {/* Display the image if imageUrl is provided */}
          {imageUrl && (
            <div style={{ maxWidth: "300px", marginTop: "16px" }}>
              <img
                src={imageUrl}
                alt="Artwork"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {dialogType === "modify" && (
            <Button color="error" onClick={() => confirmAction(deleteArtwork)}>
              <DeleteIcon /> Delete
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => confirmAction(handleSave)}>
            {dialogType === "modify" ? "Save Changes" : "Create Artwork"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmationOpen(false)}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

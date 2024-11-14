import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function CategoriesDashboard(props) {
  const { categories, getCategories } = props;
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null); // Used for editing mode
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); // State to control the dialog

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };
    const token = localStorage.getItem("token");

    try {
      if (categoryId) {
        await axios
          .put(
            `https://artify-store-backend.onrender.com/api/v1/categories/${categoryId}`,
            categoryData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setMessage("Category updated successfully!");
              getCategories();
            }
          });
        handleClose(); // Close the dialog on success
      } else {
        axios
          .post(
            "https://artify-store-backend.onrender.com/api/v1/categories",
            categoryData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 201) {
              setMessage("Category created successfully!");
              getCategories();
            }
          });
      }
      setName("");
      setCategoryId(null);
    } catch (error) {
      console.error("Error saving category:", error);
      setMessage("Failed to save the category.");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setCategoryId(category.id);
    setOpen(true); // Open the dialog for editing
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setCategoryId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <h2>Categories Dashboard</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Category
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color="success" gutterBottom>
          {message}
        </Typography>
      )}
      <br></br>
      <h3>Existing Categories</h3>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} disableGutters>
            <ListItemText primary={category.name} />
            <IconButton
              onClick={() => handleEdit(category)}
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Dialog for editing */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

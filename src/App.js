import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import LayOut from "./components/layout/LayOut.js";
import HomePage from "./pages/HomePage.js";
import ProductsPage from "./pages/ProductsPage.js";
import WishListPage from "./pages/WishListPage.js";
import NotFound from "./pages/NotFound.js";

function App() {
  const productUrl = "http://localhost:5125/api/v1/artworks";

  const [productResponse, setProductResponse] = useState({
    artworks: [],
    totalCount: 0,
  });

  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [wishList, setWishList] = useState([]);

  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        setProductResponse(response.data);
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        //setLoading(false);
      });
  }

  /*useEffect(() => {
    getData();
  }, []);*/

  /*if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }*/

  if (error) {
    return <div>{error.message}</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut wishList={wishList} />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductsPage response={productResponse} />,
        },
        {
          path: "/wishList",
          element: <WishListPage wishList={wishList} />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

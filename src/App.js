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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [wishList, setWishList] = useState([]);

  // Pagination
  const defaultMinPrice = 0;
  const defaultMaxPrice = 10000;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [productResponse, setProductResponse] = useState({
    artworks: [],
    totalCount: 0,
  });

  let pageSize = 3;
  let productUrl = `http://localhost:5125/api/v1/Artworks?PageSize=${pageSize}&PageNumber=${page}`;

  if (input) {
    productUrl += `&Search=${input}`;
  }
  if (sort) {
    productUrl += `&SortOrder=${sort}`;
  }
  if (minPrice !== 0) {
    productUrl += `&LowPrice=${minPrice}`;
  }
  if (maxPrice !== 10000) {
    productUrl += `&HighPrice=${maxPrice}`;
  }

  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        setProductResponse(response.data);
        setLoading(false);
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [page, input, sort, maxPrice, minPrice]);

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
          element: (
            <ProductsPage
              response={productResponse}
              input={input}
              setInput={setInput}
              setSort={setSort}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              defaultMinPrice={defaultMinPrice}
              defaultMaxPrice={defaultMaxPrice}
              wishList={wishList}
              setWishList={setWishList}
              page={page}
              pageSize={pageSize}
              handleChange={handleChange}
            />
          ),
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

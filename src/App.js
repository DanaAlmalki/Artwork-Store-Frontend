import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import LayOut from "./components/layout/LayOut.js";
import HomePage from "./pages/HomePage.js";
import ProductsPage from "./pages/ProductsPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import WishListPage from "./pages/WishListPage.js";
import NotFound from "./pages/NotFound.js";
import UserRegister from "./components/user/UserRegister.js";
import UserLogin from "./components/user/UserLogin.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [wishList, setWishList] = useState([]);

  // Pagination
  const defaultMinPrice = 0;
  const defaultMaxPrice = 10000;
  const defaultSort = "name";
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(defaultSort);
  const [minPrice, setMinPrice] = useState(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [productResponse, setProductResponse] = useState({
    artworks: [],
    totalCount: 0,
  });

  const pageSize = 2;
  let productUrl = `http://localhost:5125/api/v1/Artworks?PageSize=${pageSize}&PageNumber=${page}&SortOrder=${sort}`;

  if (input) {
    productUrl += `&Search=${input}`;
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
    setPage(1);
  }, [input, maxPrice, minPrice, sort]);

  useEffect(() => {
    getData();
  }, [page, input, maxPrice, minPrice, sort]);

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
              setInput={setInput}
              setSort={setSort}
              defaultSort={defaultSort}
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
          path: "/products/:productId",
          element: <ProductDetailPage />,
        },
        {
          path: "/wishList",
          element: <WishListPage wishList={wishList} />,
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path: "/login",
          element: <UserLogin />,
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

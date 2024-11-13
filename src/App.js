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
import NotFoundPage from "./pages/NotFoundPage.js";
import UserRegisterPage from "./pages/UserRegisterPage.js";
import UserLoginPage from "./pages/UserLoginPage.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import ProtectedRoute from "./components/user/ProtectedRoute.js";
import DashboardPage from "./pages/DashboardPage.js";
import OrderDashboardPage from "./pages/OrderDashboardPage.js";
import UserDashboardPage from "./pages/UserDashboardPage.js";
import CategoriesDashboard from "./components/dashboard/CategoriesDashboard.js";
import CartPage from "./pages/CartPage.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  // initialize with value from local storage
  const [wishList, setWishList] = useState(() => {
    return JSON.parse(localStorage.getItem("wishList")) || [];
  });

  const [cartList, setCartList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartList")) || [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

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

  // user
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsUserDataLoading(false);
      })
      .catch((error) => {
        setIsUserDataLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  // categories
  const [categories, setCategories] = useState([]);
  const [isCatLoading, setIsCatLoading] = useState(true);

  function getCategories() {
    setIsCatLoading(true);
    axios
      .get("http://localhost:5125/api/v1/Categories")
      .then((response) => {
        setCategories(response.data);
        setIsCatLoading(false);
      })
      .catch((error) => {
        setIsCatLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  // protected route
  let isAuthenticated = userData ? true : false;

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
      element: (
        <LayOut
          wishList={wishList}
          userData={userData}
          isAuthenticated={isAuthenticated}
        />
      ),
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
              cartList={cartList}
              setCartList={setCartList}
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
          element: <UserRegisterPage />,
        },
        {
          path: "/login",
          element: (
            <UserLoginPage userData={userData} getUserData={getUserData} />
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfilePage
                  userData={userData}
                  setUserData={setUserData}
                  categories={categories}
                />
              }
            />
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={
                <DashboardPage userData={userData} setUserData={setUserData} />
              }
            />
          ),
          children: [
            {
              path: "/dashboard/order-dashboard",
              element: (
                <ProtectedRoute
                  isUserDataLoading={isUserDataLoading}
                  isAuthenticated={isAuthenticated}
                  shouldCheckAdmin={true}
                  userData={userData}
                  element={<OrderDashboardPage />}
                />
              ),
            },
            {
              path: "/dashboard/user-dashboard",
              element: (
                <ProtectedRoute
                  isUserDataLoading={isUserDataLoading}
                  isAuthenticated={isAuthenticated}
                  shouldCheckAdmin={true}
                  userData={userData}
                  element={<UserDashboardPage />}
                />
              ),
            },
            {
              path: "/dashboard/category-dashboard",
              element: (
                <ProtectedRoute
                  isUserDataLoading={isUserDataLoading}
                  isAuthenticated={isAuthenticated}
                  shouldCheckAdmin={true}
                  userData={userData}
                  element={
                    <CategoriesDashboard
                      categories={categories}
                      getCategories={getCategories}
                    />
                  }
                />
              ),
            },
          ],
        },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

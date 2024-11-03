import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "./components/navbar/NavBar.js";
import Products from "./components/products/Products.js";

function App() {
  const productUrl = "http://localhost:5125/api/v1/artworks";

  const [productResponse, setProductResponse] = useState({
    artworks: [],
    totalCount: 0,
  });

  function getData() {
    axios.get(productUrl).then((response) => {
      setProductResponse(response.data);
      //console.log(response);
      //console.log(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Products response={productResponse} />
    </div>
  );
}

export default App;

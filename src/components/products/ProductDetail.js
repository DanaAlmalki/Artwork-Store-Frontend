import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetail(prop) {
  const { product } = prop;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // goes back to the previous page
  };

  return (
    <div>
      <h2>Product Detail</h2>
      <div className="detail" key={product.id}>
        <h3 className="title">{product.title}</h3>
        {/*<img className="productImg" src={product.image} alt="product" />*/}
        <p className="description">{product.description}</p>
        <div>${product.price}</div>
        <div>Artist: {product.user.name}</div>
        <div>Quantity: {product.quantity}</div>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}

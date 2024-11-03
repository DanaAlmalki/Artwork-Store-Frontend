import Products from "../components/products/Products.js";

export default function ProductsPage(prop) {
  const { response } = prop;

  return (
    <div>
      <h1>Products page</h1>
      <Products response={response} />
    </div>
  );
}

import Products from "../components/products/Products.js";

export default function ProductsPage(prop) {
  const {
    response,
    setInput,
    input,
    wishList,
    setWishList,
    page,
    pageSize,
    handleChange,
  } = prop;

  return (
    <div>
      <h1>Products page</h1>
      <Products
        response={response}
        wishList={wishList}
        setWishList={setWishList}
        page={page}
        pageSize={pageSize}
        handleChange={handleChange}
      />
    </div>
  );
}

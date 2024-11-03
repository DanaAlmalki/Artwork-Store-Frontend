import Products from "../components/products/Products.js";

export default function ProductsPage(prop) {
  const {
    response,
    input,
    setInput,
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
        input={input}
        setInput={setInput}
        wishList={wishList}
        setWishList={setWishList}
        page={page}
        pageSize={pageSize}
        handleChange={handleChange}
      />
    </div>
  );
}

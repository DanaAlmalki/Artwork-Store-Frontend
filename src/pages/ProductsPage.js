import Products from "../components/products/Products.js";

export default function ProductsPage(prop) {
  const {
    response,
    input,
    setInput,
    setSort,
    setMinPrice,
    setMaxPrice,
    defaultMinPrice,
    defaultMaxPrice,
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
    </div>
  );
}

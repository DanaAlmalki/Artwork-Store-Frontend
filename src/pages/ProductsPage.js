import Products from "../components/products/Products.js";

export default function ProductsPage(prop) {
  const {
    response,
    setInput,
    setSort,
    defaultSort,
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
    </div>
  );
}

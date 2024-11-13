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
    cartList,
    setCartList,
    page,
    pageSize,
    handleChange,
  } = prop;

  return (
    <div>
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
        cartList={cartList}
        setCartList={setCartList}
        page={page}
        pageSize={pageSize}
        handleChange={handleChange}
      />
    </div>
  );
}

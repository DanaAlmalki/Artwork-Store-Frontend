import React from "react";

import WishList from "../components/wishlist/WishList.js";

export default function WishListPage(prop) {
  const { wishList } = prop;
  return (
    <div>
      <WishList wishList={wishList} />
    </div>
  );
}

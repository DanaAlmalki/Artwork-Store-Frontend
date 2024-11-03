import React from "react";

import WishListItem from "./WishListItem";

export default function WishList(prop) {
  const { wishList } = prop;

  if (wishList.length === 0) {
    return (
      <div className="empty">
        <h2>Wish List</h2>
        <p>The wish list is empty</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Wish List</h2>
      {wishList.map((item) => {
        return (
          <div key={item.id}>
            <WishListItem item={item} />
          </div>
        );
      })}
    </div>
  );
}

import React, { useState } from "react";
import MyCart from "./MyCart";

export default function Header({ inCartData, removeInCartHandler, removeAllCartItems }) {
  const [toggleMyCart, setToggleMyCart] = useState(false);

  return (
    <div className="text-white justify-content-between align-items-center d-flex px-5 header bg-primary">
      <h2 className="m-0 p-0"> Shopping App </h2>
      <div id="my_cart_btn">
        <span className="ml-auto" onClick={() => setToggleMyCart(!toggleMyCart)}>
          My Cart
          <sup className="badge badge-warning" id="cartItemNumber">
            {inCartData.length}
          </sup>
        </span>
        <MyCart toggleMyCart={toggleMyCart} inCartData={inCartData} removeInCartHandler={removeInCartHandler} removeAllCartItems={removeAllCartItems} />
      </div>
    </div>
  );
}

import React from "react";
const MyCart = ({ toggleMyCart, inCartData, removeInCartHandler, removeAllCartItems }) => {
  return toggleMyCart === true ? (
    <ul className="list-group" id="my_cart_list">
      {inCartData.length ? (
        inCartData.map((cl) => (
          <li className="list-group-item" key={cl.id}>
            <span>{cl.title}</span>
            <small className="text-danger float-right" onClick={() => removeInCartHandler(cl.id)}>
              Remove
            </small>
            <span className="mr-2 float-right"> $ {cl.price} </span>
          </li>
        ))
      ) : (
        <li className="list-group-item"> No items in the cart, Please add some.</li>
      )}

      {inCartData.length ? (
        <li className="bg-info list-group-item  text-white align-items-center">
          <span>Total: </span>
          <small className="badge badge-danger float-right" onClick={removeAllCartItems}>
            Remove All
          </small>
          <span className="mr-2 float-right"> $ 3433 </span>
        </li>
      ) : null}
    </ul>
  ) : null;
};

export default MyCart;

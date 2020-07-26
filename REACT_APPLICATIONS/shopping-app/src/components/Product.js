import React from "react";

export const Product = (props) => {
  return (
    <div className="col-sm-3">
      <div className="single_product">
        <div className="action_div">
          <div className={props.pro.incart ? "bg-success" : "bg-info"} onClick={() => props.inCartHandler(props.pro.id)}>
            {props.pro.incart ? "In Cart" : "Add to Cart"}
          </div>
          <div className={props.pro.fav ? "bg-warning" : "bg-secondary"} onClick={() => props.favHandler(props.pro.id)}>
            {props.pro.fav ? "My Favourite" : "Mark Favourite"}
          </div>
          <div className="bg-danger" onClick={() => props.deleteProduct(props.pro.id)}>
            Delete
          </div>
        </div>
        <div className="pro_img">
          <img src="images/pro1.jpg" alt="my_img" />
        </div>
        <div className="pro_title">
          <span>{props.pro.title}</span>
          <span>$ {props.pro.price}</span>
        </div>
      </div>
    </div>
  );
};

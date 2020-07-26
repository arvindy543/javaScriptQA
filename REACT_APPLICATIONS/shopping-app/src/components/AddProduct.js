import React from "react";

export const AddProduct = (props) => {
  return (
    <div className="col-sm-5">
      <form onSubmit={(e) => props.submitProduct(e)}>
        <div className="input-group mt-3">
          <input
            ref={props.autoFocusAddInput}
            type="text"
            className="form-control"
            placeholder="Add product title"
            onChange={(e) => props.onChangeTitle(e.target.value)}
            value={props.proTitle}
          />
          <input className="form-control" placeholder="Add price" onChange={(e) => props.onChangePrice(e.target.value)} value={props.proPrice} />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              +
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

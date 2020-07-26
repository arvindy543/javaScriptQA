import React from "react";

const Sort = ({ sortOnchangeHandler }) => {
  return (
    <div className="col-sm-3">
      <select className="form-control mt-3" onChange={(e) => sortOnchangeHandler(e.target.value)}>
        <option value="null">Sort by</option>
        <option value="favourite">Favourite</option>
        <option value="title">By title</option>
        <option value="price">By Price</option>
      </select>
    </div>
  );
};

export default Sort;

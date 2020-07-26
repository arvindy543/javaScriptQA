import React from "react";

export default function List(props) {
  return (
    <ul className="list-group mt-3 mb-3 px-2" id="list_items">
      <li className="list-group-item" id={props.list.id}>
        <span>
          <input type="checkbox" className="mr-2" />
          {props.list.title}
        </span>
        <span id={props.list.id}>
          <small className="text-primary mx-1" onClick={(e) => props.editListHandler(e)}>
            Edit
          </small>
          <small className="text-danger mx-1" onClick={props.deleteListHandler}>
            Delete
          </small>
        </span>
      </li>
    </ul>
  );
}

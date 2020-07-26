import React, { useState } from "react";

const EditModal = (props) => {
  const [editValue, setEditValue] = useState("");

  const editFormClose = () => {
    document.querySelector(".edit_box").style.display = "none";
  };

  return (
    <div className="edit_box">
      <form id="edit_form" className="edit_form_className" onSubmit={(e) => props.submitEditHandler(e, editValue)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Edit here..." id="edit_value" autoComplete="off" onChange={(e) => setEditValue(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success btn-sm mr-2" id="submit_edit_btn">
          Save
        </button>
        <button type="button" className="btn btn-danger btn-sm" id="edit_form_close" onClick={editFormClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default EditModal;

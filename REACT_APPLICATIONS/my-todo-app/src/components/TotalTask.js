import React from "react";

export default function TotalTask(props) {
  return (
    <div className="d-flex">
      <div className=" mt-3 mb-3 px-2 d-flex" id="clear_all">
        <button className="btn btn-danger btn-sm" id="clear_task" onClick={props.clearAllTasks}>
          Clear Checked Task
        </button>
      </div>
      <div className=" mt-3 mb-3 px-2 d-flex">
        <button className="btn btn-sm btn-primary">
          Total task
          <span className="badge badge-warning ml-2" id="task_count">
            {props.totalTask}
          </span>
        </button>
      </div>
    </div>
  );
}

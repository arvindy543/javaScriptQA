import React, { useState, useRef, useEffect } from "react";
import List from "./List";
import EditModal from "./EditModal";
import TotalTask from "./TotalTask";

export default function AddListForm() {
  const [inpValue, setInpValue] = useState("");
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("ReTodoData")) ?? []);
  const [editdElemId, setEditdElemId] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const textInput = useRef();

  useEffect(() => {
    console.log("useEffect1 - set localStorage");
    localStorage.setItem("ReTodoData", JSON.stringify(todoData));
  }, [todoData]);

  useEffect(() => {
    console.log("useEffect2 - set Focus on input");
    textInput.current.focus();
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!inpValue.trim()) {
      alert("Please add some task...");
    } else {
      const todo = { id: Date.now(), title: inpValue };
      setTodoData([...todoData, todo]);
      setInpValue("");
      setTotalTask(totalTask + 1);
      document.querySelector("#add_list_form").reset();
    }
  };

  function deleteListHandler(e) {
    const checkChecked = e.target.parentElement.parentElement.children[0].children[0].checked;
    if (checkChecked) {
      setTodoData(todoData.filter((l) => l.id !== Number(e.target.parentElement.id)));
      setTotalTask(totalTask - 1);
    } else {
      alert("Please check your list item to delete..");
    }
  }

  function editListHandler(e) {
    const checkChecked = e.target.parentElement.parentElement.children[0].children[0].checked;
    if (checkChecked) {
      document.querySelector(".edit_box").style.display = "flex";
      setEditdElemId(e.target.parentElement.id);
      document.querySelector("#edit_value").focus();
      document.querySelector("#edit_value").value = e.target.parentElement.parentElement.children[0].textContent;
    } else {
      alert("Please check your list item to Edit..");
    }
  }

  const submitEditHandler = (e, editVal) => {
    e.preventDefault();
    if (!editVal.trim()) {
      alert("Please add text to edit");
    } else {
      todoData.map((l, ind) => {
        if (l.id === Number(editdElemId)) {
          const copyArr = [...todoData];
          copyArr[ind].title = editVal;
          setTodoData(copyArr);
        }
      });
      document.querySelector("#edit_form").reset();
      document.querySelector(".edit_box").style.display = "none";
    }
  };

  // CLEAR ALL TASK
  const clearAllTasks = () => {
    const allChecboxNode = document.querySelectorAll('[type="checkbox"]');

    const atleastOneChecked = [...allChecboxNode].some((n) => n.checked === true);

    if (!atleastOneChecked) {
      alert("Please check atleast one item in the list.");
    } else {
      const checkedItemIds = [...allChecboxNode].filter((chNode) => chNode.checked === true).map((v) => v.parentElement.parentElement.id * 1);
      const checkedItems = todoData.filter((el) => checkedItemIds.indexOf(el.id) < 0);

      setTodoData(checkedItems);
      setTotalTask(checkedItems.length);
    }
  };

  return (
    <>
      <TotalTask totalTask={totalTask} clearAllTasks={clearAllTasks}></TotalTask>

      <form id="add_list_form" onSubmit={formSubmitHandler}>
        <div className="input-group mt-3 mb-3 px-2" id="add_task">
          <div className="input-group-prepend">
            <span className="input-group-text"> + </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Add task here..."
            id="input_task_value"
            autoComplete="off"
            onChange={(e) => setInpValue(e.target.value)}
            ref={textInput}
          />
        </div>
      </form>
      {todoData.map((list) => (
        <List list={list} deleteListHandler={deleteListHandler} editListHandler={editListHandler} key={list.id}></List>
      ))}
      <EditModal submitEditHandler={submitEditHandler}></EditModal>
    </>
  );
}

import React from "react";
import "./App.css";
import Header from "./components/Header";
import AddListForm from "./components/AddListForm";

function App() {
  return (
    <div className="wrapper">
      <Header></Header>
      <AddListForm></AddListForm>
    </div>
  );
}

export default App;

// add, edit, and delete checked task
// check and uncheck list
// clear all task list

import React, { useState, useReducer, useEffect } from "react";
import "./App.css";
import AllCards from "./Components/AllCards";
import TextEditor from "./Components/TextEditor";
import ImageEditor from "./Components/ImageEditor";

export const StoreContext = React.createContext();

const initialState = [
  { id: 11, isData: false, text: {}, image: {} },
  { id: 22, isData: false, text: {}, image: {} },
  { id: 33, isData: false, text: {}, image: {} },
  { id: 44, isData: true, text: { title: "lorem ispum 4", bg_color: "lightgreen", color: "green", h_align: "center", font_size: "14px" }, image: {} },
];

const projectData = localStorage.getItem("mrcanvasLikeStore") !== null ? JSON.parse(localStorage.getItem("mrcanvasLikeStore")) : initialState;

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_TEXT":
      return [...action.payload];
    case "DELETE_CARD_TEXT":
      return [...action.payload];
    case "SUBMIT_IMAGE":
      return [...action.payload];
    default:
      return state;
  }
};

function App() {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [openImageEditor, setOpenImageEditor] = useState(false);
  const [state, dispatch] = useReducer(reducer, projectData);
  const [cardId, setCardId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // SET LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("mrcanvasLikeStore", JSON.stringify(state));
  }, [state]);

  // CURRENT CARD ID
  const handleCurrentCardId = (id) => {
    setCardId(id);
  };

  // OPEN TEXT EDITOR HANDLER
  const openTextEditorHandler = () => {
    setOpenTextEditor(true);
    // const findCard = [...state].find((card) => card.id === cardId);
    // setEditedData(findCard);
  };

  // CLOSE TEXT EDITOR HANDLER
  const closeEditorHandler = () => {
    setOpenTextEditor(false);
  };

  // OPEN Image EDITOR HANDLER
  const openImageEditorHandler = () => {
    setOpenImageEditor(true);
  };

  // CLOSE Image EDITOR HANDLER
  const closeImageEditorHandler = () => {
    setOpenImageEditor(false);
  };

  return (
    <StoreContext.Provider
      value={{
        cardsData: state,
        openTextEditorHandler: openTextEditorHandler,
        closeEditorHandler: closeEditorHandler,
        openImageEditorHandler: openImageEditorHandler,
        closeImageEditorHandler: closeImageEditorHandler,
        dispatch: dispatch,
        handleCurrentCardId: handleCurrentCardId,
        cardId: cardId,
        editedData: editedData,
      }}
    >
      <div className="App">
        <header className="App-header">Mrcanvas Like {state[0].id}</header>
        <AllCards />
        {openTextEditor ? <TextEditor /> : null}
        {openImageEditor ? <ImageEditor /> : null}
      </div>
    </StoreContext.Provider>
  );
}

export default App;

import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../App";
import EditorSetting from "./EditorSettings";

const TextEditor = () => {
  const cardContext = useContext(StoreContext);
  const [textValue, setTextValue] = useState("");
  const [bgColorValue, setBgColorValue] = useState(null);
  const [textColorValue, setTextColorValue] = useState(null);
  const [hAlignValue, setHAlignValue] = useState(null);
  const [fontSize, setFontSize] = useState("14px");
  const [message, setMessage] = useState({ msg: "", msg_class: "" });

  // CLOSE ALERT MESSAGE HANDLER
  useEffect(() => {
    const clearMsg = setTimeout(() => {
      setMessage({ msg: "", msg_class: "" });
    }, 5000);
    return () => clearTimeout(clearMsg);
  }, [message]);

  // SAVE CARD TEXT HANDLER
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textValue) {
      const copyData = [...cardContext.cardsData];
      const submitTextData = copyData.find((card) => card.id === cardContext.cardId);
      submitTextData.isData = true;
      submitTextData.image = {};
      submitTextData.text = { ...submitTextData.text, title: textValue, color: textColorValue, bg_color: bgColorValue, h_align: hAlignValue, font_size: fontSize };
      cardContext.dispatch({ type: "SUBMIT_TEXT", payload: copyData });
      setTextValue("");
      setMessage({ ...message, msg: "Successfully! text added to the card.", msg_class: "alert-success" });
    } else {
      setMessage({ ...message, msg: "Oops! Please add text in text field.", msg_class: "alert-danger" });
    }
  };

  // CARD BG COLOR HANDLER
  const handleBgColor = (color) => {
    setBgColorValue(color);
  };

  // CARD TEXT COLOR HANDLER
  const handleTextColor = (color) => {
    setTextColorValue(color);
  };

  // HORIZONTAL TEXT ALIGN HANDLER
  const handleHAlignText = (h_value) => {
    setHAlignValue(h_value);
  };

  // FONT-SIZE HANDLER
  const handleFontSize = (font) => {
    setFontSize(`${font}px`);
  };

  const textAreaStyle = { background: bgColorValue, color: textColorValue, textAlign: hAlignValue, fontSize: fontSize };

  return (
    <div className="editor_container">
      {message.msg ? (
        <div className={`msg alert ${message.msg_class} alert-dismissible`}>
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          {message.msg}
        </div>
      ) : null}

      <form onSubmit={handleTextSubmit}>
        <div className="form-group mb-3">
          <div className="h6 mt-0"> Add or Edit Text </div>
          <hr></hr>

          <EditorSetting handleBgColor={handleBgColor} handleTextColor={handleTextColor} handleHAlignText={handleHAlignText} handleFontSize={handleFontSize} fontSize={fontSize} />

          <hr></hr>
          <textarea rows="3" style={textAreaStyle} className="form-control" placeholder="Please enter some text..." onChange={(e) => setTextValue(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-sm btn-danger ml-2" onClick={cardContext.closeEditorHandler}>
          Close
        </button>
      </form>
    </div>
  );
};

export default TextEditor;

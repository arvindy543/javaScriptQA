import React from "react";

const EditorSetting = (props) => {
  return (
    <div className="settings">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#home">
            BG Color
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu1">
            Text Color
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu2">
            Align Text
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu3">
            Font Size
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div id="home" className="tab-pane active">
          <input className="mt-2" type="color" onChange={(e) => props.handleBgColor(e.target.value)} />
        </div>
        <div id="menu1" className="tab-pane fade">
          <input className="mt-2" type="color" onChange={(e) => props.handleTextColor(e.target.value)} />
        </div>
        <div id="menu2" className="tab-pane fade">
          <small className="badge bg-secondary mr-2 mt-2" onClick={() => props.handleHAlignText("left")}>
            {" "}
            H-Align-Left
          </small>
          <small className="badge bg-secondary mr-2 mt-2" onClick={() => props.handleHAlignText("center")}>
            {" "}
            H-Align-Center
          </small>
          <small className="badge bg-secondary mr-2 mt-2" onClick={() => props.handleHAlignText("right")}>
            {" "}
            H-Align-Right
          </small>
        </div>
        <div id="menu3" className="tab-pane fade">
          <div className="slidecontainer mt-2">
            <input type="range" className="custom-range" id="customRange" name="points1" onChange={(e) => props.handleFontSize(e.target.value)} />
            {props.fontSize}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSetting;

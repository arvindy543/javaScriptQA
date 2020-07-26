import React, { useContext, useState } from "react";
import { StoreContext } from "../App";

const ImageEditor = () => {
  const cardContext = useContext(StoreContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const imageSubmitHandler = (e) => {
    e.preventDefault();
    const copyData = [...cardContext.cardsData];
    const submitTextData = copyData.find((card) => card.id === cardContext.cardId);
    submitTextData.isData = true;
    submitTextData.text = {};
    submitTextData.image = { url: uploadedFiles[0].src };

    cardContext.dispatch({ type: "SUBMIT_IMAGE", payload: copyData });
  };

  const onChangeFiles = (e) => {
    const arrFiles = Array.from(e.target.files);
    const files = arrFiles.map((file, index) => {
      const src = window.URL.createObjectURL(file);
      return { file, id: index, src };
    });
    setUploadedFiles(files);
  };

  return (
    <div className="editor_container">
      <form onSubmit={imageSubmitHandler}>
        <div className="form-group mb-3">
          <div className="h6 mt-0"> Upload image to card </div>
          <hr></hr>
          <div className="uploaded_image">
            {uploadedFiles.length
              ? uploadedFiles.map((img) => <img key={img.id} src={img.src} alt={img.id} style={{ width: "100px", height: "100px", objectFit: "cover" }} />)
              : null}
          </div>

          <input type="file" multiple className="form-control" onChange={onChangeFiles} />
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-sm btn-danger ml-2" onClick={cardContext.closeImageEditorHandler}>
          Close
        </button>
      </form>
    </div>
  );
};

export default ImageEditor;

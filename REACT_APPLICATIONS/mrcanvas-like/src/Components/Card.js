import React, { useContext, useState, useEffect, useCallback } from "react";
import { StoreContext } from "../App";

const Card = () => {
  const cardContext = useContext(StoreContext);
  const [openCardAct, setOpenCardAct] = useState(cardContext.cardsData.map((card) => false));

  //OPEN CARD ACTIONS
  const openCardActHandler = useCallback(
    (index) => {
      const newOpenCardAct = [...openCardAct];
      newOpenCardAct[index] = !openCardAct[index];
      setOpenCardAct(newOpenCardAct);
    },
    [openCardAct]
  );

  // CLOSE CARD ACTONS ON CLICK OUTSIDE
  useEffect(() => {
    const handleCloseOutside = (e) => {
      if (e.target.closest(".column")) return;
      const newOpenCardAct = [...openCardAct];

      [...document.querySelectorAll(".card-wrapper")].map((cw) => {
        const index = cw.getAttribute("ind");
        newOpenCardAct[index] = !openCardAct[index];
        return newOpenCardAct;
      });
      setOpenCardAct(newOpenCardAct);
    };

    document.addEventListener("mousedown", handleCloseOutside);
    return () => document.removeEventListener("mousedown", handleCloseOutside);
  }, [openCardAct, openCardActHandler]);

  // SAVE CARD TEXT HANDLER
  const deleteCardText = (id) => {
    const copyData = [...cardContext.cardsData];
    const submitTextData = copyData.find((card) => card.id === id);
    submitTextData.isData = false;
    submitTextData.text = {};

    cardContext.dispatch({ type: "DELETE_CARD_TEXT", payload: copyData });
  };

  // EDIT CARD TEXT

  return cardContext.cardsData.map((card, index) => {
    const cardStyle = {
      backgroundColor: card.text.bg_color,
      color: card.text.color,
      fontSize: card.text.font_size,
      textAlign: card.text.h_align,
      backgroundImage: `url(${card.image.url})`,
    };

    return (
      <div className="col-sm-3 mt-4 column" key={card.id} style={{ position: "relative" }}>
        <div
          className="card justify-content-center"
          style={cardStyle}
          onClick={() => {
            openCardActHandler(index);
            cardContext.handleCurrentCardId(card.id);
          }}
        >
          {card.text.title}
        </div>
        {openCardAct[index] ? (
          <div className="card-wrapper" ind={index}>
            <div className="card-body">
              {!card.isData ? (
                <>
                  <button type="button" className="btn btn-sm btn-primary mx-1" onClick={cardContext.openTextEditorHandler}>
                    Add Text
                  </button>
                  <button type="button" className="btn btn-sm btn-light mx-1" onClick={cardContext.openImageEditorHandler}>
                    Add Image
                  </button>
                </>
              ) : (
                <>
                  {Object.keys(card.text).length === 0 ? (
                    <button type="button" className="btn btn-sm btn-success mx-1">
                      Edit Image
                    </button>
                  ) : Object.keys(card.image).length === 0 ? (
                    <button type="button" className="btn btn-sm btn-success mx-1" onClick={cardContext.openTextEditorHandler}>
                      Edit Text
                    </button>
                  ) : null}

                  <button type="button" className="btn btn-sm btn-danger mx-1" onClick={() => deleteCardText(card.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  });
};
export default Card;

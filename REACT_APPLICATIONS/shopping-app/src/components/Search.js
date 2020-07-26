import React, { useState, useEffect } from "react";

const Search = (props) => {
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterList, setfilterList] = useState([]);

  //SHOW SERCH LIST
  const showSearchListHandler = (e) => {
    e.preventDefault();
    setShowSearchList(true);
  };

  useEffect(() => {
    setfilterList(props.productList.filter((fl) => fl.title.indexOf(searchValue) !== -1));
  }, [searchValue, props.productList]);

  return (
    <div className="col-sm-4">
      <form>
        <div className="input-group mt-3" id="search_bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search product here..."
            onKeyUp={showSearchListHandler}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" id="search_btn">
              Search
            </button>
          </div>
          {showSearchList ? (
            <div id="search_list">
              {filterList.map((l) => (
                <li key={l.id} className="s-list-item" onClick={() => props.flListClick(l.id)}>
                  <span> {l.title} </span>
                </li>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Search;

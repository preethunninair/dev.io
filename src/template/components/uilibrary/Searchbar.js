import React, { useState } from "react";
import Icon from "./Icon";

function Searchbar(props) {
  const [modalSearch, setModalSearch] = useState(false);

  if (props.config.floating) {
    return (
      <>
        <div className="search-bar input-group">
          <div
            className="p-0 m-0"
            data-target="#searchModal"
            data-toggle="modal"
            id="search-button"
          >
            <Icon
              className="mt-2"
              iconObj={{
                family: "material-icon",
                name: "search",
              }}
            />
            <span className="d-lg-none d-md-block">Search</span>
          </div>
        </div>
        <div
          className={`modal modal-search fade ${modalSearch ? "show" : ""}`}
          role="dialog"
          style={modalSearch ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <input
                  id="inlineFormInputGroup"
                  placeholder="SEARCH"
                  type="text"
                  className="form-control"
                />
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="input-group" style={{ width: props.config.width }}>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        aria-label="Username"
      />
      <div className="input-group-append">
        <span className="input-group-text">
          <i className="tim-icons icon-zoom-split" />
        </span>
      </div>
    </div>
  );
}
export default Searchbar;

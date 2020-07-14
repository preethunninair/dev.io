import React, { useState } from "react";

function Searchbar(props) {
  const [modalSearch, setModalSearch] = useState(false);

  if (props.config.floating) {
    return (
      <>
        <div className="search-bar input-group">
          <button
            class="btn btn-link"
            data-target="#searchModal"
            data-toggle="modal"
            id="search-button"
            onClick={() => setModalSearch(true)}
          >
            <i className="tim-icons icon-zoom-split" />
            <span className="d-lg-none d-md-block">Search</span>
          </button>
        </div>
        <div
          class={`modal modal-search fade ${modalSearch ? "show" : ""}`}
          role="dialog"
          style={modalSearch ? { display: "block" } : { display: "none" }}
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div className="modal-header">
                <input
                  id="inlineFormInputGroup"
                  placeholder="SEARCH"
                  type="text"
                  class="form-control"
                />
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setModalSearch(false)}
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
    <div class="input-group" style={{ width: props.config.width }}>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        aria-label="Username"
      />
      <div class="input-group-append">
        <span class="input-group-text">
          <i className="tim-icons icon-zoom-split" />
        </span>
      </div>
    </div>
  );
}
export default Searchbar;

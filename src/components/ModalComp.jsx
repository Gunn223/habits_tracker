import React, { useState } from "react";

const ModalComp = ({ children, title, isOpen }) => {
  return (
    <>
      <div
        class="modal "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
        }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                onClick={() => isOpen(false)}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComp;

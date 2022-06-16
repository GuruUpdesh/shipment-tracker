import React from "react";

const Modal = ({ children }) => {
  return (
    <>
      <div className="modal-container">{children}</div>
      <div className="modal-backdrop"></div>
    </>
  );
};

export default Modal;

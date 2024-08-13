import React, { useEffect } from "react";

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.style.position = 'fixed';

    return () => {
      document.body.style.position = null
    }
  }, [])
  return (
    <>
      <div className="modal-container">{children}</div>
      <div className="modal-backdrop"></div>
    </>
  );
};

export default Modal;

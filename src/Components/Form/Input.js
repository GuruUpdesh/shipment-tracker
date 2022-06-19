import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ placeholder, value, setValue, type, autoFocus }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div
      className={
        "input-container " +
        (value === "" || value === undefined ? "" : "full-input")
      }
    >
      <span>{placeholder}</span>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type === "password" ? (visible ? "text" : type) : type}
        autoFocus = {autoFocus}
      />
      {type == "password" ? (
        <>
          {visible == true ? (
            <AiFillEye onClick={toggleVisibility} />
          ) : (
            <AiFillEyeInvisible onClick={toggleVisibility} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;

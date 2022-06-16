import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

const Selector = ({ placeholder, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={
        "selector " +
        (selected === "" ? "" : "full-selector ") +
        (isOpen ? "active-selector" : "")
      }
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <button>
        <span>{placeholder}</span>
        {selected}
        {isOpen ? <BiChevronUp /> : <BiChevronDown />}
      </button>
      {isOpen && (
        <ul>
          {options.map((option, index) => {
            if (option !== selected) {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelected(option);
                  }}
                >
                  {option}
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default Selector;

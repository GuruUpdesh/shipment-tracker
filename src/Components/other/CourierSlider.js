import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const CourierSlider = () => {
  const images = [
    "fedex",
    "dhl",
    "ups",
    "usps",
    
    "fedex",
    "dhl",
    "ups",
    "usps",
    "fedex",
    "dhl",
    "ups",
    "usps",
    "fedex",
    "dhl",
    "ups",
    "usps",
  ];
  return (
    <div className="courier-slider-container">
      <h3>supported couriers</h3>
      <div className="slider">

        <button className="control">
          <FaChevronLeft />
        </button>
      <div className="courier-images">
        {images.map((image, index) => {
          return <img src={`courier-images/${image}.png`} key={index} />;
        })}
      </div>
        <button className="control">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CourierSlider;

import React, { useState, useRef } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CourierSlider from "../Components/other/CourierSlider";
import { HiOutlineChevronRight } from "react-icons/hi";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <nav className="homepage-nav">
        <h3>shipmentracker</h3>
        <button
          className="btn-black"
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      </nav>
      <section className="hero">
        <div className="heroContainer">
          <div className="imageContainer">
            <img src="boxes/Small.png"></img>
            <img src="boxes/Middle.png"></img>
            <img src="boxes/Big.png"></img>
          </div>
          <h1>Tracking Made Simple</h1>
          <button onClick={() => {navigate("/packages")}}>
            get started it's <b>Free</b>
            <HiOutlineArrowNarrowRight />
          </button>
        </div>
      </section>
      <div className="hero-grid-section">
      <div className="description-container">
        <p>
          Shipment Tracker is a webbased solution for tracking all your packages
          in one centralized web app.
        </p>
        <button className="btn-black">
          <HiOutlineChevronRight />
        </button>
      </div>
      <CourierSlider />

      </div>
      <section className="footer">

      </section>
    </ main>
  );
};

export default HomePage;

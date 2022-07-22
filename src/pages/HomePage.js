import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CourierSlider from "../Components/other/CourierSlider";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { motion } from "framer-motion";
import ButtonBlack from "../Components/Core/ButtonBlack";
import ButtonMagnet from "../Components/Core/ButtonMagnet";
import PerspectiveWrapper from "../Components/Core/PerspectiveWrapper";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
		>
			<nav className="homepage-nav">
				<h3>shipmentracker</h3>
				{localStorage.getItem("id") ? (
					<ButtonBlack
						onClick={() => {
							navigate("/packages");
						}}
					>
						packages
					</ButtonBlack>
				) : (
					<ButtonBlack
						onClick={() => {
							navigate("/login");
						}}
					>
						login
					</ButtonBlack>
				)}
			</nav>
			<section className="hero">
				<div className="heroContainer">
					<div className="content-wrapper">
						<h1>Tracking Made Simple</h1>

						<ButtonMagnet
							onClick={() => {
								if (localStorage.getItem("id")) {
									navigate("/packages");
								} else {
									navigate("/register");
								}
							}}
						>
							{localStorage.getItem("id") ? (
								<>
									view your <b>packages</b>
								</>
							) : (
								<>
									get started it's <b>free</b>
								</>
							)}
							<HiOutlineArrowNarrowRight />
						</ButtonMagnet>
					</div>
					<MouseParallaxContainer inverted={true} useWindowMouseEvents={true} className="box-images-container">
						<MouseParallaxChild
							className="image-container"
							factorX={0.1}
							factorY={0.1}
							springConfig={{ stiffness: 20, damping: 3 }}
						>
							<img src={process.env.PUBLIC_URL + "/boxes/Small.png"}></img>
						</MouseParallaxChild>
						<MouseParallaxChild
							className="image-container"
							factorX={0.08}
							factorY={0.08}
							springConfig={{ stiffness: 30, damping: 4 }}
						>
							<img src={process.env.PUBLIC_URL + "/boxes/Middle.png"}></img>
						</MouseParallaxChild>
						<MouseParallaxChild
							className="image-container"
							factorX={0.02}
							factorY={0.05}
							springConfig={{ stiffness: 40, damping: 5 }}
						>
							<img src={process.env.PUBLIC_URL + "/boxes/Big.png"}></img>
						</MouseParallaxChild>
					</MouseParallaxContainer>
				</div>
			</section>
			<div className="hero-grid-section">
				<div className="description-container">
					<p>Shipment Tracker is a webbased solution for tracking all your packages in one centralized web app.</p>
					<button className="btn-black">
						<HiOutlineChevronRight />
					</button>
				</div>
				<CourierSlider />
			</div>
			<section className="footer">
				<div>
					<ul>
						<li className="title">Login & Register</li>
						<li>login</li>
						<li>register</li>
					</ul>
					<ul>
						<li className="title">tracking</li>
						<li>package tracker dashboard</li>
						<li>archived packages</li>
						<li>help</li>
					</ul>
				</div>
				<div>
					<div>
						<p>
							Contact me - email: guruupdeshsingh@gmail.com | github: https://github.com/GuruUpdesh | LinkedIn:
							https://linkedin.com/in/guru-updesh-singh-789050218/
						</p>
					</div>
					<div>
						<p>Copyright © 2022 Shipmentracker</p>
					</div>
				</div>
			</section>
		</motion.main>
	);
};

export default HomePage;

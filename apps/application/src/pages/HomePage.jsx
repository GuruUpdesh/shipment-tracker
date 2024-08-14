import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ButtonBlack from "../Components/Core/ButtonBlack";
import ButtonMagnet from "../Components/Core/ButtonMagnet";
import { MdAutoAwesomeMosaic, MdCloud, MdBolt  } from "react-icons/md";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: { duration: 0.2, ease: "easeInOut" },
			}}
			className="homepage-container"
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
			<main className="homepage-content">
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
						{/* <img
							className="hero-image"
							src={process.env.PUBLIC_URL + "/boxes.webp"}
							alt="boxes"
						/> */}
					</div>
				</section>
				<section className="supported-couriers">
					<h2>Supports the 4 major couriers</h2>
					<div className="courier-images">
						{/* <img
							className="courier-image"
							src={process.env.PUBLIC_URL + "/courier-images/ups.png"}
							alt="ups"
						/>
						<img
							className="courier-image"
							src={
								process.env.PUBLIC_URL + "/courier-images/usps.png"
							}
							alt="usps"
						/>
						<img
							className="courier-image"
							src={
								process.env.PUBLIC_URL + "/courier-images/fedex.png"
							}
							alt="fedex"
						/>
						<img
							className="courier-image"
							src={process.env.PUBLIC_URL + "/courier-images/dhl.png"}
							alt="dhl"
						/> */}
					</div>
				</section>
				<section className="cards">
					<h2>Built to be easy</h2>
					<div className="card-grid">
						<div className="card">
							<MdCloud fontSize={64} />
							<div className="spacer" />
							<h3>Cloud Based</h3>
							<p>
								Shipment Tracker is a solution for tracking all your
								packages in one centralized web app. All your
								packages sync across all your devices through the
								cloud.
							</p>
						</div>
						<div className="card">
							<MdAutoAwesomeMosaic  fontSize={64} />
							<div className="spacer" />
							<h3>Intuitive Interface</h3>
							<p>
								Shipment Tracker is designed to be easy to use. The
								intuitive interface allows you to track your packages
								with ease.
							</p>
						</div>
						<div className="card">
							<MdBolt    fontSize={64} />
							<div className="spacer" />
							<h3>Save time every week</h3>
							<p>
								Shipment Tracker is designed to save you time. No
								more checking multiple websites to track your
								packages. Shipment Tracker does it all for you.
							</p>
						</div>
					</div>
				</section>
				<footer className="footer">
					<div>
						<p>Copyright © 2024 Shipmentracker</p>
					</div>
				</footer>
			</main>

		</motion.main>
	);
};

export default HomePage;

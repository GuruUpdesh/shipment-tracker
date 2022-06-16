import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import StatusBar from "../other/StatusBar";
import { RiCloseFill, RiInboxArchiveLine } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { AiOutlineCheckSquare, AiOutlineDelete, AiOutlineSwap } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsArrowRight, BsCheck } from "react-icons/bs";

const InfoModal = ({ isOpen, setIsOpen, packageInfo, notify }) => {
	const ref = useRef();
	const { header, transitHistory } = packageInfo;

	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	// const [statusBar, setStatusBar] = useState({});

	// const calcStatusBar = () => {
	// 	const circleInfo = { shipped: false, transit: false, deliveryToday: false, delivered: false };

	// 	const historyLen = transitHistory.length;
	// 	for (let i = historyLen - 1; i > -1; i--) {
	// 		let cur = transitHistory[i];

	// 		if (!circleInfo.shipped) {
	// 			if (cur.primaryMessage.includes("Origin")) {
	// 				circleInfo.shipped = true;
	// 			}
	// 		}

	// 		if (!circleInfo.transit) {
	// 			if (
	// 				cur.primaryMessage.toLowerCase().includes("arrived") ||
	// 				cur.primaryMessage.toLowerCase().includes("departed")
	// 			) {
	// 				circleInfo.transit = true;
	// 			}
	// 		}
	// 		if(!circleInfo.deliveryToday) {
	// 			if (cur.primaryMessage.toLowerCase().includes("delivery")) {
	// 				circleInfo.deliveryToday = true;
	// 			}
	// 		}

	// 		if (!circleInfo.delivered) {
	// 			if (cur.primaryMessage.toLowerCase().includes("delivered")) {
	// 				circleInfo.delivered = true;
	// 			}
	// 		}

	// 		if (!circleInfo.shipped && (circleInfo.transit || circleInfo.arrived)) {
	// 			circleInfo.shipped = true;
	// 		}


	// 		if (!circleInfo.transit && circleInfo.arrived) {
	// 			circleInfo.transit = true;
	// 		}
	// 	}

	// 	let barPercentage = 0;
	// 	if (circleInfo.shipped) {
	// 		barPercentage = 50;
	// 	}
	// 	if (circleInfo.delivered) {
	// 		barPercentage = 100;
	// 	}

	// 	setStatusBar({ circleInfo: circleInfo, barPercentage: barPercentage });
	// };

	// useEffect(() => {
	// 	calcStatusBar();
	// }, []);

	const [imgIndex, setImgIndex] = useState(header.imgIndex)

	const cycleImgIndex = async () => {
		setImgIndex((imgIndex + 1) % header.photos.length)
	}

	return (
		<Modal>
			<div className="info-modal" ref={ref}>
				<div className="header">
					<button
						className="btn-close btn-black"
						onClick={() => {
							setIsOpen(false);
						}}
					>
						<RiCloseFill />
					</button>
					<div className="content-container">
						<GoPackage className="packageIcon" />
						<h1>{header.name}</h1>
						<p>{header.status.replace(".", "")}</p>
						<p>{"at " + header.time + " on " + header.date}</p>
					</div>
						<button
							className="btn-normal-text"
							onClick={() => {
								navigator.clipboard.writeText(header.trackingNumber);
								notify("copied to clipboard", 2000);
							}}
						>
							<FiCopy /> {header.trackingNumber}
						</button>
					<div className="background-container">
						<div
							className="background-image"
							style={{ backgroundImage: `url(${header.photos[imgIndex]})` }}
							key={imgIndex}
						></div>
						<div className="gradient"></div>
					</div>
				</div>
				<div className="controls">
					<button className="btn-black" onClick={cycleImgIndex}>
						{" "}
						<AiOutlineSwap />
						<span>change image</span>
					</button>
					<button className="btn-black">
						<AiOutlineCheckSquare />
						<span>mark as delivered</span>
					</button>
					<button className="btn-black">
						<RiInboxArchiveLine />
						<span>archive</span>
					</button>
					<button className="btn-black">
						<BiEdit />
						<span>edit</span>
					</button>
					<button className="btn-black">
						<AiOutlineDelete />
						<span>delete</span>
					</button>
				</div>
				<div className="transit-history">
					<h1>Transit History</h1>
					<StatusBar header={header} transitHistory={transitHistory}/>
					{/* <div className="status-bar-container">
						<div className="status-bar">
							<div className="circles">
								{statusBar?.circleInfo?.shipped ? (
									<div className="status-circle filled">
										<BsCheck />
									</div>
								) : (
									<div className="status-circle unfilled"></div>
								)}
								{statusBar?.circleInfo?.transit ? (
									<div className="status-circle filled">
										<BsCheck />
									</div>
								) : (
									<div className="status-circle unfilled"></div>
								)}
								{statusBar?.circleInfo?.delivered ? (
									<div className="status-circle filled">
										<BsCheck />
									</div>
								) : (
									<div className="status-circle unfilled"></div>
								)}
							</div>
							<div
								className="bar"
								style={{
									backgroundImage: `linear-gradient(90deg,
								var(--clr-primary-200) ${statusBar.barPercentage / 2 - 10}%,
								var(--clr-border-400) ${statusBar.barPercentage / 2}%,
								var(--clr-border-400) 49%,
								var(--clr-border-400) 50%
								`,
								}}
							/>
						</div>
						<div className="status-content">
							<p>Package Shipped</p>
							<p>Package in Transit</p>
							<p>Package Arrived</p>
						</div>
					</div> */}
					<button className="btn-close btn-black">
						{header.courier}.com <BsArrowRight />
					</button>
					<ul>
						{transitHistory.map((transitObject, index) => {
							return (
								<li key={index}>
									<h3>{transitObject.primaryMessage}</h3>
									<div>
										<p>
											{transitObject.location.city +
												", " +
												transitObject.location.state +
												", " +
												transitObject.location.country +
												" " +
												transitObject.location.zip}
										</p>
										<p>{transitObject.time}</p>
										<p>{transitObject.date}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</Modal>
	);
};

export default InfoModal;

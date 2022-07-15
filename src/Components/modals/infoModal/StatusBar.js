import React, { useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { FiTruck } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { MdToday } from "react-icons/md";

const StatusBar = ({ header, transitHistory }) => {
	const [statusBar, setStatusBar] = useState({});

	const calcStatusBar = () => {
		const circleInfo = { shipped: false, transit: false, deliveryToday: false, delivered: false };
		const timeInfo = { shipped: 0, transit: 0, deliveryToday: 0, delivered: 0 };
		let barPercentage = 0;

		const historyLen = transitHistory.length;
		for (let i = historyLen - 1; i > -1; i--) {
			let cur = transitHistory[i];
			let curLower = cur.primaryMessage.toLowerCase();
			let curStatus = header.status.toLowerCase();

			if (curLower.includes("origin") || curStatus.includes("shipped")) {
				if (!circleInfo.shipped) {
					timeInfo.shipped = new Date(cur.date + " " + cur.time);
				}
				circleInfo.shipped = true;
			}

			if (curLower.includes("arrived") || curLower.includes("departed") || curStatus.includes("transit")) {
				if (!circleInfo.transit) {
					timeInfo.transit = new Date(cur.date + " " + cur.time);
				}
				circleInfo.shipped = true;
				circleInfo.transit = true;
			}

			if (curLower.includes("delivery")) {
				if (!circleInfo.deliveryToday) {
					timeInfo.deliveryToday = new Date(cur.date + " " + cur.time);
				}
				circleInfo.shipped = true;
				circleInfo.transit = true;
				circleInfo.deliveryToday = true;
			}

			if (curLower.includes("delivered") || curStatus.includes("delivered")) {
				if (!circleInfo.delivered) {
					timeInfo.delivered = new Date(cur.date + " " + cur.time);
				}
				circleInfo.shipped = true;
				circleInfo.transit = true;
				circleInfo.deliveryToday = true;
				circleInfo.delivered = true;
			}
		}

		if (circleInfo.delivered) {
			barPercentage = 100;
			return { circleInfo, barPercentage };
		}
		if (circleInfo.shipped) {
			barPercentage = (25 - 0) / 2;
		}

		let transitDate = timeInfo.transit;
		let etaDate = new Date(header.eta);
		let now = new Date();
		let difference = (etaDate.getTime() - transitDate.getTime()) / (1000 * 3600 * 24);
		let nowDifference = (etaDate.getTime() - now.getTime()) / (1000 * 3600 * 24);

		if (circleInfo.transit) {
			barPercentage = 25 + 50 * (1 - nowDifference / difference);
		}

		let expectedBy = new Date();
		expectedBy.setHours(21);
		let hoursDifference = (expectedBy.getTime() - now.getTime()) / (1000 * 3600);
		if (circleInfo.deliveryToday) {
			barPercentage = 75 + 25 * ((21 - hoursDifference) / 21);
		}

		return { circleInfo, barPercentage };
	};

	useEffect(() => {
		setStatusBar(calcStatusBar());
	}, []);

	return (
		<div className="status-bar-container">
			{/* <h1>{statusBar.barPercentage}</h1> */}
			<div className="status-content flex-space-between">
				<p>Package Shipped</p>
				<p>Package in Transit</p>
				<p>Out for Delivery</p>
				<p>Package Arrived</p>
			</div>
			<div className="status-bar">
				<div
					className="bar"
					style={{
						backgroundImage: `linear-gradient(90deg,
                                        var(--clr-primary-200) ${statusBar.barPercentage / 2 -  5}%,
                                        var(--clr-border-400) ${statusBar.barPercentage / 2}%,
                                        var(--clr-border-400) 51%,
                                        var(--clr-border-400) 53%
                                        `,
                        }}
                    />
				<div className="circles">
					{statusBar?.circleInfo?.shipped ? (
						<div
							className="status-circle filled"
							style={{ animationDelay: `${1 - statusBar.barPercentage / 100}s` }}
						>
							<BsCheck />
						</div>
					) : (
						<div className="status-circle unfilled"></div>
					)}
					{statusBar?.circleInfo?.transit ? (
						<div
							className="status-circle filled"
							style={{ animationDelay: `${1 - statusBar.barPercentage / 100 + 0.33}s` }}
						>
							<BsCheck />
						</div>
					) : (
						<div className="status-circle unfilled"></div>
					)}
					{statusBar?.circleInfo?.deliveryToday ? (
						<div
							className="status-circle filled"
							style={{ animationDelay: `${1 - statusBar.barPercentage / 100 + 0.66}s` }}
						>
							<BsCheck />
						</div>
					) : (
						<div className="status-circle unfilled"></div>
					)}
					{statusBar?.circleInfo?.delivered ? (
						<div className="status-circle filled" style={{ animationDelay: `${0.99}s` }}>
							<BsCheck />
						</div>
					) : (
                        <div className="status-circle unfilled"></div>
                        )}
				</div>
			</div>
			<div className="status-icons flex-space-between">
				<div className="icon-container">
					<GoPackage className="icon" />
					{/* <BsFillArrowRightCircleFill className="small-icon" /> */}
				</div>
				<div className="icon-container">
					<FiTruck className="icon" />
				</div>
				<div className="icon-container">
					<MdToday className="icon" />
				</div>
				<div className="icon-container">
                        <AiOutlineHome className="icon" />
				</div>
			</div>
		</div>
	);
};

export default StatusBar;

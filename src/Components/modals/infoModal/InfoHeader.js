import React, { useState, useRef, useContext, useEffect } from "react";
import PackageMap from "../../Package/PackageMap";
import { RiCloseFill, RiInboxArchiveLine } from "react-icons/ri";
import { AiOutlineCheckSquare, AiOutlineDelete, AiOutlineSwap } from "react-icons/ai";
import { FiMap } from "react-icons/fi";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { UserContext } from "../../../App";

const InfoHeader = ({ header, transitHistory, setIsOpen, setIsConfirmOpen, setIsEditFormOpen }) => {
	const [imgIndex, setImgIndex] = useState(header.imgIndex);

	const cycleImgIndex = async () => {
		const index = (imgIndex + 1) % header.photos.length;

		const response = fetch("/api/update-img-index", {
			method: "POST",
			body: JSON.stringify({
				id: localStorage.getItem("id"),
				index: index,
				packageId: header.id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		header.imgIndex = index;
		setImgIndex(index);
	};

	const archive = async () => {
		const response = fetch("/api/update-archived", {
			method: "POST",
			body: JSON.stringify({
				id: localStorage.getItem("id"),
				packageId: header.id,
				isArchived: true,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const ref = useRef();

	const [mapToggle, setMapToggle] = useState(false);

	const { user } = useContext(UserContext);

	return (
		<div className={"header flex-center-column " + (mapToggle ? "map" : "")} ref={ref}>
			<button
				className="btn-black map-toggle"
				onClick={() => {
					setMapToggle(!mapToggle);
				}}
			>
				{mapToggle ? (
					<>
						<BiArrowBack />
						<span>details</span>
					</>
				) : (
					<>
						<FiMap />
						<span>map</span>
					</>
				)}
			</button>
			<button
				className="btn-close btn-black"
				onClick={() => {
					setIsOpen(false);
				}}
			>
				<RiCloseFill />
			</button>
			<div className={"content-container"}>
				<h1 className="title">{header.name}</h1>
				{header.eta && !header.status.includes("delivered") ? (
					<>
						<p>expected delivery</p>
						<p> {header.eta}</p>
					</>
				) : (
					<p>{header.status.replace(".", "") + " at " + header.time + " on " + header.date}</p>
				)}
			</div>
			{mapToggle ? (
				<PackageMap center={header.coordinates} drawLines={true} zoom={4} transitHistory={transitHistory} />
			) : (
				<>
					<MouseParallaxContainer useWindowMouseEvents={true} enabled={!user.isMobile}>
						<MouseParallaxChild factorX={0.01} factorY={0.02}>
							<div
								className="background-image"
								style={{ backgroundImage: `url(${header.photos[imgIndex]})`, left: 0, top: 0 }}
								key={imgIndex}
							></div>
							<div className="gradient"></div>
						</MouseParallaxChild>
					</MouseParallaxContainer>
					<div className="controls flex-evenly">
						<button className="btn-black" onClick={cycleImgIndex}>
							<AiOutlineSwap />
							<span>change image</span>
						</button>
						<button className="btn-black">
							<AiOutlineCheckSquare />
							<span>mark as delivered</span>
						</button>
						<button className="btn-black" onClick={archive}>
							<RiInboxArchiveLine />
							<span>archive</span>
						</button>
						<button
							className="btn-black"
							onClick={() => {
								setIsEditFormOpen(true);
								setIsOpen(false);
							}}
						>
							<BiEdit />
							<span>edit</span>
						</button>
						<button
							className="btn-black"
							onClick={() => {
								setIsConfirmOpen(true);
								setIsOpen(false);
							}}
						>
							<AiOutlineDelete />
							<span>delete</span>
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default InfoHeader;

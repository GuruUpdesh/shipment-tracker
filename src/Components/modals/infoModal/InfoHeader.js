import React, { useEffect, useState, useRef } from "react";
import PackageMap from "../../Package/PackageMap";
import { RiCloseFill, RiInboxArchiveLine } from "react-icons/ri";
import { AiOutlineCheckSquare, AiOutlineDelete, AiOutlineSwap } from "react-icons/ai";
import { FiMap } from "react-icons/fi";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import _ from "underscore";

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
				"x-access-token": `${localStorage.getItem("token")}`,
			},
		});
		header.imgIndex = index;
		setImgIndex(index);
	};

	const ref = useRef();

	const [mapToggle, setMapToggle] = useState(false);

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	return (
		<div
			className={"header " + (mapToggle ? "map" : "")}
			ref={ref}
			onMouseMove={(e) => {
				if (!ref.current || ref.current.contains(e.target)) {
					const bounds = ref.current.getBoundingClientRect();
					const curX = e.clientX - bounds.left;
					const curY = e.clientY - bounds.top;

					const tiles = 50
					if (x - curX > tiles || curX - x > tiles) {
						setX(curX)
					}
					if (y - curY > tiles/2 || curY - y > tiles/2) {
						setY(curY)
					}
				}
			}}
		>
			<div className="circleTest" style={{ top: y, left: x }}></div>
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
				{header.eta ? (
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
					<div className="background-container"> 
						<div
							className="background-image"
							style={{ backgroundImage: `url(${header.photos[imgIndex]})`, left: -x / 30, top: -y / 10 }}
							key={imgIndex}
						></div>
						<div className="gradient"></div>
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

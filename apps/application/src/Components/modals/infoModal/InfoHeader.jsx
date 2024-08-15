import React, { useState, useRef, useContext, useEffect } from "react";
import PackageMap from "../../Package/PackageMap";
import { RiCloseFill, RiInboxArchiveLine } from "react-icons/ri";
import {
	AiOutlineCheckSquare,
	AiOutlineDelete,
	AiOutlineSwap,
} from "react-icons/ai";
import { FiMap } from "react-icons/fi";
import { BiEdit, BiArrowBack } from "react-icons/bi";
import {
	MouseParallaxContainer,
	MouseParallaxChild,
} from "react-parallax-mouse";
import { UserContext } from "../../../App";

const InfoHeader = ({
	header,
	transitHistory,
	setIsOpen,
	setIsConfirmOpen,
	setIsEditFormOpen,
	mapToggle,
	setMapToggle,
}) => {
	const [imgIndex, setImgIndex] = useState(header.imgIndex);

	const cycleImgIndex = async () => {
		const index = (imgIndex + 1) % header.photos.length;

		const response = fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/update-img-index`,
			{
				credentials: "include",
				method: "POST",
				body: JSON.stringify({
					id: localStorage.getItem("id"),
					index: index,
					packageId: header.id,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);
		header.imgIndex = index;
		setImgIndex(index);
	};

	const archive = async () => {
		const response = fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/update-archived`,
			{
				credentials: "include",
				method: "POST",
				body: JSON.stringify({
					id: localStorage.getItem("id"),
					packageId: header.id,
					isArchived: true,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);
	};

	useEffect(() => {
		const handleShortCut = async (event) => {
			//delete
			if (event.keyCode === 88 && event.shiftKey) {
				setIsConfirmOpen(true);
				setIsOpen(false);
			}

			//edit
			if (event.keyCode === 69 && event.shiftKey) {
				setIsEditFormOpen(true);
				setIsOpen(false);

				const selected = await window.getSelection();
				if (selected.focusNode.className.includes("input")) {
					event.preventDefault();
				}
			}

			// archive

			// mark as delivered

			// change image
			if (event.keyCode === 73 && event.shiftKey) {
				cycleImgIndex();
			}
		};

		window.addEventListener("keydown", handleShortCut);

		return () => {
			window.removeEventListener("keydown", handleShortCut);
		};
	});

	const ref = useRef();

	const { user } = useContext(UserContext);

	return (
		<div
			className={"header flex-center-column " + (mapToggle ? "map" : "")}
			ref={ref}
		>
			<button
				className="btn-black map-toggle"
				onClick={() => {
					setMapToggle(!mapToggle);
				}}
			>
				{mapToggle ? (
					<>
						<BiArrowBack />
						<span>Details</span>
					</>
				) : (
					<>
						<FiMap />
						<span>Map</span>
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
					<p>
						{header.status.replace(".", "") +
							" at " +
							header.time +
							" on " +
							header.date}
					</p>
				)}
			</div>
			{mapToggle ? (
				<PackageMap
					center={header.coordinates}
					drawLines={true}
					zoom={4}
					transitHistory={transitHistory}
				/>
			) : (
				<>
					<MouseParallaxContainer
						useWindowMouseEvents={true}
						enabled={!user.isMobile}
					>
						<MouseParallaxChild factorX={0.01} factorY={0.02}>
							<div
								className="background-image"
								style={{
									backgroundImage: `url(${header.photos[imgIndex]})`,
									left: 0,
									top: 0,
								}}
								key={imgIndex}
							></div>
							<div className="gradient"></div>
						</MouseParallaxChild>
					</MouseParallaxContainer>
					<div className="controls flex-evenly">
						<button className="btn-black" onClick={cycleImgIndex}>
							<AiOutlineSwap />
							<span>
								Swap Image<p>shift + i</p>
							</span>
						</button>
						{/* <button className="btn-black">
							<AiOutlineCheckSquare />
							<span>
								Mark Delivered<p>shift + d</p>
							</span>
						</button> */}
						<button className="btn-black" onClick={archive}>
							<RiInboxArchiveLine />
							<span>
								Archive<p>shift + a</p>
							</span>
						</button>
						<button
							className="btn-black"
							onClick={() => {
								setIsEditFormOpen(true);
								setIsOpen(false);
							}}
						>
							<BiEdit />
							<span>
								Edit<p>shift + e</p>
							</span>
						</button>
						<button
							className="btn-black"
							onClick={() => {
								setIsConfirmOpen(true);
								setIsOpen(false);
							}}
						>
							<AiOutlineDelete />
							<span>
								Delete <p>shift + x</p>
							</span>
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default InfoHeader;

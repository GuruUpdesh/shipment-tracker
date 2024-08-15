import React, { useRef, useState, useEffect } from "react";
import Modal from "../Modal";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import StatusBar from "./StatusBar";
import { FiExternalLink } from "react-icons/fi";
import InfoHeader from "./InfoHeader";
import { getTrackingUrl } from "tracking-number-validation";
import HelpIcon from "../../other/HelpIcon";
import notify from "../../../util/notify";

const InfoModal = ({
	isOpen,
	setIsOpen,
	packageInfo,
	setIsConfirmOpen,
	setIsEditFormOpen,
}) => {
	const ref = useRef();
	const { header, transitHistory } = packageInfo;

	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	function getCourierLink() {
		const link = getTrackingUrl(header.trackingNumber, header.courier);
		window.open(link, "_blank").focus();
	}

	// header state change on scroll pos
	const [headerShrink, setHeaderShrink] = useState(false);

	const [scrollPos, setScrollPos] = useState(0);
	const onScroll = (e) => {
		setScrollPos(e.target.scrollTop);
	};

	useEffect(() => {
		if (scrollPos < 25) {
			setHeaderShrink(false);
		} else {
			setHeaderShrink(true);
		}
	}, [scrollPos]);

	const [mapToggle, setMapToggle] = useState(false);

	return (
		<Modal key={packageInfo.header.id}>
			<div className="info-modal" ref={ref}>
				<InfoHeader
					header={header}
					transitHistory={transitHistory}
					setIsOpen={setIsOpen}
					setIsConfirmOpen={setIsConfirmOpen}
					setIsEditFormOpen={setIsEditFormOpen}
					mapToggle={mapToggle}
					setMapToggle={setMapToggle}
				/>
				<div
					className="transit-history"
					onMouseEnter={() => {
						if (scrollPos > 25) {
							setHeaderShrink(true);
						}
					}}
					onMouseLeave={() => setHeaderShrink(false)}
					onScroll={onScroll}
				>
					<h1>Transit History</h1>
					<div className="transit-sub-content">
						<HelpIcon
							message={
								"We do not guarantee the accuracy of this information. For more up to date data visit the couriers directly."
							}
							direction={"left"}
						/>
						<button
							className="btn-normal-text"
							onClick={() => {
								navigator.clipboard.writeText(
									header.trackingNumber
								);
								notify("copied to clipboard", 2000, "success");
							}}
						>
							{header.trackingNumber}
						</button>
					</div>
					<StatusBar
						header={header}
						transitHistory={transitHistory}
					/>
					<button
						className="btn-close btn-black"
						onClick={getCourierLink}
					>
						{header.courier}.com <FiExternalLink />
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

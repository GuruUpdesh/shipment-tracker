import React, { useRef } from "react";
import Modal from "../Modal";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import StatusBar from "./StatusBar";
import { FiCopy } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import InfoHeader from "./InfoHeader";
import { getTrackingUrl } from "tracking-number-validation";

const InfoModal = ({ isOpen, setIsOpen, packageInfo, notify, setIsConfirmOpen, setIsEditFormOpen }) => {
	const ref = useRef();
	const { header, transitHistory } = packageInfo;

	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	function getCourierLink() {
		const link = getTrackingUrl(header.trackingNumber, header.courier);
		window.open(link, "_blank").focus()
	}

	return (
		<Modal>
			<div className="info-modal" ref={ref}>
				<InfoHeader header={header} transitHistory={transitHistory} setIsOpen={setIsOpen} setIsConfirmOpen={setIsConfirmOpen} setIsEditFormOpen={setIsEditFormOpen}/>
				<div className="transit-history">
					<h1>Transit History</h1>
					{/* <button
						className="btn-normal-text"
						onClick={() => {
							navigator.clipboard.writeText(header.trackingNumber);
							notify("copied to clipboard", 2000);
						}}
					>
						<FiCopy /> {header.trackingNumber}
					</button> */}
					<StatusBar header={header} transitHistory={transitHistory} />
					<button
						className="btn-close btn-black"
						onClick={getCourierLink}
					>
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

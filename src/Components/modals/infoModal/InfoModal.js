import React, { useRef } from "react";
import Modal from "../Modal";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import StatusBar from "./StatusBar";
import { FiCopy } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import InfoHeader from "./InfoHeader";
import { getTrackingUrl } from "tracking-number-validation";
import HelpIcon from "../../other/HelpIcon";

const InfoModal = ({ isOpen, setIsOpen, packageInfo, notify, setIsConfirmOpen, setIsEditFormOpen }) => {
	const ref = useRef();
	const { header, transitHistory } = packageInfo;

	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	function getCourierLink() {
		const link = getTrackingUrl(header.trackingNumber, header.courier);
		window.open(link, "_blank").focus();
	}

	return (
		<Modal>
			<div className="info-modal" ref={ref}>
				<InfoHeader
					header={header}
					transitHistory={transitHistory}
					setIsOpen={setIsOpen}
					setIsConfirmOpen={setIsConfirmOpen}
					setIsEditFormOpen={setIsEditFormOpen}
				/>
				<div className="transit-history">
					<h1>Transit History</h1>
					<div className="transit-sub-content">
						<HelpIcon
							message={
								"We use a basic algorithm to guess where your package is in its journey. We do not guarantee the accuracy of this information. For more up to date information visit the couriers tracking page directly by clicking the button below."
							}
							direction={'left'}
						/>
						<button
							className="btn-normal-text"
							onClick={() => {
								navigator.clipboard.writeText(header.trackingNumber);
								notify("copied to clipboard", 2000, "success");
							}}
						>
							{header.trackingNumber}
						</button>
					</div>
					<StatusBar header={header} transitHistory={transitHistory} />
					<button className="btn-close btn-black" onClick={getCourierLink}>
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

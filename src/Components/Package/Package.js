import React, { useState, useEffect } from "react";
import PackageMap from "./PackageMap";
import { InView } from "react-intersection-observer";
import { BsTruck } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";

const Package = ({ packageInfo, setCurrentInfo, setIsInfoModalOpen }) => {
	return (
		<InView>
			{({ inView, ref, entry }) => (
				<div
					className={"package-container "}
					ref={ref}
					onClick={() => {
						setCurrentInfo(packageInfo);
						setIsInfoModalOpen(true)
					}}
				>
					<div className={"package-header " + (inView ? "" : "display-none")}>
						<div
							className="package-img"
							style={{
								backgroundImage: `url(${packageInfo.header.photos[0]})`,
							}}
						></div>
						<div className="content-wrapper">
							<h3 className="package-name">{packageInfo.header.name}</h3>
							<p className="package-status">{packageInfo.header.status}</p>
						</div>
					</div>
					<div className="marker"></div>
					<PackageMap center={packageInfo.header.coordinates} />
					<div className="bottom-right-indicators">
						{(packageInfo.header.eta || packageInfo.header.status.includes("transit")) && (
							<div className="indicator">
								<BsTruck />
							</div>
						)}
						{/* <div className="indicator">
							<AiOutlineWarning />
						</div> */}

						{packageInfo.header.eta && <div className="indicator">{packageInfo.header.eta}</div>}
					</div>
				</div>
			)}
		</InView>
	);
};

export default Package;

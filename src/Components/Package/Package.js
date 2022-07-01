import React, { useState, useEffect } from "react";
import PackageMap from "./PackageMap";
import { InView } from "react-intersection-observer";
import { BsTruck } from "react-icons/bs";
import { AiOutlineWarning, AiOutlineHome } from "react-icons/ai";

const Package = ({ packageInfo, setCurrentInfo, setIsInfoModalOpen }) => {
	return !packageInfo.inCurrentBlock ? (
		<></>
	) : packageInfo.error ? (
		<div className="package-container error-package-container">
			<div className="package-header">
				<div className="content-wrapper">
					<h3 className="package-name">
						<AiOutlineWarning />
						can't load {packageInfo.name}
					</h3>
					<p className="status">{packageInfo.errorMessage}</p>
				</div>
			</div>
		</div>
	) : packageInfo.loading ? (
		<div className="package-loading-container" />
	) : (
		<InView>
			{({ inView, ref, entry }) => (
				<div
					className={"package-container "}
					ref={ref}
					onClick={() => {
						setCurrentInfo(packageInfo);
						setIsInfoModalOpen(true);
					}}
				>
					<div className={"package-header " + (inView ? "" : "display-none")}>
						<div
							className="package-img"
							style={{
								backgroundImage: `url(${packageInfo.header.photos[packageInfo.header.imgIndex]})`,
							}}
						></div>
						<div className="content-wrapper">
							<h3 className="package-name">{packageInfo.header.name}</h3>
							<p className="package-status">{packageInfo.header.status}</p>
						</div>
					</div>
					<div className="marker"></div>
					<PackageMap center={packageInfo.header.coordinates} zoom={10} />
					<div className={"bottom-right-indicators " + (inView ? "" : "display-none")}>
						{packageInfo.header.eta && packageInfo.header.status.includes("transit") && (
							<div className="indicator">
								<BsTruck />
							</div>
						)}
						{packageInfo.header.status.includes("delivered") && (
							<div className="indicator">
								<AiOutlineHome />
							</div>
						)}

						{packageInfo.header.eta && !packageInfo.header.status.includes("deliver") && (
							<div className="indicator">{packageInfo.header.eta}</div>
						)}
					</div>
				</div>
			)}
		</InView>
	);
};

export default Package;

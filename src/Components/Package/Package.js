import React, { useState, useEffect } from "react";
import PackageMap from "./PackageMap";
import { InView } from "react-intersection-observer";
import { BsTruck } from "react-icons/bs";
import { AiOutlineWarning, AiOutlineHome } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ButtonBlack from "../Core/ButtonBlack";
import { BiUndo } from "react-icons/bi";

const Package = ({ packageInfo, setCurrentInfo, setIsInfoModalOpen, isArchive, notify, packagesRef }) => {
	async function deletePackageWithError() {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/delete`, {
			credentials: "include",
			method: "DELETE",
			body: JSON.stringify({
				id: localStorage.getItem("id"),
				trackingNumber: packageInfo.trackingNumber,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200 ) {

			//todo add index to error package
			packagesRef.current.removePackage(packageInfo.index)
			notify(`deleted ${packageInfo.name}`)
		}
	}

	function copyInfo() {
		navigator.clipboard.writeText(JSON.stringify({name: packageInfo.name, trackingNumber: packageInfo.trackingNumber, courier: packageInfo.courier}));
	}

	return !packageInfo.inCurrentBlock ? (
		<>not in block</>
	) : packageInfo.error ? (
		<div className="package-container error-package-container">
			<div className="package-header">
				<div className="content-wrapper">
					<h3 className="package-name">
						<AiOutlineWarning />
						can't load {packageInfo.name}
					</h3>
					<p className="status">{packageInfo.errorMessage}</p>
					<div className="buttons">
						<ButtonBlack onClick={deletePackageWithError}>delete</ButtonBlack>
						<ButtonBlack onClick={copyInfo}>copy info</ButtonBlack>
					</div>
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
						if (!isArchive) {
							setCurrentInfo(packageInfo);
							setIsInfoModalOpen(true);
						}
					}}
				>
					<div className={"package-header "}>
						{!isArchive && (
							<div
								className="package-img"
								style={{
									backgroundImage: `url(${packageInfo.header.photos[packageInfo.header.imgIndex]})`,
								}}
							></div>
						)}
						<div className="content-container">
							<div className="content-wrapper">
								<h3 className="package-name">{isArchive ? packageInfo.name : packageInfo.header.name}</h3>
								<p className="package-status">
									{isArchive ? packageInfo.trackingNumber : packageInfo.header.status}
								</p>
							</div>
							<HiOutlineArrowNarrowRight />
						</div>
						{isArchive && (
							<ButtonBlack>
								<BiUndo />
								<span>unarchive</span>
							</ButtonBlack>
						)}
					</div>
					{!isArchive && (
						<>
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
						</>
					)}
				</div>
			)}
		</InView>
	);
};

export default Package;

import React, { useEffect, useRef, useState } from "react";
import { MdSettings } from "react-icons/md";
import { BsFillArchiveFill } from "react-icons/bs";
import { GoPackage } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";
import { RiCloseFill } from "react-icons/ri";
import Fuse from "fuse.js";
import ButtonBlack from "../Core/ButtonBlack";
import { useNavigate } from "react-router-dom";

const MainNav = ({ setIsAddFormOpen, packagesRef, isArchive }) => {
	const navigate = useNavigate();
	const [settingsOpen, setSettingsOpen] = useState(false);
	function toggleSettingsMenu() {
		setSettingsOpen(!settingsOpen);
	}

	function search(value) {
		console.log(packagesRef);
		if (value === "") {
			return [];
		}
		const fuse = new Fuse(packagesRef.current.packageList, { keys: isArchive ? ["name"] : ["header.name"] });
		const result = fuse.search(value);
		const newPackages = [];
		for (let i = 0; i < result.length; i++) {
			newPackages.push(result[i].item);
		}
		return newPackages;
	}

	const [searchValue, setSearchValue] = useState("");
	function searchHandler(value) {
		setSearchValue(value);
		if (value === "") {
			packagesRef.current.resetPackages();
			return;
		}
		packagesRef.current.packageSearch(search(value));
	}

	return (
		<nav className="main-nav flex-space-between  site-padding">
			{settingsOpen && <Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />}
			<div>
				<ButtonBlack className="btn-settings" onClick={toggleSettingsMenu}>
					<MdSettings />
					<span>settings</span>
				</ButtonBlack>
				{isArchive ? (
					<ButtonBlack
						onClick={() => {
							navigate("/packages");
						}}
					>
						<GoPackage />
						<span>packages</span>
					</ButtonBlack>
				) : (
					<ButtonBlack
						onClick={() => {
							navigate("/archive");
						}}
					>
						<BsFillArchiveFill />
						<span>archive</span>
					</ButtonBlack>
				)}
			</div>
			<div>
				<div className="search ">
					<input
						className="search-input"
						value={searchValue}
						placeholder="search"
						type="text"
						onChange={(e) => searchHandler(e.target.value)}
					/>
					<div className="search-icon">
						<IoSearch />
					</div>
					{searchValue.length > 2 && (
						<div
							className="clear-icon"
							tabIndex={-1}
							onClick={() => {
								searchHandler("");
							}}
						>
							<RiCloseFill />
						</div>
					)}
				</div>
				{/* <Filter /> */}
			</div>
			<div>
				<ButtonBlack
					className="btn-add"
					onClick={() => {
						setIsAddFormOpen(true);
					}}
				>
					<BiPlus />
					<span>
						add <p>{"(shift + a)"}</p>
					</span>
				</ButtonBlack>
			</div>
		</nav>
	);
};

export default MainNav;

import React, { useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";
import { BsFillArchiveFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";
import { RiCloseFill } from "react-icons/ri";
import Fuse from "fuse.js";
import ButtonBlack from "../ButtonBlack";

const MainNav = ({ setIsAddFormOpen, packagesRef }) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	function toggleSettingsMenu() {
		setSettingsOpen(!settingsOpen);
	}

	const { isClearButton, setIsClearButton } = useState(false);
	function search(value) {
		console.log(packagesRef);
		if (value === "") {
			return [];
		}
		const fuse = new Fuse(packagesRef.current.packageList, { keys: ["header.name"] });
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
				<ButtonBlack>
					<BsFillArchiveFill />
					<span>archive</span>
				</ButtonBlack>
			</div>
			<div>
				<div className="search ">
					<input
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
					<span>add</span>
				</ButtonBlack>
			</div>
		</nav>
	);
};

export default MainNav;

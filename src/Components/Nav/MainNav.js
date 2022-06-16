import React, { useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";
import { BsFillArchiveFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import Settings from "./Settings";
import Filter from "./Filter";
import Fuse from "fuse.js";

const MainNav = ({ packages, setFilteredPackages, setIsAddFormOpen }) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	function toggleSettingsMenu() {
		setSettingsOpen(!settingsOpen);
	}

	function search(value) {
		if (value === "") {
			return [];
		}
		const fuse = new Fuse(packages, { keys: ["header.name"] });
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
			setFilteredPackages(packages);
			return;
		}
		setFilteredPackages(search(value));
	}

	return (
		<nav className='main-nav flex-space-between  site-padding'>
			{settingsOpen && (
				<Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
			)}
			<div>
				<button onClick={toggleSettingsMenu} className='btn-highlight btn-settings'>
					<MdSettings />
					<span>settings</span>
				</button>
				<button className='btn-highlight'>
					<BsFillArchiveFill />
					<span>archive</span>
				</button>
			</div>
			<div>
				<div className='search '>
					<input
						value={searchValue}
						placeholder='search'
						type='text'
						onChange={(e) => searchHandler(e.target.value)}
					/>
					<div className='search-icon'>
						<IoSearch />
					</div>
				</div>
				<Filter />
			</div>
			<div>
				<button className='btn-add btn-highlight' onClick={() => {setIsAddFormOpen(true)}}>
					<BiPlus />
					<span>add</span>
				</button>
			</div>
		</nav>
	);
};

export default MainNav;

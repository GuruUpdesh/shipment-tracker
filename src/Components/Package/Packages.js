import React, { useEffect, useLayoutEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import Package from "./Package";
import { BiPlus } from "react-icons/bi";

const Packages = forwardRef((props, ref) => {
	const loadBlock = 20;
	const packagesList = useRef([]);

	const [filteredPackages, setFilteredPackages] = useState([]);
	const [loadingBlockIndex, setLoadingBlockIndex] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (loadingBlockIndex > 0) {
			loadPackages(loadingBlockIndex);
		}
	}, [loadingBlockIndex]);

	useLayoutEffect(() => {
		fetchPackages();
	}, []);

	async function fetchPackages() {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/packages-data`, {
			method: "POST",
			body: JSON.stringify({
				email: localStorage.getItem("email"),
				id: localStorage.getItem("id"),
				archive: props.isArchive ? true : false,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status !== 200) {
			return;
		}

		const jsonResponse = await response.json();
		packagesList.current = jsonResponse;
		if (props.isArchive) {
			for (let i = 0; i < packagesList.current.length; i++) {
				packagesList.current[i].inCurrentBlock = true
				packagesList.current[i].error = false
				packagesList.current[i].loading = false
			}
			console.log("settings filtered packages", packagesList.current)
			setFilteredPackages(packagesList.current);
			return
		}
		loadPackages(0);
	}

	function loadPackages(loadingIndex) {
		for (let i = 0; i < packagesList.current.length; i++) {
			if (!packagesList.current[i].inCurrentBlock) {
				packagesList.current[i].loading = true;
				packagesList.current[i].error = false;
				packagesList.current[i].inCurrentBlock = false;
			}
		}
		// we want to load packages in groups of 20
		for (let i = loadingIndex * loadBlock; i < loadingIndex * loadBlock + loadBlock; i++) {
			if (i < packagesList.current.length) {
				packagesList.current[i].inCurrentBlock = true;
				loadPackage(packagesList.current[i]._id, i);
			}
		}

		setFilteredPackages(packagesList.current);
	}

	async function loadPackage(id, index) {
		if (index === packagesList.current.length - 1) {
			setIsLoaded(true);
		}
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/package-tracking-data`, {
			method: "POST",
			body: JSON.stringify({
				packageId: id,
				id: localStorage.getItem("id"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		if (response.status !== 200) {
			packagesList.current[index].errorMessage = data.message;
			packagesList.current[index].error = true;
			setFilteredPackages([...packagesList.current]);
			return;
		}
		data.loading = false;
		data.inCurrentBlock = true;
		data.header.index = index;
		packagesList.current[index] = data;
		setFilteredPackages([...packagesList.current]);
	}

	useImperativeHandle(ref, () => ({
		packageList: packagesList.current,
		packageSearch(searchResults) {
			setFilteredPackages(searchResults);
		},
		resetPackages() {
			setFilteredPackages(packagesList.current);
		},
		reloadPackage(index) {
			packagesList.current[index].loading = true;
			setFilteredPackages(packagesList.current);
			loadPackage(packagesList.current[index].header.id, index);
		},
		removePackage(index) {
			for (let i = index + 1; i < packagesList.current.length; i++) {
				packagesList.current[i].header.index = packagesList.current[i].header.index - 1;
			}
			packagesList.current.splice(index, 1);
			setFilteredPackages(packagesList.current);
		},
		addLoadingPackage(packageData) {
			for (let i = 0; i < packagesList.current.length; i++) {
				packagesList.current[i].header.index = packagesList.current[i].header.index + 1;
			}
			packageData.loading = true;
			packageData.currentBlock = true;
			packagesList.current.unshift(packageData);
			setFilteredPackages([...packagesList.current]);
			loadPackage(packageData._id, 0);
		},
	}));

	const packageWrapperRef = useRef();

	return (
		<div className="package-wrapper" ref={packageWrapperRef}>
			{props.isArchive && <h1>Archive</h1>}
			<div className="grid-3row-layout">
				{filteredPackages.map((currentPackage, index) => {
					return (
						<Package
							packageInfo={currentPackage}
							setCurrentInfo={props.setCurrentInfo}
							setIsInfoModalOpen={props.setIsInfoModalOpen}
							key={index}
							isArchive={props.isArchive}
						/>
					);
				})}
				{(isLoaded && !props.isArchive) && (
					<button
						onClick={() => {
							props.setIsAddFormOpen(true);
						}}
						className="package-add-btn"
					>
						<BiPlus />
					</button>
				)}
				{(!isLoaded && !props.isArchive) && (
					<button
						className="btn-normal-text"
						onClick={() => {
							if ((loadingBlockIndex + 1) * loadBlock < packagesList.current.length) {
								setLoadingBlockIndex(loadingBlockIndex + 1);
							}
						}}
					>
						load more
					</button>
				)}
			</div>
		</div>
	);
});

export default Packages;

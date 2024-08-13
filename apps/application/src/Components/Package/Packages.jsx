import React, {
	useEffect,
	useLayoutEffect,
	useState,
	useRef,
	forwardRef,
	useImperativeHandle,
} from "react";
import Package from "./Package";
import { BiPlus } from "react-icons/bi";
import { UserContext } from "../../App";
import ButtonText from "../Core/ButtonText";
import useMouse from "@react-hook/mouse-position";

const Packages = forwardRef((props, ref) => {
	const packagesList = useRef([]);

	const [filteredPackages, setFilteredPackages] = useState([]);
	const [finishedLoading, setFinishedLoading] = useState(false);
	const [startedLoading, setStartedLoading] = useState(false);

	useLayoutEffect(() => {
		fetchPackages();
	}, []);

	async function fetchPackages() {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/packages-data`,
			{
				credentials: "include",
				method: "POST",
				body: JSON.stringify({
					email: localStorage.getItem("email"),
					id: localStorage.getItem("id"),
					archive: props.isArchive ? true : false,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

		if (response.status !== 200) {
			return;
		}

		setStartedLoading(true);
		const jsonResponse = await response.json();
		packagesList.current = jsonResponse;
		if (props.isArchive) {
			for (let i = 0; i < packagesList.current.length; i++) {
				packagesList.current[i].inCurrentBlock = true;
				packagesList.current[i].error = false;
				packagesList.current[i].loading = false;
			}
			setFilteredPackages(packagesList.current);
			return;
		}
		loadPackages();
	}

	function loadPackages() {
		for (let i = 0; i < packagesList.current.length; i++) {
			if (!packagesList.current[i].inCurrentBlock) {
				packagesList.current[i].loading = true;
				packagesList.current[i].error = false;
				packagesList.current[i].inCurrentBlock = true;
				loadPackage(packagesList.current[i]._id, i);
			}
		}

		setFilteredPackages(packagesList.current);
	}

	async function loadPackage(id, index) {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/package-tracking-data`,
			{
				credentials: "include",
				method: "POST",
				body: JSON.stringify({
					packageId: id,
					id: localStorage.getItem("id"),
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

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
			console.log("remove package", index);
			for (let i = index + 1; i < packagesList.current.length; i++) {
				packagesList.current[i].header.index =
					packagesList.current[i].header.index - 1;
			}
			packagesList.current.splice(index, 1);
			setFilteredPackages(packagesList.current);
		},
		addLoadingPackage(packageData) {
			console.log(packageData);
			for (let i = 0; i < packagesList.current.length; i++) {
				packagesList.current[i].header.index =
					packagesList.current[i].header.index + 1;
			}
			packageData.loading = true;
			packageData.inCurrentBlock = true;
			packagesList.current.unshift(packageData);
			setFilteredPackages([...packagesList.current]);
			loadPackage(packageData._id, 0);
		},
		finishedLoading() {
			setFinishedLoading(true);
		},
	}));

	const packageWrapperRef = useRef();

	const mouse = useMouse(packageWrapperRef, { fps: 60 });

	return (
		<>
			<div className="package-wrapper" ref={packageWrapperRef}>
				{/* {props.isArchive && <h1>Archive</h1>} */}
				{startedLoading && filteredPackages.length !== 0 && (
					<div className="grid-3row-layout">
						{filteredPackages.map((currentPackage, index) => {
							return (
								<Package
									packageInfo={currentPackage}
									setCurrentInfo={props.setCurrentInfo}
									setIsInfoModalOpen={
										props.setIsInfoModalOpen
									}
									key={index}
									isArchive={props.isArchive}
									packagesRef={ref}
									mouse={mouse}
								/>
							);
						})}
						{finishedLoading && !props.isArchive && (
							<button
								onClick={() => {
									props.setIsAddFormOpen(true);
								}}
								className="package-add-btn"
							>
								<BiPlus />
							</button>
						)}
					</div>
				)}
				{!startedLoading && (
					<div className="package-message">
						<p>
							fetching package information {`${startedLoading}`}
						</p>
					</div>
				)}
				{filteredPackages.length === 0 &&
					startedLoading &&
					filteredPackages === packagesList.current && (
						<div className="package-message">
							<div className="content-container">
								<h3>welcome to shipmentracker</h3>
								<p className="sub">to get started simply</p>
								<ButtonText>add a package</ButtonText>
								<p className="or">or</p>
								<p className="sub">
									if this is your first time
								</p>
								<ButtonText>take a tour</ButtonText>
							</div>
						</div>
					)}
				{filteredPackages.length === 0 &&
					filteredPackages.length !== packagesList.current.length && (
						<div className="package-message">
							<p>can not find anything matching that search</p>
						</div>
					)}
			</div>
		</>
	);
});

export default React.memo(Packages);

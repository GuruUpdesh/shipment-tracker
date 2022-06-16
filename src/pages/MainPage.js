import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import Package from "../Components/Package/Package";
import AddForm from "../Components/modals/AddForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiPlus } from "react-icons/bi";
import InfoModal from "../Components/modals/InfoModal";

const MainPage = () => {
	const [packages, setPackages] = useState([]);
	const packagesRef = useRef([]);

	const [filteredPackages, setFilteredPackages] = useState(packages);
	useEffect(() => {
		setFilteredPackages(packages);
	}, [packages]);

	// on load
	useEffect(() => {
		packagesRef.current = [];
		loadPackages();
	}, []);

	const loadPackages = async () => {
		const response = await fetch("/api/packages-data", {
			method: "POST",
			body: JSON.stringify({ email: "guruupdeshsingh@gmail.com" }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status !== 200) {
			return;
		}

		const jsonResponse = await response.json();
		const packages = jsonResponse;

		for (let i = 0; i < packages.length; i++) {
			loadPackage(packages[i]._id, i);
			packages[i].state = "loading";
		}
		packagesRef.current = packages;
		setPackages(packages);
	};

	const loadPackage = async (id, index) => {
		await fetch("/api/package-tracking-data", {
			method: "POST",
			body: JSON.stringify({ id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			response.json().then((data) => {
				console.log(data);
				const copy = [...packagesRef.current];
				copy[index] = data;
				packagesRef.current = copy;
				setPackages(packagesRef.current);
			});
		});
	};

	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [currentInfo, setCurrentInfo] = useState({});

	const notify = (message, duration) =>
		toast.success(message, {
			position: "bottom-center",
			autoClose: duration,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
		});

	return (
		<MainLayout
			className={"site-padding"}
			packages={packages}
			setFilteredPackages={setFilteredPackages}
			setIsAddFormOpen={setIsAddFormOpen}
			overflowState={isAddFormOpen || isInfoModalOpen}
		>
			<>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable
				/>
				<div className="package-wrapper">
					<div className="grid-3row-layout">
						{filteredPackages.map((object, index) => {
							if (object?.state) {
								return <div className={"package-loading-container"} key={index}></div>;
							} else {
								return <Package packageInfo={object} setCurrentInfo={setCurrentInfo} setIsInfoModalOpen={setIsInfoModalOpen} key={index} />;
							}
						})}
						<button
							onClick={() => {
								// notify("test");
								setIsAddFormOpen(true);
							}}
							className="package-add-btn"
						>
							<BiPlus />
						</button>
					</div>
				</div>
				{isAddFormOpen && <AddForm isOpen={isAddFormOpen} setIsOpen={setIsAddFormOpen} />}
				{isInfoModalOpen && <InfoModal isOpen={isInfoModalOpen} setIsOpen={setIsInfoModalOpen} packageInfo={currentInfo} notify={notify}/>}
			</>
		</MainLayout>
	);
};

export default MainPage;

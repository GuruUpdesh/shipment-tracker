import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import Package from "../Components/Package/Package";
import AddForm from "../Components/modals/AddForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiPlus } from "react-icons/bi";
import InfoModal from "../Components/modals/infoModal/InfoModal";
import { useNavigate } from "react-router-dom";
import Confirm from "../Components/modals/Confirm";
import EditForm from "../Components/modals/EditForm";

const MainPage = () => {
	const navigate = useNavigate();
	const [packages, setPackages] = useState([]);
	const packagesRef = useRef([]);

	const [filteredPackages, setFilteredPackages] = useState(packages);
	useEffect(() => {
		setFilteredPackages(packages);
	}, [packages]);

	// on load
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
		authenticate();
		async function authenticate() {
			const response = await fetch("/api/authenticate", {
				method: "POST",
				body: JSON.stringify({
					email: localStorage.getItem("email"),
					id: localStorage.getItem("id"),
				}),
				headers: {
					"Content-Type": "application/json",
					"x-access-token": `${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 200) {
				packagesRef.current = [];
				loadPackages();
				return;
			}

			navigate("/login");
		}
	}, []);

	const loadPackages = async () => {
		const response = await fetch("/api/packages-data", {
			method: "POST",
			body: JSON.stringify({ email: localStorage.getItem("email"), id: localStorage.getItem("id") }),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": `${localStorage.getItem("token")}`,
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
			body: JSON.stringify({ packageId: id, id: localStorage.getItem("id") }),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": `${localStorage.getItem("token")}`,
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
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)
	const [isEditFormOpen, setIsEditFormOpen] = useState(false)
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
								return (
									<Package
										packageInfo={object}
										setCurrentInfo={setCurrentInfo}
										setIsInfoModalOpen={setIsInfoModalOpen}
										key={index}
									/>
								);
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
				{isInfoModalOpen && (
					<InfoModal
						isOpen={isInfoModalOpen}
						setIsOpen={setIsInfoModalOpen}
						packageInfo={currentInfo}
						notify={notify}
						setIsConfirmOpen={setIsConfirmOpen}
						setIsEditFormOpen={setIsEditFormOpen}
					/>
				)}
				{isConfirmOpen && (
					<Confirm header={currentInfo.header} notify={notify} setIsOpen={setIsConfirmOpen}/>
				)}
				{isEditFormOpen && (
					<EditForm isOpen={isEditFormOpen} setIsOpen={setIsEditFormOpen} header={currentInfo.header}/>
				)}
			</>
		</MainLayout>
	);
};

export default MainPage;

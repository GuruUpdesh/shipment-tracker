import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import Package from "../Components/Package/Package";
import AddForm from "../Components/modals/AddForm";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiPlus } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import InfoModal from "../Components/modals/infoModal/InfoModal";
import { useNavigate } from "react-router-dom";
import Confirm from "../Components/modals/Confirm";
import EditForm from "../Components/modals/EditForm";
import Packages from "../Components/Package/Packages";
import { motion } from "framer-motion";

const MainPage = () => {
	const navigate = useNavigate();

	const [isAuthentic, setIsAuthentic] = useState(false);

	// on load
	useEffect(() => {
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
				},
			});

			if (response.status === 200) {
				setIsAuthentic(true);
				return;
			}

			navigate("/login");
		}
	}, []);

	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [currentInfo, setCurrentInfo] = useState({});

	const fade = cssTransition({
		enter: "fade-up",
		exit: "fade-down",
	});
	const notify = (message, duration, type) => {
		if (type === "success") {
			toast.success(message, {
				autoClose: duration,
				closeOnClick: true,
				pauseOnHover: false,
				hideProgressBar: true,
				icon: ({ theme, type }) => <BsCheck />,
				transition: fade,
			});
		} else if (type === "warning") {
			toast.error(message, {
				autoClose: duration,
				closeOnClick: true,
				pauseOnHover: false,
				icon: ({ theme, type }) => <AiOutlineWarning />,
				transition: fade,
			});
		}
	};

	const packagesRef = useRef();

	return (
		<MainLayout
			className={"site-padding"}
			packagesRef={packagesRef}
			setIsAddFormOpen={setIsAddFormOpen}
			overflowState={isAddFormOpen || isInfoModalOpen}
			isArchive={false}
		>
			<>
				<ToastContainer position="bottom-center" closeOnClick draggable={false} toastId="test" />
					{isAuthentic && (
						<Packages
							setCurrentInfo={setCurrentInfo}
							setIsInfoModalOpen={setIsInfoModalOpen}
							setIsAddFormOpen={setIsAddFormOpen}
							ref={packagesRef}
						/>
					)}
				{isAddFormOpen && (
					<AddForm
						isOpen={isAddFormOpen}
						setIsOpen={setIsAddFormOpen}
						addLoadingPackage={packagesRef.current.addLoadingPackage}
						notify={notify}
					/>
				)}
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
					<Confirm
						header={currentInfo.header}
						notify={notify}
						setIsOpen={setIsConfirmOpen}
						removePackage={packagesRef.current.removePackage}
					/>
				)}
				{isEditFormOpen && (
					<EditForm
						isOpen={isEditFormOpen}
						setIsOpen={setIsEditFormOpen}
						header={currentInfo.header}
						reloadPackage={packagesRef.current.reloadPackage}
						notify={notify}
					/>
				)}
			</>
		</MainLayout>
	);
};

export default MainPage;

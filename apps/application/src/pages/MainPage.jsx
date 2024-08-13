import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import AddForm from "../Components/modals/AddForm";
import InfoModal from "../Components/modals/infoModal/InfoModal";
import Confirm from "../Components/modals/Confirm";
import EditForm from "../Components/modals/EditForm";
import Packages from "../Components/Package/Packages";
import useUser from "../context/useUser";

const MainPage = () => {
	const { user } = useUser();

	// mobiles
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);

	// package information
	const packagesRef = useRef();
	const [currentInfo, setCurrentInfo] = useState({});

	// shortcut handling
	useEffect(() => {
		const handleShortCut = async (event) => {
			// add form (shift + a)
			if (event.keyCode === 65 && event.shiftKey && !isInfoModalOpen && !isConfirmOpen && !isEditFormOpen) {
				if (!document.activeElement.className.includes("input")) {
					setIsAddFormOpen(true);
				}
				const selected = await window.getSelection();
				if (selected.focusNode.className.includes("input") && !isAddFormOpen) {
					event.preventDefault();
				}
			}

			// quick open package 1-9 (alt + #)
			if (49 <= event.keyCode && event.keyCode <= 57 && event.altKey) {
				const packageIndex = event.keyCode - 49;
				if (packagesRef.current.packageList.length <= packageIndex) {
					return;
				}

				const selectedPackage = packagesRef.current.packageList[packageIndex];
				if (!selectedPackage.header) {
					return;
				}
				setCurrentInfo(selectedPackage);
				setIsInfoModalOpen(true);
			}

			// escape to blur input
			if (event.keyCode === 27 && document.activeElement.className === "search-input") {
				document.activeElement.blur();
			}
		};

		window.addEventListener("keydown", handleShortCut);

		return () => {
			window.removeEventListener("keydown", handleShortCut);
		};
	}, [isAddFormOpen, isInfoModalOpen, isConfirmOpen, isEditFormOpen]);

	return (
		<MainLayout
			className={"site-padding"}
			packagesRef={packagesRef}
			setIsAddFormOpen={setIsAddFormOpen}
			isArchive={false}
		>
			<>
				{user.isAuth && (
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
					/>
				)}
				{isInfoModalOpen && (
					<InfoModal
						isOpen={isInfoModalOpen}
						setIsOpen={setIsInfoModalOpen}
						setIsConfirmOpen={setIsConfirmOpen}
						setIsEditFormOpen={setIsEditFormOpen}
						packageInfo={currentInfo}
					/>
				)}
				{isConfirmOpen && (
					<Confirm
						setIsOpen={setIsConfirmOpen}
						header={currentInfo.header}
						removePackage={packagesRef.current.removePackage}
					/>
				)}
				{isEditFormOpen && (
					<EditForm
						isOpen={isEditFormOpen}
						setIsOpen={setIsEditFormOpen}
						header={currentInfo.header}
						reloadPackage={packagesRef.current.reloadPackage}
					/>
				)}
			</>
		</MainLayout>
	);
};

export default MainPage;

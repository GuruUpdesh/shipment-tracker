import React, { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import MainLayout from "../Components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import Packages from "../Components/Package/Packages";

const ArchivePage = () => {
	const navigate = useNavigate();

	const [isAuthentic, setIsAuthentic] = useState(false);

	// on load
	useEffect(() => {
		authenticate();
		async function authenticate() {
			const response = await fetch(
				`${import.meta.env.VITE_REACT_APP_API_URL}/api/authenticate`,
				{
					credentials: "include",
					method: "POST",
					body: JSON.stringify({
						email: localStorage.getItem("email"),
						id: localStorage.getItem("id"),
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
					},
				}
			);

			if (response.status === 200) {
				setIsAuthentic(true);
				return;
			}

			navigate("/login");
		}
	}, []);

	const packagesRef = useRef();
	return (
		<MainLayout
			className={"site-padding"}
			packagesRef={packagesRef}
			isArchive={true}
		>
			<>
				<ToastContainer
					position="bottom-center"
					closeOnClick
					draggable={false}
					toastId="test"
				/>
				{isAuthentic && <Packages ref={packagesRef} isArchive={true} />}
			</>
		</MainLayout>
	);
};

export default ArchivePage;

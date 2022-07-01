import React from "react";
import { ToastContainer } from "react-toastify";
import MainLayout from "../Components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";

const ArchivePage = () => {
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
	return (
		<MainLayout>
			<>
				<ToastContainer position="bottom-center" closeOnClick draggable={false} toastId="test" />
				{isAuthentic && (
					<Packages setCurrentInfo={setCurrentInfo} setIsInfoModalOpen={setIsInfoModalOpen} ref={packagesCRef} />
				)}
			</>
		</MainLayout>
	);
};

export default ArchivePage;

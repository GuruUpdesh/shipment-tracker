import React, { useEffect, useContext } from "react";
import { UserContext } from "../../../App";

const useAuthenticate = (
	whenAuthentic = () => {},
	whenNotAuthentic = () => {},
	dependencies = []
) => {
	const { user, setUser } = useContext(UserContext);
	useEffect(() => {
		authenticate();
		async function authenticate() {
			if (
				!localStorage.getItem("id") ||
				!localStorage.getItem("email") ||
				!localStorage.getItem("jwtToken")
			) {
				whenNotAuthentic();
				return false;
			}

			const response = await fetch(
				`${import.meta.env.VITE_REACT_APP_API_URL}/api/authenticate`,
				{
					credentials: "include",
					method: "POST",
					body: JSON.stringify({
						id: localStorage.getItem("id"),
						email: localStorage.getItem("email"),
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
					},
				}
			);

			if (response.status === 200) {
				setUser({ ...user, isAuth: true });
				whenAuthentic();
				return true;
			}

			setUser({ ...user, isAuth: false });
			whenNotAuthentic();
			return false;
		}
	}, dependencies);
};

export default useAuthenticate;

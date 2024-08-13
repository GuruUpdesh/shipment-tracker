import axios from "axios";

export default async function register(name, email, password) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/register`,
			{
				name,
				email,
				password,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 201) {
			return {
				success: true,
				message: response.data.message,
				userData: {
					id: response.data.userData.id,
					email: response.data.userData.email,
				},
			};
		}
	} catch (error) {
		const { response } = error;
		return { success: false, message: response.data.message, userData: {} };
	}
}

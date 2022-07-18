import axios from "axios";

export default async function googleLogin(googleData) {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
			headers: {
				"Content-Type": "application/json",
			},
			token: googleData.tokenId,
		});

		if (response.status === 200) {
			return {
				success: true,
				message: response.data.message,
				userData: { id: response.data.userData.id, email: response.data.userData.email },
			};
		}
		return { success: false, message: response.data.message, userData: {} };
	} catch (error) {
		const {response} = error
		return { success: false, message: response.data.message, userData: {} };
	}
}

import axios from "axios";

export default async function googleRegister(googleData) {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register/google`, {
			headers: {
				"Content-Type": "application/json",
			},
			token: googleData.tokenId,
		});

		if (response.status === 201) {
			return {
				success: true,
				message: response.data.message,
				userData: { id: response.data.userData.id, email: response.data.userData.email },
			};
		}
	} catch (error) {
        const {response} = error
		return { success: false, message: response.data.message, userData: {} };
	}
}

export default async function googleLogin(googleData) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/google`,
			{
				method: "POST",
				body: JSON.stringify({
					token: googleData.tokenId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const jsonResponse = await response.json();

		if (response.status === 200) {
			return {
				success: true,
				message: jsonResponse.message,
				userData: {
					id: jsonResponse.userData.id,
					email: jsonResponse.userData.email,
				},
			};
		}

		return { success: false, message: jsonResponse.message, userData: {} };
	} catch (error) {
		console.log(error);
		return { success: false, message: error, userData: {} };
	}
}

export default async function login(email, password) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/login`,
			{
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: password,
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

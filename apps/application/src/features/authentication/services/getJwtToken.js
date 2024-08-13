export default async function getJwtToken(id, email) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/cookie`,
			{
				method: "POST",
				body: JSON.stringify({
					id: id,
					email: email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const jsonResponse = await response.json();

		if (response.status === 200) {
			const jwtToken = jsonResponse.jwtToken;
			localStorage.setItem("jwtToken", jwtToken);
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

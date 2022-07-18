export default async function authenticate(whenAuthentic = () => {}, whenNotAuthentic = () => {}) {
	if (!localStorage.getItem("id") || !localStorage.getItem("email")) {
		whenNotAuthentic();
		return false;
	}

	const response = await fetch(`${process.env.REACT_APP_API_URL}/api/authenticate`, {
		credentials: "include",
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
		whenAuthentic();
		return true;
	}

	whenNotAuthentic();
	return false;
}

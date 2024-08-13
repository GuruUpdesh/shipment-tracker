export default function passwordVerification(password) {
	if (typeof password !== "string") {
		return "invalid input";
	}

	if (password === "") {
		return "password is required";
	}

	if (password.length < 6) {
		return "password must be at least 6 characters";
	}

	return null;
}

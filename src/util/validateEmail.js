export default function validateEmail(email) {
	if (typeof email !== "string") {
		return "invalid email";
	}

	if (email === "") {
		return "email is required";
	}

	let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(email)) {
		return "invalid email address";
	}

	return null;
}

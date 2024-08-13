export default function emailVerification(email) {
    if (typeof email !== "string") {
		return "invalid input";
	}

	if (email === "") {
		return "email is required";
	}

	let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(email)) {
		return "invalid email";
	}

	return null;
}
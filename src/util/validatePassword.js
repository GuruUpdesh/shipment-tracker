function validatePassword(password) {
	if (typeof password !== "string") {
		return "invalid password";
	}

	if (password === "") {
		return "password is required";
	}

	if (password.length() < 6) {
		return "password must be at least 6 characters";
	}

	let includesSymbol = false;
	let symbols = "~!@#$%^&*()_-+={[}]|:;<,>.?/";
	let i = password.length();
	while (i--) {
		if (password.contains(symbols[i])) {
			includesSymbol = true;
		}
	}

	if (!includesSymbol) {
		return "password must include at least one symbol ~!@#$%^&*()_-+={[}]|:;<,>.?/";
	}

	return null;
	if (typeof password !== "string") {
	}
}

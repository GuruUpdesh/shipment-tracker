export default function detectErrors(errors) {
	const keys = Object.keys(errors);

	for (let i = 0; i < keys.length; i++) {
		if (errors[keys[i]] !== null) {
			return true;
		}
	}

	return false;
}

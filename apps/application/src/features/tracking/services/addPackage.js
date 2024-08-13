import notify from "../../../util/notify";

export default async function addPackage(packageInfo) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/add`,
			{
				method: "PUT",
				body: JSON.stringify({
					email: localStorage.getItem("email"),
					id: localStorage.getItem("id"),
					name: packageName,
					trackingNumber: trackingNumber,
					courier: courier,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

		const jsonResponse = await response.json();

		if (response.status === 201) {
			// addLoadingPackage(jsonResponse.packageData);
			function undo() {
				// deletePackage(jsonResponse....)
			}
			// notify(`added ${name}`, 3000, "success", undo);
			return true;
		} else {
			notify(jsonResponse.message, 3000, "warning");
			return false;
		}
	} catch (error) {
		notify(error, 3000, "warning");
		return false;
	}
}

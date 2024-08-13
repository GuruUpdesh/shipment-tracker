import notify from "../../../util/notify";
import addPackage from "./addPackage";

export default async function deletePackage(packageInfo) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/delete`,
			{
				credentials: "include",
				method: "DELETE",
				body: JSON.stringify({
					id: localStorage.getItem("id"),
					trackingNumber: trackingNumber,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

		if (response.status === 200) {
			// removePackage(header.index);
			function undo() {
				// addPackage()
			}
			// notify(`deleted ${header.name}`, 2000, "warning", undo);
			return true;
		}

		return false;
	} catch (error) {
		// notify(`deleted ${header.name}`, 2000, "warning", undo);

		return false;
	}
}

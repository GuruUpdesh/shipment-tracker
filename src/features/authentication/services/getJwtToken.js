import axios from "axios";

export default async function getJwtToken(id, rememberMe) {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cookie?id=${id}&remember=${rememberMe ? '1' : "0"}`, {
		withCredentials: true,
		validateStatus: (status) => {
			return status < 400;
		},
	});

	return response.status === 304 ? true : false
}

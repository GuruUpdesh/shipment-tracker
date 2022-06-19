import React, { useState } from "react";
import Input from "../Components/Form/Input";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import axios from "axios";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		email: null,
		password: null,
	});
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		const valid = verify();
		if (!valid) {
			return;
		}

		await login();
	};

	const verify = () => {
		const tempErrors = { email: null, password: null };

		setErrors(tempErrors);

		if (email === "") {
			tempErrors.email = "email is required";
		}

		if (!validateEmail(email)) {
			tempErrors.email = "invalid email address"
		}

		if (password === "") {
			tempErrors.password = "password is required";
		}

		if (tempErrors.email === null && tempErrors.password === null) {
			return true;
		}

		return false;
	};

	function validateEmail(email) {
		let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	const login = async () => {
		const response = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		
		const jsonResponse = await response.json();
		
		
		if (response.status === 200) {
			await axios.get(`/api/cookie?id=${jsonResponse.userData.id}`, {
				withCredentials: true,
				validateStatus: (status) => {
					return status < 400
				}
			})
			localStorage.setItem("id", jsonResponse.userData.id);
			// localStorage.setItem("token", jsonResponse.token);
			localStorage.setItem("email", jsonResponse.userData.email);
			navigate("/packages");
		} else {
			setMessage(jsonResponse.message);
		}
	};

	const navigate = useNavigate();
	return (
		<div className="login-wrapper">
			<div className="login-container">
				{message !== "" && <p>{message}</p>}
				<button
					className="btn-close"
					onClick={() => {
						navigate("/");
					}}
				>
					<BsArrowLeftSquareFill />
				</button>
				<div className="header">
					<h3>Welcome Back!</h3>
					<p>please login to continue</p>
				</div>
				<Input placeholder={"email"} value={email} setValue={setEmail} type={"text"} />
				<p>{errors.email}</p>
				<Input placeholder={"password"} value={password} setValue={setPassword} type={"password"} />
				<p>{errors.password}</p>
				<button className="btn-black" onClick={handleSubmit}>
					login
				</button>
				<p>don't have an account?</p>
				<button
					className="btn-normal-text"
					onClick={() => {
						navigate("/register");
					}}
				>
					create account
				</button>
			</div>
		</div>
	);
};

export default LoginPage;

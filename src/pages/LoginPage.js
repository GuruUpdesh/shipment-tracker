import React, { useState, useRef } from "react";
import Input from "../Components/Form/Input";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import ButtonBlack from "../Components/ButtonBlack";
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
			tempErrors.email = "invalid email address";
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
					return status < 400;
				},
			});
			localStorage.setItem("id", jsonResponse.userData.id);
			// localStorage.setItem("token", jsonResponse.token);
			localStorage.setItem("email", jsonResponse.userData.email);
			navigate("/packages");
		} else {
			setMessage(jsonResponse.message);
		}
	};

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const ref = useRef();

	const navigate = useNavigate();
	return (
		<>
			<div
				className="login-wrapper"
				ref={ref}
				onMouseMove={(e) => {
					const bounding = ref.current.getBoundingClientRect();
					console.log(e.clientX / bounding.right);
					const curX = e.clientX / bounding.right;
					const curY = e.clientY / bounding.bottom;
					const tileSize = 0.01
					if (x - curX > tileSize || curX - x > tileSize) {
						setX(curX);
					}
					if (y - curY > tileSize || curY - y > tileSize) {
						setY(curY);
					}
				}}
			>
				<div className="login-container">
					<button
						className="back"
						onClick={() => {
							navigate("/");
						}}
					>
						<BsArrowLeft />
					</button>
					<div className="form">
						<h1>Login</h1>
						{message !== "" && <p className="message">{message}</p>}
						<Input placeholder={"email"} value={email} setValue={setEmail} type={"text"} />
						<p className="error">{errors.email}</p>
						<Input placeholder={"password"} value={password} setValue={setPassword} type={"password"} />
						<p className="error">{errors.password}</p>
						<ButtonBlack onClick={handleSubmit}>login</ButtonBlack>
					</div>
					<div className="login-footer">
						<p>forgot password</p>
					</div>
				</div>
				<div className="perspective-wrapper">
					<div
						className="login-image-wrapper"
						style={{
							transform: ` translateX(-1em) rotateY(${(-90 + x * 180) / 5}deg) rotateX(${
								(90 - y * 180) / 5
							}deg)`,
							boxShadow: `${10 - 20 * x}px ${10 - 20 * y}px 10px var(--clr-border-600)`,
						}}
					>
						<div className="header">
							<h3>Welcome Back!</h3>
							<p>please login to continue</p>
						</div>
						<div className="content">
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
						{/* <img src="login.png"></img> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;

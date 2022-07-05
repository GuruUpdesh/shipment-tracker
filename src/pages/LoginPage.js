import React, { useState, useRef } from "react";
import Input from "../Components/Core/Form/Input";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import ButtonBlack from "../Components/Core/ButtonBlack";
import axios from "axios";
import validateEmail from "../util/validateEmail";
import { motion } from "framer-motion";

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
			return "error";
		}

		const result = await login();
	};

	const verify = () => {
		const tempErrors = { email: null, password: null };

		if (password === "") {
			tempErrors.password = "password is required";
		}

		tempErrors.email = validateEmail(email);
		setErrors(tempErrors);

		if (tempErrors.email === null && tempErrors.password === null) {
			return true;
		}

		return false;
	};

	const login = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
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
			localStorage.setItem("email", jsonResponse.userData.email);
			navigate("/packages");
			return;
		}
		setMessage(jsonResponse.message);
		return "error";
	};

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const ref = useRef();

	const navigate = useNavigate();
	return (
		<motion.div
			className="login-wrapper flex-center"
			ref={ref}
			onMouseMove={(e) => {
				const bounding = ref.current.getBoundingClientRect();
				const curX = e.clientX / bounding.right;
				const curY = e.clientY / bounding.bottom;
				const tileSize = 0.01;
				if (x - curX > tileSize || curX - x > tileSize) {
					setX(curX);
				}
				if (y - curY > tileSize || curY - y > tileSize) {
					setY(curY);
				}
			}}
			initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 0.2, ease: "easeInOut"}}}
		>
			<div className="login-container flex-column">
				<button
					className="back login-block flex-column"
					onClick={() => {
						navigate("/");
					}}
				>
					<BsArrowLeft />
				</button>
				<div className="form login-block">
					<h1>Login</h1>
					{message !== "" && <p className="message">{message}</p>}
					<Input
						placeholder={"email"}
						value={email}
						setValue={setEmail}
						type={"text"}
						error={errors.email}
						autoFill={true}
					/>
					{/* <p className="error">{errors.email}</p> */}
					<Input
						placeholder={"password"}
						value={password}
						setValue={setPassword}
						type={"password"}
						error={errors.password}
						autoFill={true}
					/>
					{/* <p className="error">{errors.password}</p> */}
					<ButtonBlack onClick={handleSubmit} errors={true} load={true}>
						login
					</ButtonBlack>
				</div>
				<div className="login-footer login-block">
					<p>forgot password</p>
				</div>
			</div>
			<div className="perspective-wrapper">
				<div
					className="login-image-wrapper flex-center-column"
					style={{
						background: `url(${process.env.PUBLIC_URL + "/Login.png"})`,
						transform: ` translateX(-1em) rotateY(${(-90 + x * 180) / 5}deg) rotateX(${(90 - y * 180) / 5}deg)`,
						boxShadow: `${10 - 20 * x}px ${10 - 20 * y}px 10px var(--clr-bg-dark-400)`,
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
				</div>
			</div>
		</motion.div>
	);
};

export default LoginPage;

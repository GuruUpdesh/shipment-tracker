import React, { useState } from "react";
import Input from "../Components/Core/Form/Input";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import validateEmail from "../util/validateEmail";
import ButtonBlack from "../Components/Core/ButtonBlack";
import { motion } from "framer-motion";
// import { GoogleLogin } from "react-google-login";
// import { gapi } from "gapi-script";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		name: null,
		email: null,
		password: null,
	});
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const valid = verify();
		if (!valid) {
			return "error";
		}

		const result = await register();
	};

	const verify = () => {
		const tempErrors = { name: null, email: null, password: null };

		if (password.length < 6) {
			tempErrors.password = "password must be at least 6 characters";
		}

		if (name === "") {
			tempErrors.name = "name is required";
		}

		if (password === "") {
			tempErrors.password = "password is required";
		}

		tempErrors.email = validateEmail(email);
		setErrors(tempErrors);

		if ((tempErrors.email === null) & (tempErrors.name === null) && tempErrors.password === null) return true;

		return false
	};

	const register = async () => {
		console.log("register")
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
			method: "POST",
			body: JSON.stringify({
				email: email,
				name: name,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			navigate("/login");
		}
	};

	return (
		<motion.div
			className="login-wrapper flex-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
		>
			<div className="login-container flex-column">
				<button
					className="back login-block flex-column"
					onClick={() => {
						navigate(-1);
					}}
				>
					<BsArrowLeft />
				</button>
				<div className="form login-block">
					<h1>register</h1>
					{message !== "" && <p className="message">{message}</p>}
					<Input
						placeholder={"name"}
						value={name}
						setValue={setName}
						type={"text"}
						error={errors.name}
						autoFill={true}
					/>
					<Input
						placeholder={"email"}
						value={email}
						setValue={setEmail}
						type={"text"}
						error={errors.email}
						autoFill={true}
					/>
					<Input
						placeholder={"password"}
						value={password}
						setValue={setPassword}
						type={"password"}
						error={errors.password}
						autoFill={true}
					/>
					<ButtonBlack onClick={handleSubmit} errors={true} load={true}>
						register
					</ButtonBlack>
				</div>
				<div className="login-footer login-block flex-column">
					<p>already have an account?</p>
					<button
						className="btn-normal-text"
						onClick={() => {
							navigate("/login");
						}}
					>
						login
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default RegisterPage;

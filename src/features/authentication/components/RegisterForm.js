import React, { useState, useEffect } from "react";
import ButtonBlack from "../../../Components/Core/ButtonBlack";
import Input from "../../../Components/Core/Form/Input";
import getJwtToken from "../services/getJwtToken";
import { useNavigate } from "react-router-dom";
import confirmPasswordVerification from "../verification/confirmPasswordVerification";
import nameVerification from "../verification/nameVerification";
import emailVerification from "../verification/emailVerification";
import passwordVerification from "../verification/passwordVerification";
import detectErrors from "../verification/detectErrors";
import register from "../services/register";
// import { gapi } from "gapi-script";
import googleRegister from "../services/googleRegister";
import useUser from "../../../context/useUser";

function RegisterForm() {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	function start() {
	// 		gapi.auth2.init({
	// 			clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	// 			cookiePolicy: "none",
	// 		});
	// 	}

	// 	gapi.load("client:auth2", start);
	// }, []);

	const [errorMessage, setErrorMessage] = useState("");

	// input fields
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// error handling
	const [errors, setErrors] = useState({ name: null, email: null, password: null, confirmPassword: null });

	const { user, setUser } = useUser();
	async function handleSubmit() {
		const areInputsValid = verify();

		if (!areInputsValid) {
			return "error";
		}

		const registerResult = await register(name, email, password);

		if (!registerResult.success) {
			if (registerResult.message) {
				setErrorMessage(registerResult.message);
			}
			setUser({ ...user, isAuth: false });
			return "error";
		}

		const jwtResult = await getJwtToken(registerResult.userData.id, registerResult.userData.email);

		if (!jwtResult) {
			setErrorMessage("there was a cookie problem");
			setUser({ ...user, isAuth: false });
			return "error";
		}

		setUser({ ...user, isAuth: true });
		localStorage.setItem("id", registerResult.userData.id);
		localStorage.setItem("email", registerResult.userData.email);
		navigate("/packages");
	}

	function verify() {
		const tempErrors = { name: null, email: null, password: null, confirmPassword: null };

		tempErrors.name = nameVerification(name);
		tempErrors.email = emailVerification(email);
		tempErrors.password = passwordVerification(password);
		tempErrors.confirmPassword = confirmPasswordVerification(password, confirmPassword);

		setErrors(tempErrors);

		if (detectErrors(tempErrors)) {
			return false;
		}

		return true;
	}

	async function handleGoogleRegister(googleData, success) {
		console.log(googleData, success)
		if (!success) {
			setErrorMessage("google register failures");
			return "error";
		}

		const registerResult = await googleRegister(googleData);
		console.log("regRes:", registerResult)

		if (!registerResult.success) {
			if (registerResult.message) {
				setErrorMessage(registerResult.message);
			}
			setUser({ ...user, isAuth: false });
			return "error";
		}

		const jwtResult = await getJwtToken(registerResult.userData.id, registerResult.userData.email);

		if (!jwtResult) {
			setErrorMessage("there was a cookie problem");
			setUser({ ...user, isAuth: false });
			return "error";
		}

		setUser({ ...user, isAuth: true });
		localStorage.setItem("id", registerResult.userData.id);
		localStorage.setItem("email", registerResult.userData.email);
		navigate("/packages");
	}
	return (
		<div className="form login-block">
			<h1>Register</h1>

			{errorMessage !== "" ? <p className="message">{errorMessage}</p> : <></>}

			<div className="form-inputs-wrapper">
				<Input placeholder="name" value={name} setValue={setName} type="text" error={errors.name} />
				<Input placeholder="email" value={email} setValue={setEmail} type="text" error={errors.email} />
				<Input
					placeholder="password"
					value={password}
					setValue={setPassword}
					type="password"
					error={errors.password}
				/>
				<Input
					placeholder="confirm password"
					value={confirmPassword}
					setValue={setConfirmPassword}
					type="password"
					error={errors.confirmPassword}
					match={password}
				/>
			</div>

			<ButtonBlack onClick={handleSubmit} errors={true} load={true}>
				register
			</ButtonBlack>
		</div>
	);
}

export default RegisterForm;

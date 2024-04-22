import React, { useState, useEffect, useRef } from "react";
import Input from "../../../Components/Core/Form/Input";
import CheckBox from "../../../Components/Core/Form/CheckBox";
import ButtonBlack from "../../../Components/Core/ButtonBlack";
// import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import getJwtToken from "../services/getJwtToken";
import emailVerification from "../verification/emailVerification";
import passwordVerification from "../verification/passwordVerification";
import detectErrors from "../verification/detectErrors";
import googleLogin from "../services/googleLogin";
import useEnter from "../../../Hooks/useEnter";
import useUser from "../../../context/useUser";

function LoginForm() {
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// checkbox
	const [rememberMe, setRememberMe] = useState("");

	// error handling
	const [errors, setErrors] = useState({ email: null, password: null });

	// is loading
	const [isWaitingForGoogle, setIsWaitingForGoogle] = useState(false);

	const {user, setUser} = useUser()

	async function handleSubmit() {
		const areInputsValid = verify();

		if (!areInputsValid) {
			return "error";
		}

		const loginResult = await login(email, password);

		if (!loginResult.success) {
			if (loginResult.message) {
				setErrorMessage(loginResult.message);
			}

			setUser({...user, isAuth: false})
			return "error";
		}

		const jwtResult = await getJwtToken(loginResult.userData.id, loginResult.userData.email);

		if (!jwtResult) {
			setErrorMessage("there was a cookie problem");
			setUser({...user, isAuth: false})
			return "error";
		}

		setUser({...user, isAuth: true})
		localStorage.setItem("id", loginResult.userData.id);
		localStorage.setItem("email", loginResult.userData.email);
		navigate("/packages");
	}

	function verify() {
		const tempErrors = { email: null, password: null };

		tempErrors.email = emailVerification(email);
		tempErrors.password = passwordVerification(password);

		setErrors(tempErrors);

		if (detectErrors(tempErrors)) {
			return false;
		}

		return true;
	}

	async function handleGoogleLogin(googleData, success) {
		console.log(googleData, success)
		if (!success) {
			setErrorMessage("google login failure");
			setIsWaitingForGoogle(false);
			return "error";
		}

		const loginResult = await googleLogin(googleData);
		console.log("google login:", loginResult);
		setIsWaitingForGoogle(false);

		if (!loginResult.success) {
			if (loginResult.message) {
				setErrorMessage(loginResult.message);
			}
			setUser({...user, isAuth: false})
			return "error";
		}

		const jwtResult = await getJwtToken(loginResult.userData.id, loginResult.userData.email);

		if (!jwtResult) {
			setErrorMessage("there was a cookie problem");
			setUser({...user, isAuth: false})
			return "error";
		}

		setUser({...user, isAuth: true})
		localStorage.setItem("id", loginResult.userData.id);
		localStorage.setItem("email", loginResult.userData.email);
		navigate("/packages");
	}

	const ref = useRef();

	useEnter(() => {
		if (
			!document.activeElement.className.includes("btn") &&
			document.activeElement.className !== "option" &&
			!document.activeElement.className.includes("select") &&
			!document.activeElement.className.includes("checkbox")
		) {
			errorMessage === "" ? ref.current.children[2].click() : ref.current.children[3].click();
		}
	}, [errorMessage]);

	return (
		<div className="form login-block" ref={ref}>
			<h1>Login</h1>

			{errorMessage !== "" ? <p className="message">{errorMessage}</p> : <></>}

			<div className="form-inputs-wrapper">
				{!isWaitingForGoogle ? (
					<>
						<Input placeholder="email" value={email} setValue={setEmail} type="text" error={errors.email} />
						<Input
							placeholder="password"
							value={password}
							setValue={setPassword}
							type="password"
							error={errors.password}
						/>
						<CheckBox isChecked={rememberMe} setIsChecked={setRememberMe}>
							remember me
						</CheckBox>
					</>
				) : (
					<img src={process.env.PUBLIC_URL + "/loading.svg"} />
				)}
			</div>

			<ButtonBlack onClick={(e) => handleSubmit(e)} errors={true} load={true}>
				login
			</ButtonBlack>
		</div>
	);
}

export default LoginForm;

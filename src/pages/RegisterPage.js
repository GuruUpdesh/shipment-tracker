import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import RegisterForm from "../features/authentication/components/RegisterForm";

const RegisterPage = () => {
	const navigate = useNavigate();

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
				<RegisterForm />
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

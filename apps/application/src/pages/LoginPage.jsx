import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import LoginForm from "../features/authentication/components/LoginForm";
import ButtonText from "../Components/Core/ButtonText";

const LoginPage = () => {
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
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
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
				<LoginForm />
				<div className="login-footer login-block flex-column">
					<p>don't have an account?</p>
					<ButtonText onClick={() => {navigate("/register")}}>create account</ButtonText>
				</div>
			</div>
			<div className="perspective-wrapper">
				<div
					className="login-image-wrapper flex-center-column"
					style={{
						// background: `url(${process.env.PUBLIC_URL + "/Login.png"})`,
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

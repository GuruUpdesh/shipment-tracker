import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import navigate from "../../util/formNavigation";

const ButtonBlack = ({ onClick, className, children, errors, load }) => {
	const [x, setX] = useState(-500);
	const [y, setY] = useState(-500);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (error) {
				setError(false);
			}
		}, 350);

		return () => clearInterval(intervalId);
	}, [error]);

	const ref = useRef();

	async function clickHandler(e) {
		let bounds = ref.current.getBoundingClientRect();
		setX(e.screenX - bounds.left);
		setY(e.clientY - bounds.top);

		if (load) {
			setLoading(true);
		}
		const result = await onClick();

		if (load) {
			setLoading(false);
		}

		if (errors) {
			if (result === "error") {
				setError(true);
			}
		}
	}
	return (
		<button
			className={"btn-black " + (error ? "btn-error" : "") + " " + (className ? className : "")}
			onClick={(e) => {
				clickHandler(e);
			}}
			ref={ref}
			onKeyDown={(e) => navigate(e, ref)}
		>
			<div className="pulseContainer">
				<div className="pulse" style={{ top: y, left: x }}></div>
			</div>
			{children}
			{/* {loading && <img src={process.env.PUBLIC_URL + "/loading.svg"} />} */}
		</button>
	);
};

export default ButtonBlack;

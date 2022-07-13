import React, { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import navigate from "../../../util/formNavigation";

const Input = ({ placeholder, value, setValue, type, autoFocus, autoFill, error }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const ref = useRef();

	// function navigate(e) {
	// 	// key down
	// 	if (e.keyCode == 40) {
	// 		const nextSibling = ref.current.nextSibling;
	// 		console.log(nextSibling)
	// 		const className = nextSibling.className.toString();
	// 		if (className.includes("input-container")) {
	// 			const input = nextSibling.querySelectorAll("input")[0];
	// 			input.focus();
	// 		}

	// 		if (className.includes("selector-container")) {
	// 			const button = nextSibling.querySelectorAll("button")[0]
	// 			button.focus()
	// 		}
	// 		// ref.current.nextSibling.querySelectorAll('input')[0].focus()
	// 		// ref.current.nextSibling.children
	// 	}

	// 	// key up
	// 	if (e.keyCode == 38) {
	// 	}
	// }

	return (
		<div
			className={
				"input-container " +
				(value === "" || value === undefined ? "" : "full-input") +
				" " +
				(error ? "input-error" : "")
			}
			ref={ref}
		>
			<span>{placeholder}</span>
			<input
				onKeyUp={(e) => navigate(e, ref)}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				type={type === "password" ? (visible ? "text" : type) : type}
				autoFocus={autoFocus}
				autofill={autoFill && autoFill.toString()}
			/>
			{type == "password" ? (
				<>
					{visible == true ? (
						<AiFillEye onClick={toggleVisibility} />
					) : (
						<AiFillEyeInvisible onClick={toggleVisibility} />
					)}
				</>
			) : (
				<></>
			)}
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Input;

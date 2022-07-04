import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ placeholder, value, setValue, type, autoFocus, autoFill, error }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};
	return (
		<div className={"input-container " + (value === "" || value === undefined ? "" : "full-input") + " " + (error ? "input-error" : '')}>
			<span>{placeholder}</span>
			<input
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

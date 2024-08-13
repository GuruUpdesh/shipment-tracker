import React, { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import navigate from "../../../util/formNavigation";

const Input = ({ placeholder, value, setValue, type, autoFocus, autoFill, error, match }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const ref = useRef();

	const [matches, setMatches] = useState(false);
	useEffect(() => {
		if (match) {
			setMatches(value === match);
			console.log(value === match);
		}
	}, [value]);

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
			<span>
				{placeholder}
				{matches && <BsCheck className="matches"/>}
			</span>
			<input
				onKeyDown={(e) => navigate(e, ref)}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				type={type === "password" ? (visible ? "text" : type) : type}
				autoFocus={autoFocus}
				autofill={autoFill && autoFill.toString()}
			/>
			{type === "password" ? (
				<>
					{visible == true ? (
						<AiFillEye className="eye" onClick={toggleVisibility} />
					) : (
						<AiFillEyeInvisible className="eye" onClick={toggleVisibility} />
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

import React, { useRef } from "react";
import { BsCheck } from "react-icons/bs";
import useEnter from "../../../Hooks/useEnter";
import navigate from "../../../util/formNavigation";

function CheckBox({ isChecked, setIsChecked, children }) {
	function toggleChecked() {
		setIsChecked(!isChecked);
	}

	useEnter(() => {
		if (document.activeElement.className.includes("checkbox")) {
			setIsChecked(!isChecked);
		}
	}, [isChecked]);

	const ref = useRef();
	return (
		<div className="checkbox-container" ref={ref}>
			<div
				className={"checkbox " + (isChecked ? "checked" : "")}
				onClick={toggleChecked}
				tabIndex={1}
				onKeyDown={(e) => navigate(e, ref)}
			>
				{isChecked && <BsCheck />}
			</div>
			<p className="label">{children}</p>
		</div>
	);
}

export default CheckBox;

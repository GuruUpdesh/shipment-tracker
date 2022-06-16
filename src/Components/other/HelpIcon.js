import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const HelpIcon = ({ message }) => {
	return (
		<div className='help-icon'>
			<AiOutlineQuestionCircle />
			<div>
				<span>{message}</span>
			</div>
		</div>
	);
};

export default HelpIcon;

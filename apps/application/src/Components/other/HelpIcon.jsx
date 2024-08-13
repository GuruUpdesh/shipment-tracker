import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const HelpIcon = ({ message, direction }) => {
	return (
		<div className={'help-icon ' + (direction === 'left' ? 'help-left' : 'help-right')}>
			<AiOutlineQuestionCircle />
			<div>
				<span>{message}</span>
			</div>
		</div>
	);
};

export default HelpIcon;

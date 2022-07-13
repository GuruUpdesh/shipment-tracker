import React, {useRef} from "react";
import navigate from "../../util/formNavigation";

const ButtonText = ({ children, onClick }) => {
    const ref = useRef()
	return (
		<button ref={ref} className="btn-normal-text" onClick={onClick} onKeyUp={(e) => navigate(e, ref)}>
			{children}
		</button>
	);
};

export default ButtonText;

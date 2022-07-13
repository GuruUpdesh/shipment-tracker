import React, { useRef } from "react";

const Option = ({ option, onClick, parentRef, setIsOpen }) => {
	const ref = useRef();
	return (
		<li ref={ref} onClick={onClick}>
			<button
				className="option"
				onKeyUp={(e) => {
					if (e.keyCode === 40) {
						if (ref.current.nextSibling) {
							ref.current.nextSibling.children[0].focus();
						} else {
							parentRef.current.children[0].children[0].focus();
						}
					}

					if (e.keyCode === 38) {
						if (ref.current.previousSibling) {
							ref.current.previousSibling.children[0].focus();
						} else {
							parentRef.current.children[parentRef.current.children.length - 1].children[0].focus();
						}
					}

					if (e.keyCode === 8) {
						setIsOpen(false);
					}
				}}
			>
				{option}
			</button>
		</li>
	);
};

export default Option;

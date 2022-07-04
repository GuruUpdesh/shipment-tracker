import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

const Selector = ({ placeholder, options, selected, setSelected, error }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();
	useOnClickOutside(ref, () => setIsOpen(false));
	return (
		<div className={"selector-container " + (error ? "selector-error" : "") }>
			<div
				ref={ref}
				className={"selector " + (selected === "" ? "" : "full-selector ") + (isOpen ? "active-selector " : "")}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<button>
					<span>{placeholder}</span>
					{selected}
					{isOpen ? <BiChevronUp /> : <BiChevronDown />}
				</button>
				{isOpen && (
					<ul>
						{options.map((option, index) => {
							if (option !== selected) {
								return (
									<li
										key={index}
										onClick={() => {
											setSelected(option);
										}}
									>
										<button tabIndex={-1}>{option}</button>
									</li>
								);
							}
						})}
					</ul>
				)}
			</div>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Selector;

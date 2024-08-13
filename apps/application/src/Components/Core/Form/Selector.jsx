import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import navigate from "../../../util/formNavigation";
import Option from "./Option";

const Selector = ({ placeholder, options, selected, setSelected, error }) => {
	const [isOpen, setIsOpen] = useState(false);
	const outerRef = useRef();
	const ref = useRef();
	const listRef = useRef()
	useOnClickOutside(ref, () => setIsOpen(false));

	return (
		<div className={"selector-container " + (error ? "selector-error" : "")} ref={outerRef}>
			<div
				ref={ref}
				className={"selector " + (selected === "" ? "" : "full-selector ") + (isOpen ? "active-selector " : "")}
				onClick={() => {
					setIsOpen(!isOpen);
					ref.current.children[0].focus()
				}}
			>
				<button
				className="btn-selector"
					onKeyDown={(e) => {
						if (!isOpen) {
							navigate(e, outerRef);
							return;
						}

						// key down
						if (e.keyCode === 40) {
							const firstBtn = ref.current.children[1].children[0].querySelectorAll("button")[0];
							firstBtn.focus();
						}

						//backspace
						if (e.keyCode === 8) {
							setIsOpen(false)
						}

						console.log(e.keyCode)
					}}
				>
					<span>{placeholder}</span>
					{selected}
					{isOpen ? <BiChevronUp /> : <BiChevronDown />}
				</button>
				{isOpen && (
					<ul ref={listRef}>
						{options.map((option, index) => {
							if (option !== selected) {
								return (
									<Option option={option} onClick={() => {setSelected(option)}} parentRef={listRef} setIsOpen={setIsOpen} key={index}/>
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

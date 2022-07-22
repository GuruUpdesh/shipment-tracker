import React, { useState, useCallback, useEffect } from "react";

const useContextMenu = () => {
	const [xPos, setXPos] = useState("0px");
	const [yPos, setYPos] = useState("0px");
	const [clickInfo, setClickInfo] = useState({package: false, input: false})
	const [showMenu, setShowMenu] = useState(false);

	const handleContextMenu = useCallback(
		(e) => {
			e.preventDefault();

			if (e.target.className === "package-container") {
				setClickInfo({...clickInfo, package: true})
			}

			if (e.target.tagName === "input") {
				setClickInfo({...clickInfo, input: true})
			}

			setXPos(e.pageX);
			setYPos(e.pageY);
			setShowMenu(true);
		},
		[setXPos, setYPos]
	);

	const handleClick = useCallback(() => {
		showMenu && setShowMenu(false);
	}, [showMenu]);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			document.addEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	});

	return { xPos, yPos, showMenu };
};

export default useContextMenu;
import React, { useRef, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import useMousePosition from "../../Hooks/useGlobalMousePosition";
import {distance} from "../../util/distance";

const ButtonMagnet = ({children, onClick}) => {
	const { mouseX, mouseY } = useMousePosition();
	const ref = useRef();
    const textRef= useRef()

	const {user} = useContext(UserContext)

	useEffect(() => {
		let x = 0;
		let y = 0;

		if (ref && !user.isMobile) {
			const node = ref.current;

			// New values for the translations
			const rect = node.getBoundingClientRect();
			const distanceToTrigger = rect.width * 0.7;
			const distanceMouseButton = distance(
				mouseX + window.scrollX,
				mouseY + window.scrollY,
				rect.left + rect.width / 2,
				rect.top + rect.height / 2
			);

			// Handle magnetic effect
			if (distanceMouseButton < distanceToTrigger) {
				// Translate button position on hover
				x = (mouseX + window.scrollX - (rect.left + rect.width / 2)) * 0.2;
				y = (mouseY + window.scrollY - (rect.top + rect.height / 2)) * 0.2;
				node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
				textRef.current.style.transform = `translate3d(${x / 4}px, ${y / 4}px, 0)`;
			} else {
				// Restore initial position
				node.style.transform = `translate3d(0, 0, 0)`;
				textRef.current.style.transform = `translate3d(0, 0, 0)`;
			}
		}
	}, [mouseX, mouseY, ref, textRef]);
	return <button onClick={onClick} className="btn-magnet" ref={ref}><p ref={textRef}>{children}</p></button>;
};

export default ButtonMagnet;

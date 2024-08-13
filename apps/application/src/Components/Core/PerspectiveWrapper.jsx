import React, { useState, useRef, useEffect } from "react";
import useUser from "../../context/useUser";

const PerspectiveWrapper = ({ children, mouse}) => {
	const ref = useRef();
	const { user } = useUser();

	// useEffect(() => {console.log(mouse)}, [mouse])
	const [isHover, setIsHover] = useState(false);

	useEffect(() => {
		if (!user.isMobile) {
			const node = ref.current;
			const rect = node.getBoundingClientRect();

			const padding = 80;

			const centerX = rect.left + rect.width / 2;
			const mousePositionX = mouse.clientX + window.scrollX;
			const mouseDistanceX = mousePositionX - centerX;

			const centerY = rect.top + rect.height / 2;
			const mousePositionY = mouse.clientY;
			const mouseDistanceY = mousePositionY - centerY;

			if (
				Math.abs(mouseDistanceX) < rect.width / 2 + padding &&
				Math.abs(mouseDistanceY) < rect.height / 2 + padding
			) {
				node.style.transform = `rotateY(${mouseDistanceX / (isHover ? 50 : -80)}deg) rotateX(${
					mouseDistanceY / (isHover ? -10 : 20)
				}deg) ${isHover ? "translateZ(80px)" : ""}`;
			} else {
				node.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
			}
		}
	}, [mouse, ref, isHover]);
	return (
		<div
			className={"perspective-wrapper"}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div ref={ref}>{children}</div>
		</div>
	);
};

export default React.memo(PerspectiveWrapper);

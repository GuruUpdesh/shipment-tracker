import { useEffect } from "react";

// this hook registers a click outside of the current component
function useOnClickOutside(ref, handler) {
	useEffect(() => {
		const listener = (event) => {
			// Do nothing if clicking ref's element or descendent elements or notification
			if (
				!ref.current ||
				ref.current.contains(event.target) ||
				event.target.classList.contains("Toastify__toast") ||
				`${event.target.tagName}` === "svg"
			) {
				return;
			}
			handler(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchcancel", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchcancel", listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;

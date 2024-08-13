import { toast, cssTransition } from "react-toastify";
import { BsCheck } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";

// notifications
const fade = cssTransition({
	enter: "fade-up",
	exit: "fade-down",
});
export default function notify (message, duration, type) {
	if (type === "success") {
		toast.success(message, {
			autoClose: duration,
			closeOnClick: true,
			pauseOnHover: false,
			hideProgressBar: true,
			icon: ({ theme, type }) => <BsCheck />,
			transition: fade,
		});
	} else if (type === "warning") {
		toast.error(message, {
			autoClose: duration,
			closeOnClick: true,
			pauseOnHover: false,
			icon: ({ theme, type }) => <AiOutlineWarning />,
			transition: fade,
		});
	}
};

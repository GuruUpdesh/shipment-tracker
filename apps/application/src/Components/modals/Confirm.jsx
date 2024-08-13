import React, { useRef } from "react";
import Modal from "./Modal";
import { RiCloseFill } from "react-icons/ri";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import useEscape from "../../Hooks/useEscape";
import useEnter from "../../Hooks/useEnter";
import notify from "../../util/notify";

const Confirm = ({ setIsOpen, header, removePackage }) => {
	const deletePackage = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/delete`,
			{
				credentials: "include",
				method: "DELETE",
				body: JSON.stringify({
					id: localStorage.getItem("id"),
					trackingNumber: header.trackingNumber,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

		if (response.status === 200) {
			removePackage(header.index);
			notify(`deleted ${header.name}`, 2000, "warning");
		}

		setIsOpen(false);
	};

	const ref = useRef();
	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});

	useEscape(() => {
		setIsOpen(false);
	});

	useEnter(() => {
		if (!document.activeElement.className.includes("btn")) {
			deletePackage();
		}
	});
	return (
		<Modal>
			<div className="confirm-modal flex-center-column" ref={ref}>
				<button
					className="btn-close btn-black"
					onClick={() => {
						setIsOpen(false);
					}}
				>
					<RiCloseFill />
				</button>

				<div className="header">
					<h1>Delete {header.name}?</h1>
					<p>packages will be deleted forever</p>
				</div>
				<div className="content flex-evenly">
					<button
						className="btn-normal-text"
						onClick={() => setIsOpen(false)}
					>
						cancel
					</button>
					<button className="btn-black" onClick={deletePackage}>
						confirm
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default Confirm;

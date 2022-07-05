import React, { useRef } from "react";
import Modal from "./Modal";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import {RiCloseFill} from "react-icons/ri"

const Confirm = ({ setIsOpen, header, notify, removePackage }) => {
	const deletePackage = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/delete`, {
			method: "DELETE",
			body: JSON.stringify({
				id: localStorage.getItem("id"),
				trackingNumber: header.trackingNumber,
			}),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": `${localStorage.getItem("token")}`,
			},
		});

		if (response.status === 200) {
			removePackage(header.index)
			notify(`deleted ${header.name}`, 2000, "warning");
		}

        setIsOpen(false)
	};

	const ref = useRef();
	useOnClickOutside(ref, () => {
		setIsOpen(false);
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
					<button className="btn-normal-text" onClick={() => setIsOpen(false)}>cancel</button>
					<button className="btn-black" onClick={deletePackage} >confirm</button>
				</div>
			</div>
		</Modal>
	);
};

export default Confirm;

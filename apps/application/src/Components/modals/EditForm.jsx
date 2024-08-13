import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Input from "../Core/Form/Input";
import { RiCloseFill } from "react-icons/ri";
import Selector from "../Core/Form/Selector";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { GoPackage } from "react-icons/go";
import { BiEdit } from "react-icons/bi";
import ButtonBlack from "../Core/ButtonBlack";
import useEscape from "../../Hooks/useEscape";
import useEnter from "../../Hooks/useEnter";
import notify from "../../util/notify";

const EditForm = ({ isOpen, setIsOpen, header, reloadPackage }) => {
	const [courier, setCourier] = useState(header.courier);
	const [name, setName] = useState(header.name);
	const [trackingNumber, setTrackingNumber] = useState(header.trackingNumber);
	const [errors, setErrors] = useState({
		courier: null,
		name: null,
		trackingNumber: null,
	});

	const handleSubmit = async () => {
		const valid = verify();
		if (!valid) {
			return "error";
		}

		const result = await editPackage();
		if (result) {
			setIsOpen(false);
			return;
		}

		return "error";
	};

	const verify = () => {
		const tempErrors = { courier: null, name: null, trackingNumber: null };

		if (name.length > 20) {
			tempErrors.name = "name must be less than 20 characters";
		}
		if (name.length === 0) {
			tempErrors.name = "name is required";
		}
		if (
			["UPS", "USPS", "FEDEX", "DHL"].indexOf(courier.toUpperCase()) ===
			-1
		) {
			tempErrors.courier = "courier is required";
		}
		if (trackingNumber.length === 0) {
			tempErrors.trackingNumber = "tracking number is required";
		}

		setErrors(tempErrors);

		if (
			tempErrors.courier === null &&
			tempErrors.name === null &&
			tempErrors.trackingNumber === null
		) {
			return true;
		}

		return false;
	};

	const editPackage = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_API_URL}/api/update`,
			{
				credentials: "include",
				method: "POST",
				body: JSON.stringify({
					email: localStorage.getItem("email"),
					id: localStorage.getItem("id"),
					packageId: header.id,
					name: name,
					trackingNumber: trackingNumber,
					courier: courier,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
				},
			}
		);

		if (response.status === 200) {
			setIsOpen(false);
			notify(`successfully edited ${header.name}`, 2000, "success");
			reloadPackage(header.index);
			return;
		}
		const jsonResponse = await response.json();
		notify(jsonResponse.message, 2000, "warning");
		console.log(jsonResponse);
	};

	const ref = useRef();
	useOnClickOutside(ref, () => setIsOpen(false));

	// useEnter(() => {handleSubmit()})
	useEscape(() => {
		setIsOpen(false);
	});
	return (
		<Modal>
			<div className="add-form" ref={ref}>
				<button
					className="btn-close btn-black"
					onClick={() => {
						setIsOpen(false);
					}}
				>
					<RiCloseFill />
				</button>
				<div className="header">
					<div>
						<GoPackage />
						<BiEdit />
					</div>
					<h1>Edit Package</h1>
					<p>change your package details</p>
				</div>
				<Input
					placeholder={"name"}
					value={name}
					setValue={setName}
					type="text"
					autoFocus={true}
					error={errors.name}
				/>
				<Input
					placeholder={"tracking number"}
					value={trackingNumber}
					setValue={setTrackingNumber}
					type="text"
					error={errors.trackingNumber}
				/>
				<Selector
					placeholder="courier"
					options={["UPS", "USPS", "FedEx", "DHL"]}
					selected={courier}
					setSelected={setCourier}
					error={errors.courier}
				/>
				<button
					className="btn-normal-text"
					onClick={() => {
						setIsOpen(false);
					}}
				>
					cancel
				</button>
				<ButtonBlack onClick={handleSubmit} errors={true}>
					save
				</ButtonBlack>
			</div>
		</Modal>
	);
};

export default EditForm;

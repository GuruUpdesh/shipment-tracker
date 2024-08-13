import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Input from "../Core/Form/Input";
import { RiCloseFill } from "react-icons/ri";
import Selector from "../Core/Form/Selector";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { GoPackage } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import ButtonBlack from "../Core/ButtonBlack";
import useEscape from "../../Hooks/useEscape";
import ButtonText from "../Core/ButtonText";
import useEnter from "../../Hooks/useEnter";
import notify from "../../util/notify";

const AddForm = ({ isOpen, setIsOpen, addLoadingPackage }) => {
	const [courier, setCourier] = useState("");
	const [name, setName] = useState("");
	const [trackingNumber, setTrackingNumber] = useState("");
	const [errors, setErrors] = useState({
		courier: null,
		name: null,
		trackingNumber: null,
	});

	const handleSubmit = async () => {
		console.log(courier, name, trackingNumber);
		const valid = verify();
		if (!valid) {
			return "error";
		}

		const result = await createPackage();
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
		if (["UPS", "USPS", "FedEx", "DHL"].indexOf(courier) === -1) {
			tempErrors.courier = "courier is required";
		}
		if (trackingNumber.length === 0) {
			tempErrors.trackingNumber = "tracking number is required";
		}

		setErrors(tempErrors);

		if (tempErrors.courier === null && tempErrors.name === null && tempErrors.trackingNumber === null) {
			return true;
		}

		return false;
	};

	const createPackage = async () => {
		const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/add`, {
			credentials: "include",
			method: "PUT",
			body: JSON.stringify({
				email: localStorage.getItem("email"),
				id: localStorage.getItem("id"),
				name: name,
				trackingNumber: trackingNumber,
				courier: courier,
			}),
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
			},
		});

		const jsonResponse = await response.json();

		if (response.status === 201) {
			addLoadingPackage(jsonResponse.packageData);
			notify(`added ${name}`, 2000, "success");
			return true;
		} else {
			notify(jsonResponse.message, 2000, "warning");
			return false;
		}
	};

	const ref = useRef();
	useOnClickOutside(ref, () => setIsOpen(false));
	useEnter(() => {
		if (
			!document.activeElement.className.includes("btn") &&
			document.activeElement.className !== "option" &&
			!document.activeElement.className.includes("select")
		) {
			ref.current.children[6].click();
		}
	});

	useEscape(() => {
		setIsOpen(false);
	});
	return (
		<Modal>
			<div className="add-form" ref={ref}>
				<ButtonBlack className="btn-close" onClick={() => setIsOpen(false)}>
					<RiCloseFill />
				</ButtonBlack>
				<div className="header">
					<div>
						<GoPackage />
						<AiFillPlusCircle />
					</div>
					<h1>Add Package</h1>
					<p>fill out your package details to start tracking</p>
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
				<ButtonText onClick={() => setIsOpen(false)}>cancel</ButtonText>
				<ButtonBlack className="btn-add" onClick={handleSubmit} errors={true} load={true}>
					add
				</ButtonBlack>
			</div>
		</Modal>
	);
};

export default AddForm;

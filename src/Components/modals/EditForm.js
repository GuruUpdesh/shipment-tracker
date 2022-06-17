import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Input from "../Form/Input";
import { RiCloseFill } from "react-icons/ri";
import Selector from "../Form/Selector";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { GoPackage } from "react-icons/go";
import { AiFillPlusCircle} from "react-icons/ai";

const EditForm = ({ isOpen, setIsOpen, header }) => {
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
      return;
    }

    await createPackage();

    setIsOpen(false);
  };

  const verify = () => {
    const tempErrors = { courier: null, name: null, trackingNumber: null };

    if (name.length > 20) {
      tempErrors.name = "name must be less than 20 characters";
    }
    if (name.length === 0) {
      tempErrors.name = "name is required";
    }
    if (["UPS", "USPS", "FEDEX", "DHL"].indexOf(courier.toUpperCase()) === -1) {
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

  const createPackage = async () => {
    const response = await fetch("/api/update", {
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
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));

  const [x, setX] = useState(-500);
  const [y, setY] = useState(-100);
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
          <AiFillPlusCircle />

          </div>
          <h1>Edit Package</h1>
          <p>change your package details</p>
        </div>
        <Input
          placeholder={"name"}
          value={name}
          setValue={setName}
          type="text"
        />
        <p>{errors.name}</p>
        <Input
          placeholder={"tracking number"}
          value={trackingNumber}
          setValue={setTrackingNumber}
          type="text"
        />
        <p>{errors.trackingNumber}</p>
        <Selector
          placeholder="courier"
          options={["UPS", "USPS", "FedEx", "DHL"]}
          selected={courier}
          setSelected={setCourier}
        />
        <p>{errors.courier}</p>
        <button
          className="btn-normal-text"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          cancel
        </button>
        <button
          className="btn-black"
          onClick={(e) => {
            let bounds = e.target.getBoundingClientRect()
            setX(e.screenX - bounds.left);
            setY(e.clientY - bounds.top);
            handleSubmit();
          }}
        >
          <div className="pulse" style={{"top": y, "left": x}}></div>
          save
        </button>
      </div>
    </Modal>
  );
};

export default EditForm;
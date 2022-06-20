import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Input from "../Form/Input";
import { RiCloseFill } from "react-icons/ri";
import Selector from "../Form/Selector";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { GoPackage } from "react-icons/go";
import { AiFillPlusCircle} from "react-icons/ai";
import ButtonBlack from "../ButtonBlack";
import useEscape from "../../Hooks/useEscape";
import useEnter from "../../Hooks/useEnter";


const AddForm = ({ isOpen, setIsOpen, notify, addLoadingPackage }) => {
  const [courier, setCourier] = useState("");
  const [name, setName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [errors, setErrors] = useState({
    courier: null,
    name: null,
    trackingNumber: null,
  });

  const handleSubmit = async () => {
    console.log(courier, name, trackingNumber)
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
    if (["UPS", "USPS", "FedEx", "DHL"].indexOf(courier) === -1) {
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
    const response = await fetch("/api/add", {
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
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    });

    const jsonResponse = await response.json();
    
    if (response.status === 201) {
      addLoadingPackage(jsonResponse.packageData)
      notify(`added ${name}`, 2000, "success")
    } else {
      notify(jsonResponse.message, 2000, "warning")
    }
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  
  // useEnter(() => {handleSubmit()})
  useEscape(() => {setIsOpen(false)})
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
          <h1>Add Package</h1>
          <p>fill out your package details to start tracking</p>
        </div>
        <Input
          placeholder={"name"}
          value={name}
          setValue={setName}
          type="text"
          autoFocus={true}
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
        <ButtonBlack onClick={handleSubmit}>
          add
        </ButtonBlack>
      </div>
    </Modal>
  );
};

export default AddForm;

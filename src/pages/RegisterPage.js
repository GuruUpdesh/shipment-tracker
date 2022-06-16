import React, { useState } from "react";
import Input from "../Components/Form/Input";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="header">
          <h3>register</h3>
          <p>Please enter your details to sign up</p>
        </div>
        <Input
          placeholder={"name"}
          value={name}
          setValue={setName}
          type={"text"}
        />
        <Input
          placeholder={"email"}
          value={email}
          setValue={setEmail}
          type={"text"}
        />
        <Input
          placeholder={"password"}
          value={password}
          setValue={setPassword}
          type={"password"}
        />
        <button className="btn-black">register</button>
        <p>already have an account?</p>
        <button
          className="btn-normal-text"
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

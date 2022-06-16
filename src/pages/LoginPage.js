import React, { useState } from "react";
import Input from "../Components/Form/Input";
import { useNavigate } from "react-router-dom";
import {BsArrowLeftSquareFill} from "react-icons/bs";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <button className="btn-close">
          <BsArrowLeftSquareFill />
        </button>
        <div className="header">
        <h3>Welcome Back!</h3>
        <p>please login to continue</p>

        </div>
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
        <button className="btn-black">login</button>
        <p>don't have an account?</p>
        <button
          className="btn-normal-text"
          onClick={() => {
            navigate("/register");
          }}
        >
          create account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

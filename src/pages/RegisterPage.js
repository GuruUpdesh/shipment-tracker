import React, { useState } from "react";
import Input from "../Components/Form/Input";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  })
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const valid = verify()
    if (!valid) {
      return;
    }

    await register()
  }

  const verify = () => {
    const tempErrors = {name: null, email: null, password: null}

    if (password.length < 6) {
      tempErrors.password = "password must be at least 6 characters"
    }

    if (tempErrors.name === null && tempErrors.email === null && tempErrors.password === null) {
      return true
    }
    
    return false
  }

  const register = async () => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.status === 201) {
      navigate("/login")
    }
  }


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
        <button className="btn-black" onClick={handleSubmit}>register</button>
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

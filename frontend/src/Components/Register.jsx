import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();

  const validateFirstName = (value) => {
    setFirstName(value);
    setFirstNameError(/^[A-Za-z]+$/.test(value) ? "" : "Only letters allowed.");
  };

  const validateLastName = (value) => {
    setLastName(value);
    setLastNameError(/^[A-Za-z]+$/.test(value) ? "" : "Only letters allowed.");
  };

  const validateEmail = (value) => {
    setEmail(value);
    setEmailError(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email."
    );
  };

  const validatePhone = (value) => {
    setPhoneNumber(value);
    setPhoneError(
      /^0\d{9}$/.test(value) ? "" : "Must be 10 digits & start with 0."
    );
  };

  const validatePassword = (value) => {
    setPassword(value);
    setPasswordError(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(value)
        ? ""
        : "At least 8 chars, 1 special char, 1 number."
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      passwordError
    ) {
      Swal.fire("Please fix validation errors.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
        password,
        role,
      });
      setUser({ username, role });
      Swal.fire("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      Swal.fire("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <br />
      <br />
      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-light"
        style={{ backgroundColor: "#f5f8fc", overflowY: "auto" }}
      >
        <div
          className="container login-container p-0 d-flex shadow-lg rounded-4 overflow-hidden"
          style={{ maxWidth: "900px" }}
        >
          <div className="row w-100">
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center text-success fw-bold">
              <h2 className="mb-4 fw-bold text-success text-center mt-2">
                <img
                  src="mediheavenlogo.png"
                  alt="Health Icon"
                  width="40"
                  height="40"
                  className="me-2"
                />
                MediHeaven
              </h2>
              <p className="text-center text-secondary">Create your account</p>
              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => validateFirstName(e.target.value)}
                        required
                      />
                      <small className="text-danger">{firstNameError}</small>
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        required
                      />
                      <small className="text-danger">{emailError}</small>
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                      />
                      <small className="text-danger">{passwordError}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => validateLastName(e.target.value)}
                        required
                      />
                      <small className="text-danger">{lastNameError}</small>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => validatePhone(e.target.value)}
                        required
                      />
                      <small className="text-danger">{phoneError}</small>
                    </div>
                    {/* <div className="mb-3">
                      <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div> */}
                    <div className="mb-3">
                      <select
                        className="form-select form-select-lg border-success"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-pill py-2"
                >
                  Register
                </button>
              </form>
              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <a href="/login" className="text-success">
                    Login here
                  </a>
                </small>
              </div>
            </div>
            <div
              className="col-md-6 d-none d-md-block position-relative"
              style={{
                backgroundImage: `url("/Images/login.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "ellipse(90% 100% at 50% 50%)",
                height: "100%",
              }}
            ></div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Register;

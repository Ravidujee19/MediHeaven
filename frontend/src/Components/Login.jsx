import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaLock, FaUser } from "react-icons/fa";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { emailOrUsername, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setUser({ username: emailOrUsername, role: response.data.role });

        Swal.fire("Login successful!");

        navigate(`/dashboard/${response.data.role}`);
      }
    } catch (err) {
      Swal.fire("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="container login-container p-0 d-flex shadow-lg rounded-4 overflow-hidden bg-white"
        style={{ maxWidth: "900px" }}
      >
        {/* Image Section */}
        <div
          className="image-section d-none d-md-block w-50 position-relative"
          style={{
            backgroundImage: "url('/Images/login.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
           
            clipPath: "ellipse(90% 100% at 50% 50%)"
          }}
        ></div>

        {/* Login Form */}
        <div className="p-5 w-50 d-flex flex-column align-items-center text-center">
          <img
            src="mediheavenlogo.png"
            alt="Health Icon"
            width="50"
            height="50"
            className="mb-3"
          />
          <h3 className="text-success fw-bold">MediHeaven</h3>
          <br></br>
          <form onSubmit={handleLogin} className="d-flex flex-column align-items-center w-100">
            <div className="mb-3 w-100">
              <label className="form-label">Email Or Username</label>
              <div className="input-group">
                {/* <span className="input-group-text bg-light">
                  <FaUser className="text-secondary" />
                </span> */}
                <input
                  type="text"
                  // className="form-control"
                  placeholder="Email or Username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 w-100">
              <label className="form-label">Password</label>
              <div className="input-group">
                {/* <span className="input-group-text bg-light">
                  <FaLock className="text-secondary" size={20} />
                </span> */}
                <input
                  type="password"
                  // className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success w-75 rounded-pill py-2">
               Login
              </button>
          </form>

          <div className="mt-3">
            <small className="text-secondary">
              Don't have an account? <a href="/register" className="text-primary">Sign up</a>
            </small>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
export default Login;

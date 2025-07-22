import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./add.css";
import AdminSideNav from '../AdminsideNav';

function AddDoctorForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    Speciality: "",
    Description: "",
    Amount: "",
    Phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict name and speciality to letters and spaces only
    if (name === "name" || name === "Speciality") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    // Restrict phone to numbers only and maximum 10 digits
    if (name === "Phone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    if (name === "Amount") {
      if (!/^\d{0,5}$/.test(value)) return; // Only digits, max 5
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "" || !/^[A-Za-z\s]+$/.test(inputs.name)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name can only contain letters and spaces.",
      });
    }

    if (inputs.Speciality.trim() === "" || !/^[A-Za-z\s]+$/.test(inputs.Speciality)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Speciality",
        text: "Speciality can only contain letters and spaces.",
      });
    }

    if (!validatePhone(inputs.Phone)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must be exactly 10 digits.",
      });
    }

    if (!validateEmail(inputs.email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    sendRequest().then(() => navigate('/doctorsDetails'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/doctors", {
      name: String(inputs.name),
      email: String(inputs.email),
      Speciality: String(inputs.Speciality),
      Description: String(inputs.Description),
      Amount: String(inputs.Amount),
      Phone: Number(inputs.Phone),
    });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSideNav />
      <div className="container mt-4 flex-grow-1">
    <div className='background-for-admin'>
      <div className="doctor-form-container">
        <h1 className="doctor-form-title">Doctor Details</h1>
        <form onSubmit={handleSubmit} className="doctor-form-elements">
          <div className="doctor-form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              placeholder="Only letters allowed"
            />
          </div>

          <div className="doctor-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-form-group">
            <label>Speciality:</label>
            <input
              type="text"
              name="Speciality"
              value={inputs.Speciality}
              onChange={handleChange}
              required
              placeholder="Only letters allowed"
            />
          </div>

          <div className="doctor-form-group">
            <label>Description:</label>
            <textarea
              name="Description"
              value={inputs.Description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-form-group">
            <label>Channeling charge:</label>
            <input
              type="number"
              name="Amount"
              value={inputs.Amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="Phone"
              value={inputs.Phone}
              onChange={handleChange}
              required
              placeholder="10-digit phone number"
            />
          </div>

          <div className="doctor-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default AddDoctorForm;

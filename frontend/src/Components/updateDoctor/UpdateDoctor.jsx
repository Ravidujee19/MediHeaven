import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateDoctor.css';
import Footer from "../Footer";

function UpdateDoctor() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    Speciality: "",
    Description: "",
    Amount: "",
    Phone: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Doctor ID:", id); // Check if id is correct

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/doctors/${id}`);
        console.log("API Response:", res.data); // Debugging
        if (res.data && res.data.doctor) {
          setInputs(res.data.doctor);
        } else {
          console.error("Error: 'user' object is missing in response");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/doctors/${id}`, {
      name: String(inputs.name),
      email: String(inputs.email),
      Speciality: String(inputs.Speciality),
      Description: String(inputs.Description),
      Amount: String(inputs.Amount),
      Phone: Number(inputs.Phone),
    });
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Inputs:", inputs);
    sendRequest().then(() => navigate("/doctorsDetails"));
  };

  return (
    <div>
    <div>
      <h1>Update Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={inputs?.name || ""} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={inputs?.email || ""} onChange={handleChange} required />
        </div>
        <div>
          <label>Speciality:</label>
          <input type="text" name="Speciality" value={inputs?.Speciality || ""} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="Description" value={inputs?.Description || ""} onChange={handleChange} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="Amount" value={inputs?.Amount || ""} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="Phone" value={inputs?.Phone || ""} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default UpdateDoctor;

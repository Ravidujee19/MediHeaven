import React from 'react';
import "./displayForPatients.css"
import { Link } from "react-router-dom";

function DisplayForPDoctor(props) {
  const { name, email, Speciality, Description, Amount, Phone } = props.doctor;

  return (
    <div className="doctor-dashboard-container">
      <h1 className="doctor-title">Doctor-Details</h1>
      <div className="doctor-image-container">
  <img
    src={
      process.env.PUBLIC_URL +
      `/images/${(Speciality?.toLowerCase() || 'default')}.png`
    }
    alt={Speciality || "Doctor Default"}
    className="doctor-image"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = process.env.PUBLIC_URL + "/images/default.jpg";
    }}
  />
</div>
  
      <div className="doctor-details">
        <p><strong>Name: </strong> {name}</p>
        <p><strong>Email: </strong> {email}</p>
        <p><strong>Speciality: </strong> {Speciality}</p>
        <p><strong>Description: </strong> {Description}</p>
        <p><strong>Amount: </strong> {Amount}</p>
        <p><strong>Phone: </strong> {Phone}</p>
      </div>
  
      <div className="button-container">
        <button className="book-appointment-button">
          <Link to="/AddDoctorAppointment">Book an Appointment</Link>
        </button>
      </div>
    </div>
  );
  
}

export default DisplayForPDoctor;

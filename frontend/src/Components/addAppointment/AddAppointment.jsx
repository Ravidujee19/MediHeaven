import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddAppointment.css';
import Footer from "../Footer"

function AddAppointment() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    patientName: "",
    email: "",
    age: "",
    weight: "",
    date: "",
    time: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    const today = new Date().toISOString().split('T')[0];
    
    const trimmedName = inputs.patientName.trim();
    const trimmedEmail = inputs.email.trim();
    const trimmedReason = inputs.reason.trim();

    if (!trimmedName) {
      errors.patientName = "Patient name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.patientName = "Name must only contain letters and spaces";
    }

    if (!trimmedEmail) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Invalid email format";
    }

    if (!inputs.age || inputs.age <= 0 || inputs.age > 120) {
      errors.age = "Age must be between 1 and 120";
    }

    if (!inputs.weight || inputs.weight <= 0) {
      errors.weight = "Valid weight is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(inputs.weight)) {
      errors.weight = "Weight must be a number (up to 2 decimal places)";
    }

    if (!inputs.date) {
      errors.date = "Date is required";
    } else if (inputs.date < today) {
      errors.date = "Cannot book past dates";
    }

    if (!inputs.time) {
      errors.time = "Time is required";
    } else {
      const [hour] = inputs.time.split(":").map(Number);
      if (hour < 8 || hour > 18) {
        errors.time = "Time must be between 08:00 and 18:00";
      }
    }

    if (!trimmedReason) {
      errors.reason = "Reason is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate patientName: Only letters and spaces allowed
    if (name === "patientName" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Do not update if the input is invalid
    }

    

    // Validate age: Ensure age is a number between 1 and 120
    if (name === "age" && (value < 1 || value > 120 || !/^\d+$/.test(value))) {
      return; // Do not update if the input is invalid
    }

 // Validate weight: Ensure weight is a number between 1 and 300, and optionally supports decimals
if (name === "weight" && (!/^\d+(\.\d{1,2})?$/.test(value) || value <= 0 || value > 300)) {
  return; // Do not update if the input is invalid
}


    // Validate date: Ensure the date is not in the past
    if (name === "date") {
      const today = new Date().toISOString().split('T')[0];
      if (value < today) {
        return; // Do not update if the input is invalid
      }
    }

    // Validate time: Ensure time is between 08:00 and 18:00
    if (name === "time") {
      const [hour] = value.split(":").map(Number);
      if (hour < 8 || hour > 18) {
        return; // Do not update if the input is invalid
      }
    }

    // Update the state with the new value
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    sendRequest()
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Appointment booked successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/Status');
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to book appointment. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/appointments", {
        patientName: inputs.patientName.trim(),
        email: inputs.email.trim(),
        age: Number(inputs.age),
        weight: Number(inputs.weight),
        date: String(inputs.date),
        time: String(inputs.time),
        reason: inputs.reason.trim(),
      });
    } catch (err) {
      console.error("Error during appointment booking:", err);
      throw new Error('Failed to add appointment');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <div>
    <div className='back4m'>
      <h1 className='title-appointment'>Appointment-Booking</h1>
      <div className='add-appointment-table'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='patient-name'>Patient Name:</label>
            <input type="text" name="patientName" value={inputs.patientName} onChange={handleChange} required />
            {errors.patientName && <p className='error'>{errors.patientName}</p>}
          </div>

          <div>
            <label className='email'>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='age'>Age:</label>
            <input type="number" name="age" value={inputs.age} onChange={handleChange} required />
            {errors.age && <p className='error'>{errors.age}</p>}
          </div>

          <div>
            <label className='weight'>Weight(KG):</label>
            <input type="number" name="weight" value={inputs.weight} onChange={handleChange} required />
            {errors.weight && <p className='error'>{errors.weight}</p>}
          </div>

          <div>
            <label className='date'>Date:</label>
            <input type="date" name="date" value={inputs.date} onChange={handleChange} required />
            {errors.date && <p className='error'>{errors.date}</p>}
          </div>

          <div>
            <label className='time'>Time:</label>
            <input type="time" name="time" value={inputs.time} onChange={handleChange} required />
            {errors.time && <p className='error'>{errors.time}</p>}
          </div>

          <div>
            <label className='reason'>Reason:</label>
            <textarea name="reason" value={inputs.reason} onChange={handleChange} required />
            {errors.reason && <p className='error'>{errors.reason}</p>}
          </div>

          <div>
            <button className='submit button' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default AddAppointment;

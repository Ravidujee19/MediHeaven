import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2
import "./PatientAppointmentHistory.css";
import Footer from "../Footer";

function PatientAppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data.appointments);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/appointments/${id}`);
          Swal.fire("Deleted!", "The appointment has been deleted.", "success");
          // Remove the deleted item from the UI
          setAppointments(appointments.filter((a) => a._id !== id));
        } catch (error) {
          Swal.fire("Error", "Could not delete the appointment.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div className="loading-message">Loading appointment history...</div>;
  }

  return (
    <div>
    <div className="appointment-history-container">
      <h1 className="appointment-title ">Appointment History</h1>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Rejection Reason</th>
            <th>Actions</th> {/* New Column */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{`A${(index + 1).toString().padStart(2, "0")}`}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.email}</td>
              <td className={`status-${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </td>
              <td>
                {appointment.status === "Rejected"
                  ? appointment.rejectionReason || "No reason provided"
                  : "N/A"}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(appointment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
}

export default PatientAppointmentHistory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './AppointmentStyles.css'; // Import the new CSS file
import { useNavigate } from "react-router-dom"; //new
import { Row, Col } from "react-bootstrap"; //new
import { FaSignOutAlt, FaHome } from "react-icons/fa"; //new

function AppointmentRecords() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});

  const navigate = useNavigate(); //new

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        setAppointments(response.data.appointments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (id, status, rejectionReason = '') => {
    try {
      let url = `http://localhost:5000/appointments/${id}`;
      url += status === "Accepted" ? "/accept" : "/reject";

      const response = await axios.patch(url, { status, rejectionReason });

      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: response.data.status } : appointment
        )
      );

      // Display a success alert
      Swal.fire({
        icon: 'success',
        title: 'Status Updated!',
        text: `The status of the appointment has been updated to ${status}.`,
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error updating status:", error);

      // Display an error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error updating the appointment status.',
        confirmButtonText: 'Try Again'
      });
    }
  };

  if (isLoading) {
    return <div className="loading-text">Loading appointments...</div>;
  }

  //new

    const handleLogout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          Swal.fire(
            "Logged Out!",
            "You have successfully logged out.",
            "success"
          );
          navigate("/login"); 
        }
      });
    };


  return (
    <div>
      <Row className="align-items-center mb-4">
    {/* Home icon on left */}
    <Col xs="auto" style={{ marginLeft: "16px" }}>
      <FaHome
        size={24}
        style={{ cursor: "pointer", color: "#198754" }}
        onClick={() => navigate("/admindashboard")} 
        title="Home"
      />
    </Col>

    {/* Title in center */}
    <Col className="text-center">
      <h1 className="text-success mb-0">Appointments</h1>
    </Col>

    {/* Logout icon on right */}
    <Col xs="auto" className="text-end" style={{ marginRight: "16px" }}>
      <FaSignOutAlt
        size={24}
        style={{ cursor: "pointer", color: "#dc3545" }}
        onClick={handleLogout}
        title="Logout"
      />
    </Col>
  </Row>
    <div className="appointment-container">
      {/* <h1 className="appointment-header">Appointments</h1> */}
      <table className="appointment-table">
        <thead>
          
          <tr>
    <th>Appointment ID</th>
    <th>Patient Name</th>
    <th>Email</th>
    <th>Reason</th> {/* Patient's reason for booking */}
    <th>Action</th>
   
   
   
    <th>Rejection Reason</th>
   
        </tr>
      </thead>
      <tbody>
  {appointments.map((appointment, index) => {
    const currentStatus = selectedStatuses[appointment._id] || appointment.status;
    const isPending = currentStatus === "Pending";
    
    return (
      <tr key={appointment._id} className={isPending ? "pending-row" : ""}>
        <td>{`A${(index + 1).toString().padStart(2, '0')}`}</td>
        <td>{appointment.patientName}</td>
        <td>{appointment.email}</td>
        <td>{appointment.reason || 'No reason provided'}</td>

        <td>
          <div className="status-select-wrapper">
            <select
              className="status-dropdown"
              value={currentStatus}
              onChange={(e) =>
                setSelectedStatuses({
                  ...selectedStatuses,
                  [appointment._id]: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            {isPending && <span className="pending-indicator">🔔</span>}
          </div>
        </td>

        <td>
          {currentStatus === "Rejected" ? (
            <input
              type="text"
              className="reason-input"
              value={
                rejectionReasons[appointment._id] !== undefined
                  ? rejectionReasons[appointment._id]
                  : appointment.rejectionReason || ""
              }
              onChange={(e) =>
                setRejectionReasons({
                  ...rejectionReasons,
                  [appointment._id]: e.target.value,
                })
              }
              placeholder="Enter rejection reason"
            />
          ) : (
            <span className="no-reason-text">N/A</span>
          )}
        </td>

        <td>
          <button
            className="update-button"
            onClick={() =>
              updateStatus(
                appointment._id,
                currentStatus,
                rejectionReasons[appointment._id] || ""
              )
            }
          >
            Submit
          </button>
        </td>
      </tr>
    );
  })}
</tbody>


      </table>
    </div>
    </div>
  );
}

export default AppointmentRecords;

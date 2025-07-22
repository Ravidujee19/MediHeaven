import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function UserViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchAppointments();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border text-primary" role="status" />
        <div>Loading appointment history...</div>
      </div>
    );
  }

  return (
    <div className="card shadow p-4">
      <h3 className="text-center text-success">Appointment History</h3>
      <br></br>
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
             
              <th>Status</th>
              <th>Rejection Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                
                <td
                  className={
                    appointment.status === "Rejected"
                      ? "text-danger fw-bold"
                      : appointment.status === "Accepted"
                      ? "text-success fw-bold"
                      : "text-secondary"
                  }
                >
                  {appointment.status}
                </td>
                <td>
                  {appointment.status === "Rejected"
                    ? appointment.rejectionReason || "No reason provided"
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserViewAppointment;

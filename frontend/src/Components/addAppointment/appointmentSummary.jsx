import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto"; // Chart.js v3+
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas for capturing the chart as an image
import Swal from "sweetalert2"; // Optional, for alert handling
// import Footer from "../Footer";
import "./AppointmentSummary.css";
import { Col } from "react-bootstrap";//new
import { FaHome, FaSignOutAlt } from "react-icons/fa"; //new
import { useNavigate } from "react-router-dom"; // new

function PatientAppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null); // Create a ref for the chart
  const chartInstance = useRef(null); // Store the chart instance
  const navigate = useNavigate(); //new one

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data.appointments);
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Appointments Loaded',
          text: 'The appointment history has been successfully loaded.',
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load appointment history. Please try again later.',
        });
      }
    };

    fetchAppointments();
  }, []); // Only fetch appointments once when the component mounts

  useEffect(() => {
    if (appointments.length === 0) return;

    // Initialize the status counts
    const statusCounts = {
      Accepted: 0,
      Rejected: 0,
      Pending: 0,
    };

    // Count each status occurrence
    appointments.forEach((appointment) => {
      if (appointment.status === "Accepted") {
        statusCounts.Accepted += 1;
      } else if (appointment.status === "Rejected") {
        statusCounts.Rejected += 1;
      } else if (appointment.status === "Pending") {
        statusCounts.Pending += 1;
      }
    });

    // Destroy the previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Access the chart canvas via the ref
    const chartCanvas = chartRef.current;
    if (chartCanvas) {
      const ctx = chartCanvas.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Accepted", "Rejected", "Pending"],
            datasets: [
              {
                label: "Appointment Status",
                data: [
                  statusCounts.Accepted,
                  statusCounts.Rejected,
                  statusCounts.Pending,
                ],
                backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
              },
            ],
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      } else {
        console.error("Failed to get canvas context.");
      }
    }
  }, [appointments]); // Re-run the effect when appointments change

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const logoPath = `${window.location.origin}/mediheavenlogo.png`;
    const headerColor = [0, 128, 0];
    const tableColumn = ["Appointment ID", "Patient Name", "Email", "Status", "Rejection Reason"];
    const tableRows = [];
  
    appointments.forEach((appointment, index) => {
      const customId = `A${(index + 1).toString().padStart(2, "0")}`;
      tableRows.push([
        customId,
        appointment.patientName,
        appointment.email,
        appointment.status,
        appointment.status === "Rejected" ? appointment.rejectionReason || "No reason provided" : "N/A",
      ]);
    });
  
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };
  
    const dateStr = new Date().toLocaleString();
    const totalPagesExp = "{total_pages_count_string}";
  
    loadImage(logoPath)
      .then((img) => {
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 52,
          styles: { fontSize: 10 },
          headStyles: { fillColor: headerColor },
          margin: { top: 40 },
          didDrawPage: function (data) {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
  
            // -- Header --
            doc.setFillColor(...headerColor);
            doc.rect(0, 0, pageWidth, 25, "F");
            doc.addImage(img, "PNG", 10, 5, 15, 15);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("MediHeaven - Appointment History", 30, 15);
  
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(230);
            doc.text(`Generated on: ${dateStr}`, 32, 22);
  
            // -- Footer --
            doc.setFillColor(...headerColor);
            doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  
            const footerText1 =
              "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
            const footerText2 = "© 2025 MediHeaven. All rights reserved.";
            const centerX1 = (pageWidth - doc.getTextWidth(footerText1)) / 2;
            const centerX2 = (pageWidth - doc.getTextWidth(footerText2)) / 2;
  
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(footerText1, centerX1, pageHeight - 13);
  
            doc.setFontSize(8);
            doc.text(footerText2, centerX2, pageHeight - 7);
  
            const pageNumber = doc.internal.getNumberOfPages();
            const text = `Page ${pageNumber} of ${totalPagesExp}`;
            const textWidth = doc.getTextWidth(text);
            doc.text(text, pageWidth - textWidth - 14, pageHeight - 7);
  
            // -- Watermark --
            doc.saveGraphicsState();
            doc.setTextColor(180);
            doc.setFontSize(40);
            doc.setFont("helvetica", "bold");
            doc.setGState(new doc.GState({ opacity: 0.3 }));
            doc.text("MediHeaven", pageWidth / 2, pageHeight / 2, {
              angle: 45,
              align: "center",
            });
            doc.restoreGraphicsState();
          },
        });
  
        if (typeof doc.putTotalPages === "function") {
          doc.putTotalPages(totalPagesExp);
        }
  
        doc.save("appointment_history.pdf");
  
        Swal.fire({
          icon: "success",
          title: "PDF Generated",
          text: "The appointment history PDF has been successfully downloaded.",
        });
      })
      .catch((err) => {
        console.error("Logo load failed", err);
        alert("PDF export failed – logo not found or blocked.");
      });
  };
  
  

  if (isLoading) {
    return <div className="loading-message">Loading appointment history...</div>;
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
    {/* Home icon on left */}
    <Col xs="auto">
      <FaHome
        size={24}
        style={{ cursor: "pointer", color: "#198754", marginLeft: "50px"}}
        onClick={() => navigate("/admindashboard")} 
        title="Home"
      />
    </Col>
     {/* Logout icon on right */}
        <Col xs="auto" className="text-end">
          <FaSignOutAlt
            size={24}
            style={{ cursor: "pointer", color: "#dc3545", marginRight: "50px"}}
            onClick={handleLogout}
            title="Logout"
          />
        </Col>
    <div className="appointment-history-container">
      
      {/* Pie Chart + Image in Same Line */}
      <div className="chart-row">
        <div className="chart-container">
          <h3>Appointment Status Distribution</h3>
          <canvas
            ref={chartRef}
            id="statusChart"
            width="300"
            height="300"
            style={{ marginBottom: "20px", maxWidth: "100%" }}
          ></canvas>
        </div>

        <div className="image-box">
          <img
            src="./Images/app.jpg" // Image path, place in public/
            alt="Status Visual"
            className="rounded-image"
          />
        </div>
      </div>

      <h1 className="appointment-title">Appointment History</h1>

      {/* PDF Download Button */}
      <div className="pdf-download">
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      {/* Appointment Table */}
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Rejection Reason</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <Footer /> */}
  </div>
);

  
}

export default PatientAppointmentHistory;

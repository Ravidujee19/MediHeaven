import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPrint, FaFilePdf, FaSignOutAlt, FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdDashboard } from "react-icons/md";


const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchBMI, setSearchBMI] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [patients, searchName, searchGender, searchAge, searchBMI]);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Patient record deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      fetchPatients();
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to delete patient. Please try again.",
      });
    }
  };

  const filterPatients = () => {
    let filtered = patients;

    if (searchName) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchGender) {
      filtered = filtered.filter(
        (p) => p.gender.toLowerCase() === searchGender.toLowerCase()
      );
    }

    if (searchAge) {
      filtered = filtered.filter((p) => p.age === parseInt(searchAge));
    }

    if (searchBMI) {
      filtered = filtered.filter((p) => {
        const bmi = parseFloat(p.bmi);
        if (searchBMI === "underweight") return bmi < 18.5;
        if (searchBMI === "normal") return bmi >= 18.5 && bmi <= 24.9;
        if (searchBMI === "overweight") return bmi >= 25 && bmi <= 29.9;
        if (searchBMI === "obese") return bmi >= 30;
        return true;
      });
    }

    setFilteredPatients(filtered);
  };

  const resetFilters = () => {
    setSearchName("");
    setSearchGender("");
    setSearchAge("");
    setSearchBMI("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const logoPath = `${window.location.origin}/mediheavenlogo.png`;
    const headerColor = [0, 128, 0];
    const tableColumn = ["Name", "Age", "Gender", "Height", "Weight", "BMI"];
    const tableRows = [];
  
    filteredPatients.forEach((patient) => {
      const patientData = [
        patient.name,
        patient.age,
        patient.gender,
        `${patient.height} cm`,
        `${patient.weight} kg`,
        patient.bmi,
      ];
      tableRows.push(patientData);
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
        // -- Styled Filter Summary --
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40);
        doc.text("Filter Summary", 14, 30);
  
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
  
        const summaryLine = `Filtered by name "${searchName || 'Any'}", gender "${searchGender || 'Any'}", age "${searchAge || 'Any'}", BMI category "${searchBMI || 'Any'}".`;
        const countLine = `Total patients matching criteria: ${filteredPatients.length}.`;
  
        doc.text(summaryLine, 14, 37);
        doc.text(countLine, 14, 44);
  
        // -- Table --
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
  
            // Header
            doc.setFillColor(...headerColor);
            doc.rect(0, 0, pageWidth, 25, "F");
            doc.addImage(img, "PNG", 10, 5, 15, 15);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("MediHeaven - Patient Report", 30, 15);
  
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(230);
            doc.text(`Generated on: ${dateStr}`, 32, 22);
  
            // Footer
            doc.setFillColor(...headerColor);
            doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  
            const footerText1 =
              "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven25@gmail.com";
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
  
            // Watermark
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
  
        doc.save("filtered_patients.pdf");
      })
      .catch((err) => {
        console.error("Logo load failed", err);
        alert("PDF export failed – logo not found or blocked.");
      });
  };
  
  const navigate = useNavigate();
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
    <>
      <div className="container mt-4">
      <Row className="align-items-center mb-4">
    {/* Home icon on left */}
    <Col xs="auto">
      <FaHome
        size={24}
        style={{ cursor: "pointer", color: "#198754" }}
        onClick={() => navigate("/admindashboard")} 
        title="Home"
      />
    </Col>

    {/* Title in center */}
    <Col className="text-center">
      <h3 className="text-success mb-0">Health Details List</h3>
    </Col>

    {/* Logout icon on right */}
    <Col xs="auto" className="text-end">
      <FaSignOutAlt
        size={24}
        style={{ cursor: "pointer", color: "#dc3545" }}
        onClick={handleLogout}
        title="Logout"
      />
    </Col>
  </Row>

        <div className="row">
          <Form>
            <Row className="gy-3 gx-4">
              <Col lg={3} md={6}>
                <Form.Group controlId="searchName">
                  <Form.Label className="fw-semibold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="searchGender">
                  <Form.Label className="fw-semibold">Gender</Form.Label>
                  <Form.Select
                    value={searchGender}
                    onChange={(e) => setSearchGender(e.target.value)}
                  >
                    <option value="">All</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={2} md={6}>
                <Form.Group controlId="searchAge">
                  <Form.Label className="fw-semibold">Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter age"
                    value={searchAge}
                    min={5}
                    max={100}
                    onChange={(e) => setSearchAge(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="searchBMI">
                  <Form.Label className="fw-semibold">BMI Category</Form.Label>
                  <Form.Select
                    value={searchBMI}
                    onChange={(e) => setSearchBMI(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="underweight">Underweight</option>
                    <option value="normal">Normal</option>
                    <option value="overweight">Overweight</option>
                    <option value="obese">Obese</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button
                variant="success"
                onClick={resetFilters}
                size="sm"
                style={{ minWidth: "100px" }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>

        {/* Toolbar */}
        {filteredPatients.length > 0 && (
          <div
            className="d-flex justify-content-between align-items-center mb-3 px-3 py-2"
            style={{
              position: "sticky",
              top: 70,
              zIndex: 999,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-muted">
              Showing <strong>{filteredPatients.length}</strong> patient
              {filteredPatients.length > 1 ? "s" : ""}
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => window.print()}
              >
                <FaPrint className="me-1" /> Print
              </Button>
              <Button variant="outline-danger" size="sm" onClick={downloadPDF}>
                <FaFilePdf className="me-1" /> PDF
              </Button>
            </div>
          </div>
        )}

        {/* Patient Cards */}
        <div className="row">
          {filteredPatients.length === 0 ? (
            <div className="text-center text-danger fs-5 mt-5">
              No patients found matching the filters.
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div className="col-md-4 mb-4" key={patient._id}>
                <Card className="shadow h-100">
                  <Card.Body>
                    <h5 className="card-title text-success">Patient Info</h5>
                    <p>
                      <strong>Name:</strong> {patient.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {patient.age}
                    </p>
                    <p>
                      <strong>Gender:</strong> {patient.gender}
                    </p>
                    <p>
                      <strong>Height:</strong> {patient.height} cm
                    </p>
                    <p>
                      <strong>Weight:</strong> {patient.weight} kg
                    </p>
                    <p>
                      <strong>BMI:</strong> {patient.bmi} ({patient.bmiCategory}
                      )
                    </p>
                    <p>
                      <strong>Suggestions:</strong> {patient.suggestions}
                    </p>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between px-2">
                    <Link
                      to={`/update-patient/${patient._id}`}
                      className="btn btn-success btn-sm px-3 flex-fill me-2"
                      style={{ maxWidth: "48%" }}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      className="px-3 flex-fill"
                      style={{ maxWidth: "48%" }}
                      onClick={() => handleDelete(patient._id)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PatientList;

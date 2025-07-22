import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, Modal } from "react-bootstrap";
import AdminSideNav from "./AdminsideNav";

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [viewFile, setViewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1); // Zoom state

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/prescriptions");
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleDownload = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to download this prescription?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Download it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/prescriptions/download/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        prescriptions.find((p) => p._id === id).filename
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire("Downloaded!", "The prescription has been downloaded.", "success");
    } catch (error) {
      console.error("Error downloading prescription:", error);
      Swal.fire("Error!", "Failed to download the prescription.", "error");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/prescriptions/download/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setViewFile(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error viewing prescription:", error);
      Swal.fire("Error!", "Failed to load the prescription.", "error");
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this prescription!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/prescriptions/delete/${id}`);
      fetchPrescriptions();

      Swal.fire("Deleted!", "The prescription has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting prescription:", error);
      Swal.fire("Error!", "Failed to delete the prescription.", "error");
    }
  };

  const handleCheck = (id) => {
    setPrescriptions((prev) =>
      prev.map((prescription) =>
        prescription._id === id
          ? { ...prescription, checked: !prescription.checked }
          : prescription
      )
    );
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSideNav />

      {/* Main Content */}
      <div className="container mt-4 flex-grow-1">
      <div className="card p-4 shadow">
      <h3 class="text-success text-center">All Prescriptions</h3>


        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Upload Date</th>
              <th>Checked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.filename}</td>
                <td>{new Date(prescription.uploadDate).toLocaleString()}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={prescription.checked || false}
                    onChange={() => handleCheck(prescription._id)}
                  />
                </td>
                <td>
                  <Button variant="info" onClick={() => handleView(prescription._id)}>
                    View
                  </Button>{" "}
                  <Button variant="success" onClick={() => handleDownload(prescription._id)}>
                    Download
                  </Button>{" "}
                  <Button
                    variant="danger"
                    disabled={!prescription.checked}
                    onClick={() => handleDelete(prescription._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Viewing Prescriptions */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prescription Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewFile && (
            <>
              {viewFile.includes("application/pdf") ? (
                <embed
                  src={viewFile}
                  width="100%"
                  height="500px"
                  type="application/pdf"
                />
              ) : (
                <>
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    style={{ minHeight: "500px" }}
                  >
                    <img
                      src={viewFile}
                      alt="Prescription"
                      className="img-fluid"
                      style={{
                        transform: `scale(${zoom})`,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={handleZoomOut}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={resetZoom}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={handleZoomIn}
                    >
                      +
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
      </div>
    </div>
    </div>
  );
};

export default AdminPrescriptions;

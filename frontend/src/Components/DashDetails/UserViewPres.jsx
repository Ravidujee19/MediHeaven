import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Modal } from "react-bootstrap";

const UserViewPres = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [viewFile, setViewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1); // Zoom state

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/prescriptions"
      );
      setPrescriptions(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch prescriptions", "error");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/prescriptions/download/${id}`,
        {
          responseType: "blob",
        }
      );

      const fileType = response.data.type;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setViewFile(url);
      setShowModal(true);
      setZoom(1); // Reset zoom when a new file is viewed
    } catch (error) {
      Swal.fire("Error", "Failed to view file", "error");
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <div className="card shadow p-4">
      <h3 className="text-center text-success">Your Prescriptions</h3>
      <Table
        striped
        bordered
        hover
        className="mt-4"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <thead>
          <tr>
            <th>Filename</th>
            <th>Upload Date</th>
            <th>Upload Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td>{prescription.filename}</td>
              <td>
                {new Date(prescription.uploadDate).toISOString().slice(0, 10)}
              </td>
              <td>
                {(() => {
                  const date = new Date(prescription.uploadDate);
                  const hours = date.getHours().toString().padStart(2, "0");
                  const minutes = date.getMinutes().toString().padStart(2, "0");
                  const seconds = date.getSeconds().toString().padStart(2, "0");

                  return `${hours}:${minutes}:${seconds}`;
                })()}
              </td>

              <td>
                <Button className="bg-success text-white"
                  variant="info"
                  onClick={() => handleView(prescription._id)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Viewing Prescriptions */}
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
  );
};

export default UserViewPres;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table, Form, Modal } from "react-bootstrap";
import Footer from "./Footer";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [file, setFile] = useState(null);
  const [viewFile, setViewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire("Warning", "Please select a file before uploading", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/api/prescriptions/upload",
        formData
      );
      Swal.fire("Success", "File uploaded successfully", "success");
      fetchPrescriptions();
    } catch (error) {
      Swal.fire("Error", "File upload failed", "error");
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/prescriptions/download/${id}`,
        {
          responseType: "blob",
        }
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

      Swal.fire("Success", "File downloaded successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to download file", "error");
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

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setViewFile(url);
      setShowModal(true);
    } catch (error) {
      Swal.fire("Error", "Failed to view file", "error");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/prescriptions/delete/${id}`);
    fetchPrescriptions();
  };

  // const handleCheck = (id) => {
  //   setPrescriptions((prev) =>
  //     prev.map((prescription) =>
  //       prescription._id === id
  //         ? { ...prescription, checked: !prescription.checked }
  //         : prescription
  //     )
  //   );
  // };

  return (
    <>
    <div className="container mt-4 card p-4 shadow mt-4">
      <h2>Prescriptions</h2>
      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCheckbox" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Checked"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={!isChecked}>
          Upload
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td>{prescription.filename}</td>
              <td>{new Date(prescription.uploadDate).toLocaleString()}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleView(prescription._id)}
                >
                  View
                </Button>{" "}
                <Button
                  variant="success"
                  onClick={() => handleDownload(prescription._id)}
                >
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
                <img src={viewFile} alt="Prescription" className="img-fluid" />
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
    <br></br> <br></br>
    <Footer/>
    </>
  );
};

export default Prescriptions;

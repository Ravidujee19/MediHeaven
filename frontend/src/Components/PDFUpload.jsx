import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import Footer from "./Footer";

const PDFUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      Swal.fire('Please select a file and enter a title');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);

    try {
      const response = await axios.post('http://localhost:5000/api/pdfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('PDF uploaded successfully');
      console.log(response.data);
    } catch (err) {
      Swal.fire('Error uploading PDF');
      console.error(err);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-4">Add Your Report</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">PDF Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter PDF title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Choose PDF</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-success btn-sm w-50">
    Upload
  </button>
</div>

        </form>
        {message && <p className="mt-3 text-success text-center">{message}</p>}
      </div>
    </div>
    <br></br><br></br>
    <Footer/>
    </>
  );
};

export default PDFUpload;
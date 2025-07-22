import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminSideNav from "./AdminsideNav";

const PDFList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pdfs");
        setPdfs(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPDFs();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/pdfs/${id}`);
      setPdfs((prev) => prev.filter((pdf) => pdf._id !== id)); // Remove from state

      Swal.fire("Deleted!", "The report has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting PDF:", err);
      Swal.fire("Error!", "Failed to delete the report.", "error");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPDFs = pdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSideNav />

      {/* Main Content */}
      <div className="container mt-5" style={{ marginLeft: "50px" }}>
        <div className="card p-4 shadow">
          <h1 className="text-center mb-4">Report List</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <ul className="list-group">
            {filteredPDFs.map((pdf) => (
              <li
                key={pdf._id}
                className="list-group-item d-flex justify-content-between align-items-center px-3"
                style={{ padding: "12px 16px" }} 
              >
                <div className="d-flex align-items-center">
                  <strong>{pdf.title}</strong> - {pdf.name}
                </div>
                <div className="d-flex">
                  <button
                    className="btn btn-success btn-sm me-2"
                    style={{ width: "90px", height: "35px" }}
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/uploads/${pdf.filePath}`,
                        "_blank"
                      )
                    }
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ width: "90px", height: "35px" }}
                    onClick={() => handleDelete(pdf._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PDFList;

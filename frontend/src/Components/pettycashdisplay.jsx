import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

//to display all petty cashes

export default function DisplayPettyCash() {
  const [pettyCash, setPettyCash] = useState([]);
  const navigate = useNavigate();

  const getPettyCash = () => {
    axios
      .get("http://localhost:5000/pettyCash/")
      .then((res) => {
        setPettyCash(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //to delete a record!!!

  const deleteHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/pettyCash/delete/${id}`)
      .then(() => {
        alert("Petty cash record deleted successfully!");
        getPettyCash();
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    getPettyCash(); // Calling  getPettyCash when the component is called
  }, []);

  // Function to generate and download PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pdfWidth = doc.internal.pageSize.width;
    const pdfHeight = doc.internal.pageSize.height;
  
    const headerColor = [0, 128, 0];
    const headerHeight = 30;
    const footerHeight = 20;
  
    const logo = new Image();
    logo.src = '/mediheavenlogo.png';
  
    logo.onload = () => {
      // Header background
      doc.setFillColor(...headerColor);
      doc.rect(0, 0, pdfWidth, headerHeight, 'F');
  
      doc.addImage(logo, 'PNG', 10, 5, 20, 20);
  
      // Title in header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const headerTitle = "MediHeaven - Petty Cash Records";
      doc.text(headerTitle, (pdfWidth - doc.getTextWidth(headerTitle)) / 2, 18);
  
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
  
      // Section title below header
      const titleText = "Petty Cash Records";
      doc.text(titleText, 15, headerHeight + 10);
  
      // Underline
      const lineY = headerHeight + 12;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(15, lineY, 15 + doc.getTextWidth(titleText), lineY);
  
      const tableColumn = [
        "Date",
        "Description",
        "Amount",
        "Category",
        "Additional Notes",
      ];
      const tableRows = [];
  
      pettyCash.forEach((entry) => {
        const rowData = [
          new Date(entry.date).toLocaleDateString(),
          entry.description,
          entry.amount,
          entry.category,
          entry.additionalNotes || "N/A",
        ];
        tableRows.push(rowData);
      });
  
      // Table
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: headerHeight + 15,
        theme: "grid",
        styles: { fontSize: 10, textColor: [0, 0, 0], cellPadding: 3 },
        headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { bottom: footerHeight + 10 },
      });
  
      // Footer background
      doc.setFillColor(...headerColor);
      doc.rect(0, pdfHeight - footerHeight, pdfWidth, footerHeight, 'F');
  
      // Footer text
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      const footerText1 = "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
      const footerText2 = "© 2025 MediHeaven. All rights reserved.";
      const pageText = "Page 1 of 1";
  
      doc.text(footerText1, (pdfWidth - doc.getTextWidth(footerText1)) / 2, pdfHeight - 13);
      doc.text(footerText2, (pdfWidth - doc.getTextWidth(footerText2)) / 2, pdfHeight - 7);
      doc.text(pageText, pdfWidth - doc.getTextWidth(pageText) - 14, pdfHeight - 7);
  
      // Save
      doc.save("AllPettyCashRecords.pdf");
    };
  
    logo.onerror = () => {
      alert("Failed to load logo image.");
    };
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}

        <div
          className="col-md-3 text-white p-3 border-end"
          style={{
            height: "100%",
            maxHeight: "750px",
            overflowY: "auto",
            backgroundColor: "#0b4f28",
            marginTop: "20px",
          }}
        >
          <h2 className="text-center mb-4">Finance Panel</h2>
          <nav className="nav flex-column">
            <br></br>
            <Link
              to="/finance"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Finance dashboard
            </Link>

            <br></br>
            <Link
              to="/profit-loss"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate profit/loss statements
            </Link>

            <br></br>
            <Link
              to="/addPettyCash"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Insert new petty cash
            </Link>

            <br></br>

            <Link
              to="/displayPettyCash"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Display all petty cash
            </Link>

            <br></br>

            <Link
              to="/balance-sheet"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate balance sheet report
            </Link>
            <br></br>

            <Link
              to="/transactions"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              View all transactions done
            </Link>

            <br></br>

            <Link
              to="/payroll"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate payroll
            </Link>

            <br></br>

            <Link
               to="/dashboard/admin"
              className="nav-link btn btn-dark mb-2"
             style={{ color: "rgba(255, 255, 255, 0.7)" }}
             >
              Logout
              </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <div
            className="card shadow p-4 mt-3 w-100"
            style={{ minHeight: "700px", backgroundColor: "#fafafa" }}
          >
            <h2 className="text-center">All Petty Cash Records</h2>

            <div
              className="table-responsive"
              style={{ maxHeight: "700px", overflowY: "auto" }}
            >
              <div>
                <h2>Petty Cash Records</h2>
                {pettyCash.length > 0 ? (
                  <table border="3" class="table table-striped table-hover">
                    <thead className="thead-dark bg-info text-white">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Additional Notes</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pettyCash.map((entry, index) => (
                        <tr key={index}>
                          <td className="p-2.5">
                            {new Date(entry.date).toLocaleDateString()}
                          </td>
                          <td className="p-2.5">{entry.description}</td>
                          <td className="p-2.5">{entry.amount}</td>
                          <td className="p-2.5">{entry.category}</td>
                          <td className="p-2.5">
                            {entry.additionalNotes || "N/A"}
                          </td>

                          <td>
                            <button
                              onClick={() =>
                                navigate(`/updatePettyCash/${entry._id}`)
                              }
                              className="btn btn-success btn-sm"
                            >
                              Update
                            </button>
                            <h9> </h9>

                            <button
                              onClick={() => deleteHandler(entry._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Loading or no records found...</p>
                )}
                <br></br>
                <div className="text-end">
                  <button
                    onClick={downloadPDF}
                    className="btn btn-success mb-3"
                  >
                    Download Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

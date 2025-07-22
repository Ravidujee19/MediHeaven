import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DisplayTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const getTransactions = () => {
    axios
      .get("http://localhost:5000/transaction/")
      .then((res) => {
        setTransactions(res.data);
        setFilteredTransactions(res.data); // Initialize filtered data
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`http://localhost:5000/transaction/delete/${id}`)
      .then(() => {
        alert("Transaction record deleted successfully!");
        getTransactions();
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Filter the records based on date range
  useEffect(() => {
    let filteredData = [...transactions]; // Start with all transactions

    if (startDate && endDate) {
      filteredData = transactions.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate >= new Date(startDate) && entryDate <= new Date(endDate)
        );
      });
    }

    if (transactionType) {
      filteredData = transactions.filter(
        (entry) => entry.type === transactionType
      );
    }
    
    //to filter based on what is searched
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredData = filteredData.filter((entry) =>
        (`T00${entry.transactionID}`.toLowerCase().includes(lowerSearch) ||
          entry.type.toLowerCase().includes(lowerSearch) ||
          entry.amount.toString().includes(lowerSearch))
      );
    }

    setFilteredTransactions(filteredData);
  }, [startDate, endDate, transactionType,searchTerm, transactions]);


  // Function to generate and download PDF report for all transactions
  const downloadTransactionsPDF = () => {
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
  
      // Logo in header
      doc.addImage(logo, 'PNG', 10, 5, 20, 20);
  
      // Title in header
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      const title = "MediHeaven - Transactions Report";
      doc.text(title, (pdfWidth - doc.getTextWidth(title)) / 2, 18);
  
      // Reset text styles
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
  
      // Table title
      const titleText = "Filtered Transactions";
      doc.text(titleText, 15, headerHeight + 10);
  
      // Underline
      const lineStartX = 15;
      const lineEndX = 17 + doc.getTextWidth(titleText);
      const lineY = headerHeight + 12;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(lineStartX, lineY, lineEndX, lineY);
  
      // Prepare table data
      const tableColumn = [
        "Transaction ID",
        "Type of Transaction",
        "Amount Spent",
        "Date",
      ];
      const tableRows = [];
  
      filteredTransactions.forEach((entry) => {
        const rowData = [
          `T00${entry.transactionID}`,
          entry.type,
          entry.amount,
          new Date(entry.date).toLocaleDateString(),
        ];
        tableRows.push(rowData);
      });
  
      // Draw table
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: headerHeight + 15,
        theme: "grid",
        styles: { fontSize: 10, textColor: [0, 0, 0] },
        headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { bottom: footerHeight + 10 }, // To Ensure table doesn't overlap with footer
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
  
      // Save PDF
      doc.save("AllTransactions.pdf");
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

        {/* Table Section */}

        <div className="col-md-9">
          <h1 className="text-center">All transactions recorded</h1>

          <br></br>

          {/* Date Filter */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Download PDF Button */}
            <button
              onClick={downloadTransactionsPDF}
              className="btn btn-success mb-3"
            >
              Download Filtered Transactions
            </button>
          </div>
          <br></br>
          <div className="mb-3">
            <label>Search Transactions:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID, Type, or Amount"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="">All</option>
            <option value="InventoryPurchase">Inventory purchase</option>
            <option value="InventorySale">Inventory Sales</option>
            <option value="DoctorAppointment">Doctor Appointment</option>
            <option value="YogaAppointment">Yoga Appointments</option>
            <option value="Therapy">Therapy</option>
          </select>
          <br></br>
          <br></br>

          {filteredTransactions.length > 0 ? (
            <table border="3" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Type of transaction</th>
                  <th>Amount spent</th>
                  <th>Date</th>
                  <th> Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((entry, index) => (
                  <tr key={index}
                  >
                    <td>T00{entry.transactionID}</td>
                    <td>{entry.type}</td>
                    <td>{entry.amount}</td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>
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
            <p>No records found...</p>
          )}
        </div>
      </div>
    </div>
  );
}

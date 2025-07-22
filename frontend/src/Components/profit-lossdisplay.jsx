import React, { useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function ProfitLossDisplay() {
  const [report, setReport] = useState(null); //initially its null because at first no report is being rendered
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReport = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaction/profit-loss-statement`,
        {
          params: { startDate, endDate }, //we use params as we have to send date as parameters
        }
      );

      setReport(response.data); //since we need all data thats given by it
    } catch (err) {
      setError("Failed to fetch report");
    }
  }, [startDate, endDate]);

  /*avoid using use effect as we only need to generate reprot when press button not when date is changed
    
    useEffect(() => {
        if (startDate && endDate) {
            fetchReport();  // Fetch the report only when both dates are selected
        }
    }, [startDate, endDate, fetchReport]);

    */

    const downloadReportPDF = async () => {
      if (!report) return;
  
      const doc = new jsPDF();
      const logo = '/mediheavenlogo.png'; 
      const headerColor = [0, 128, 0];
      const dateStr = new Date().toLocaleString();
      
  
      // Define the loadImage function
      const loadImage = (url) => {
          return new Promise((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = url;
              img.onload = () => resolve(img);
              img.onerror = reject;
          });
      };
  
      try {
          const img = await loadImage(logo);
  
          // Header
          doc.setFillColor(...headerColor);
          doc.rect(0, 0, doc.internal.pageSize.width, 25, "F");
          doc.addImage(img, "PNG", 10, 5, 15, 15);
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(16);
          doc.text(`MediHeaven - Profit-loss Report(${startDate} to ${endDate})`, 30, 15);
  
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(230);
          doc.text(`Generated on: ${dateStr}`, 32, 22);
  
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
  
          doc.setFontSize(12);
          let yOffset = 45;
  
          // Income table
          const incomeData = Object.entries(report.revenueSummary).map(
              ([type, amount]) => [type, `Rs ${amount.toFixed(2)}`]
          );
          incomeData.push(["Total Income", `Rs ${report.revenueTotal.toFixed(2)}`]);
  
          doc.autoTable({
              startY: yOffset,
              head: [["Income Type", "Amount"]],
              body: incomeData,
              theme: "grid",
              margin: { top: 10 },
              styles: { fontSize: 12, cellPadding: 2 },
              headStyles: { fillColor: [0, 128, 0], textColor: 255, fontStyle: "bold" },
          });
  
          yOffset = doc.lastAutoTable.finalY + 10;
  
          // Expense table
          const expenseData = Object.entries(report.expenseSummary).map(
              ([type, amount]) => [type, `Rs ${amount.toFixed(2)}`]
          );
          expenseData.push([
              "Total Expenses",
              `Rs ${report.expenseTotal.toFixed(2)}`,
          ]);
  
          doc.autoTable({
              startY: yOffset,
              head: [["Expense Type", "Amount"]],
              body: expenseData,
              theme: "grid",
              margin: { top: 10 },
              styles: { fontSize: 12, cellPadding: 2 },
              headStyles: { fillColor: [0, 128, 0], textColor: 255, fontStyle: "bold" },
          });
  
          yOffset = doc.lastAutoTable.finalY + 10;
  
          // Profit/Loss section
          const profitOrLossText =
              report.profitOrLoss >= 0 ? "Total Profit" : "Total Loss";
          const profitOrLossAmount = `Rs ${report.profitOrLoss.toFixed(2)}`;
  
          doc.autoTable({
              startY: yOffset,
              head: [["Profit/Loss", "Amount"]],
              body: [
                  [profitOrLossText, profitOrLossAmount],
                  [
                      "Reason",
                      report.profitOrLoss >= 0
                          ? "Since Income is greater than expenses."
                          : "Since Expenses are more than revenue.",
                  ],
              ],
              theme: "grid",
              margin: { top: 10 },
              styles: { fontSize: 12, cellPadding: 2 },
              headStyles: { fillColor: [0, 128, 0], textColor: 255, fontStyle: "bold" },
          });
          // Footer
          doc.setFillColor(...headerColor);
          doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, "F");

          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          const footerText1 =
            "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
          const footerText2 = "© 2025 MediHeaven. All rights reserved.";
          const centerX1 = (doc.internal.pageSize.width - doc.getTextWidth(footerText1)) / 2;
          const centerX2 = (doc.internal.pageSize.width - doc.getTextWidth(footerText2)) / 2;

         
          doc.text(footerText1, centerX1, doc.internal.pageSize.height - 13);

          doc.setFontSize(8);
          doc.text(footerText2, centerX2, doc.internal.pageSize.height - 7);

          
          const text = `Page 1 of 1`;
          const textWidth = doc.getTextWidth(text);
          doc.text(text, doc.internal.pageSize.width - textWidth - 14, doc.internal.pageSize.height - 7);
  
          // Save the PDF
          doc.save("profit-loss-report.pdf");
      } catch (err) {
          console.error("Failed to load logo image", err);
      }
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
            <h2 className="text-center">Profit - Loss - Statement</h2>
            <br></br>
            <br></br>
            <h5>
              <p>Enter a date range to generate profit loss report</p>
            </h5>

            <br></br>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              {/* Date Filter */}
              <div className="d-flex gap-4">
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  onClick={fetchReport}
                  disabled={!startDate || !endDate} // Disable button if no start date and end date
                >
                  Filter Report
                </button>
              </div>

              {/* Download Button */}
              <button
                className="btn btn-success ml-auto"
                onClick={downloadReportPDF}
                disabled={!startDate || !endDate}
              >
                Download Report
              </button>
            </div>

            {/* Error Handling */}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display Report */}

            {report && (
              <div className="container mt-5">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th colSpan="2" className="text-start font-weight-bold">
                        Income
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.revenueSummary).map(
                      ([type, amount]) => (
                        <tr key={type}>
                          <td>{type}</td>
                          <td>Rs {amount.toFixed(2)}</td>
                        </tr>
                      )
                    )}
                    <tr className="table-secondary">
                      <td className="font-weight-bold">Total Income</td>
                      <td className="font-weight-bold">
                        Rs {report.revenueTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td colSpan="2"></td>
                    </tr>
                  </tbody>

                  <thead className="table-light">
                    <tr>
                      <th colSpan="2" className="text-start font-weight-bold">
                        Expenses
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.expenseSummary).map(
                      ([type, amount]) => (
                        <tr key={type}>
                          <td>{type}</td>
                          <td>Rs {amount.toFixed(2)}</td>
                        </tr>
                      )
                    )}
                    <tr className="table-secondary">
                      <td className="font-weight-bold">Total Expenses</td>
                      <td className="font-weight-bold">
                        Rs {report.expenseTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>

                  {/* Profit/Loss Section */}

                  <tbody>
                    <tr>
                      <td colSpan="2" className="text-center font-italic">
                        {report.profitOrLoss >= 0
                          ? "Since Income is greater than expenses."
                          : "Since Expenses are more than revenue."}
                      </td>
                    </tr>
                    <tr className="table-secondary">
                      <td style={{ fontWeight: "bold" }}>
                        {report.profitOrLoss >= 0
                          ? "Total Profit"
                          : "Total Loss"}
                      </td>
                      <td style={{ fontWeight: "bold" }}>
                        Rs {report.profitOrLoss.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

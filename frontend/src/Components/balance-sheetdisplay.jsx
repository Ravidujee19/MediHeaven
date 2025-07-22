import React, { useRef,useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function BalanceSheetDisplay() {
  const [report, setReport] = useState(null); //initially its null because at first no report is being rendered
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const balancesheetpdf = useRef();

  const fetchReport = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaction/balance-sheet-report`,
        {
          params: { startDate, endDate }, //we use params as we have to send date as parameters
        }
      );

      setReport(response.data); //since we need all data thats given by it
    } catch (err) {
      setError("Failed to fetch report");
    }
  }, [startDate, endDate]);



  const downloadReportPDF = () => {
    const input = balancesheetpdf.current;
    if (!input) return;
  
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * (pdfWidth - 20)) / canvas.width; // leave side margins
  
      const logo = new Image();
      logo.src = '/mediheavenlogo.png';
  
      logo.onload = () => {
        const headerColor = [0, 128, 0];
        const footerHeight = 20;
        const headerHeight = 30;
  
        // Header background
        pdf.setFillColor(...headerColor);
        pdf.rect(0, 0, pdfWidth, headerHeight, "F");
  
        //logo in header
        pdf.addImage(logo, 'PNG', 10, 5, 20, 20);
  
        // Title and subtile
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        const title = "MediHeaven - Balance Sheet Report";
        const subtitle = `For period ${startDate} to ${endDate}`;
        pdf.text(title, (pdfWidth - pdf.getTextWidth(title)) / 2, 12);
        pdf.setFontSize(10);
        pdf.text(subtitle, (pdfWidth - pdf.getTextWidth(subtitle)) / 2, 20);
  
        
        const contentY = headerHeight + 5;
        pdf.addImage(imgData, 'PNG', 10, contentY, pdfWidth - 20, pdfHeight);
  
        //footer background
        pdf.setFillColor(...headerColor);
        pdf.rect(0, pdf.internal.pageSize.height - footerHeight, pdfWidth, footerHeight, "F");
  
        // footer text
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255);
        const footerText1 = "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
        const footerText2 = "© 2025 MediHeaven. All rights reserved.";
        const pageText = "Page 1 of 1";
        pdf.text(footerText1, (pdfWidth - pdf.getTextWidth(footerText1)) / 2, pdf.internal.pageSize.height - 13);
        pdf.text(footerText2, (pdfWidth - pdf.getTextWidth(footerText2)) / 2, pdf.internal.pageSize.height - 7);
        pdf.text(pageText, pdfWidth - pdf.getTextWidth(pageText) - 14, pdf.internal.pageSize.height - 7);
  
        pdf.save(`balance-sheet-report_${startDate}_to_${endDate}.pdf`);
      };
  
      logo.onerror = () => {
        alert("Failed to load logo image.");
      };
    });
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
            <h2 className="text-center">Balance sheet report</h2>
            <br></br>
            <br></br>
            <h5>
              <p>Enter a date range to generate the balance sheet report</p>
            </h5>

            {/* Date Filter */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
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
                  disabled={!startDate || !endDate}
                >
                  Generate Report
                </button>
              </div>
              <button
                className="btn btn-success"
                onClick={downloadReportPDF}
                disabled={!report}
              >
                Download as PDF
              </button>
            </div>
            {/* Error Handling */}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display Report */}

                {report && ( //if there is a report only then display
      <div ref={balancesheetpdf} className="mt-4"  style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        
        <p>
          <h3><strong>Total Assets:</strong> Rs {report.assetsTotal.toFixed(2)}</h3>
        </p>
        <table className="table table-bordered table-striped">
        <thead className="table-success">
            <tr>
              <th>Asset Type</th>
              <th>Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(report.assetsSummary).map(([type, amount]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <br></br><br></br>
          <h3><strong>Total Revenues:</strong> Rs {report.revenueTotal.toFixed(2)}</h3>
        </p>

        <table className="table table-bordered table-striped">
          <thead className="table-success">
            <tr>
              <th>Revenue Type</th>
              <th>Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(report.revenueSummary).map(([type, amount]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
            <br></br><br></br>
        <p>
          <h3><strong>Total Liabilities:</strong> Rs {report.liabilitiesTotal.toFixed(2)}</h3>
        </p>

        <table className="table table-bordered table-striped">
          <thead className="table-success">
            <tr>
              <th>Liability Type</th>
              <th>Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(report.liabilitiesSummary).map(([type, amount]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{amount.toFixed(2)}</td>
              </tr>
            ))}
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

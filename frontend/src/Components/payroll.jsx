import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const PayrollGenerator = () => {
  const [doctorNames, setDoctorNames] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [payrollData, setPayrollData] = useState(null);
  const payrollRef = useRef(null);

  const months = [
    "January", "February", "March", "April"
  ];

  const years = [2025]; 

  // Fetch doctor names on mount
  useEffect(() => {
    axios.get('http://localhost:5000/payroll/doctorNames')
      .then(res => setDoctorNames(res.data))
      .catch(err => console.error("Error fetching doctor names:", err));
  }, []);

  const handleGeneratePayroll = () => {
    if (!selectedDoctor || !selectedMonth || !selectedYear) {
      alert("Please select all fields.");
      return;
    }

    axios.get(`http://localhost:5000/payroll/getPayrollByMonthAndYear?doctorName=${selectedDoctor}&month=${selectedMonth}&year=${selectedYear}`)
      .then(res => setPayrollData(res.data))
      .catch(err => {
        console.error("Error fetching payroll:", err);
        alert("Payroll not found.");
        setPayrollData(null);
      });

    };

    const handleDownloadPDF = () => {
      const input = payrollRef.current;
      if (!input) return;
    
      html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * (pdfWidth - 20)) / canvas.width;
    
        const logo = new Image();
        logo.src = '/mediheavenlogo.png';
    
        logo.onload = () => {
          const headerColor = [0, 128, 0]; 
          const headerHeight = 30;
          const footerHeight = 20;
    
          // Header background
          pdf.setFillColor(...headerColor);
          pdf.rect(0, 0, pdfWidth, headerHeight, 'F');
    
          
          pdf.addImage(logo, 'PNG', 10, 5, 20, 20);
    
          // Title in header
          pdf.setTextColor(255, 255, 255);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(16);
          const title = "MediHeaven - Salary Payslip";
          const subtitle = `Doctor: ${selectedDoctor} | As at ${selectedMonth} ${selectedYear}`;
          pdf.text(title, (pdfWidth - pdf.getTextWidth(title)) / 2, 12);
          pdf.setFontSize(10);
          pdf.text(subtitle, (pdfWidth - pdf.getTextWidth(subtitle)) / 2, 20);
    


          // Main content
          const contentY = headerHeight + 5;
          pdf.addImage(imgData, 'PNG', 10, contentY, pdfWidth - 20, pdfHeight);
    


          // Footer background
          pdf.setFillColor(...headerColor);
          pdf.rect(0, pdf.internal.pageSize.height - footerHeight, pdfWidth, footerHeight, 'F');
    


          // Footer text
          pdf.setFontSize(8);
          pdf.setTextColor(255, 255, 255);
          const footerText1 = "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
          const footerText2 = "© 2025 MediHeaven. All rights reserved.";
          const pageText = "Page 1 of 1";
    
          pdf.text(footerText1, (pdfWidth - pdf.getTextWidth(footerText1)) / 2, pdf.internal.pageSize.height - 13);
          pdf.text(footerText2, (pdfWidth - pdf.getTextWidth(footerText2)) / 2, pdf.internal.pageSize.height - 7);
          pdf.text(pageText, pdfWidth - pdf.getTextWidth(pageText) - 14, pdf.internal.pageSize.height - 7);
    
          // Save PDF
          pdf.save(`Payroll_${selectedDoctor}_${selectedMonth}_${selectedYear}.pdf`);
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

       {/* payroll section */}
       <div className="col-md-9">
          
          


          <div
            className="card shadow p-4 mt-3 w-100"
            style={{ minHeight: "500px", backgroundColor: "#f5f5f5" }}
          >
      
      
            
            <h5>
              <p>Select a Doctor, Month and Year to generate payroll</p>
            </h5>

            <div className="mb-4 d-flex justify-content-between align-items-center">
              {/* Date Filter */}
              <div className="d-flex gap-4">
              <select
            className="w-full p-2 border rounded"
            value={selectedDoctor}
            onChange={e => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctorNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select
              className="w-full p-2 border rounded"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded"
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>

                <button
                onClick={handleGeneratePayroll}
                disabled={!selectedDoctor || !selectedMonth || !selectedYear}
                className={`btn ${!selectedDoctor || !selectedMonth || !selectedYear ? 'btn-secondary' : 'btn-danger'}`}
                 >
                Generate Payroll
                </button>
             

              
            </div>


      {payrollData && (
        
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h1 className="text-lg font-semibold mb-2">Payroll Details for {payrollData.month} {payrollData.year}</h1>
          <br></br>
          <div ref={payrollRef} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
          <p><strong>Employee ID:</strong> {payrollData.doctorID}</p>
          <p><strong>Doctor name:</strong> {payrollData.doctorName}</p>
          <p><strong>Payroll as at:</strong> {payrollData.month} {payrollData.year}</p>
          <p><strong>Basic Salary:</strong> LKR {payrollData.basicSalary}</p>
          <p><strong>OT Hours:</strong> {payrollData.otHours} hrs</p>
          <p><strong>OT Rate:</strong> LKR {payrollData.otRate}/hr</p>
          <p><strong>Total OT:</strong> LKR {payrollData.totalOT}</p>
          <p><strong>Total Salary:</strong> <span className="font-bold text-green-600">LKR {payrollData.totalSalary}</span></p>
          <p><strong>EPF (Employee 8% Deduction):</strong> LKR {payrollData.epfEmployee.toFixed(2)}</p>
          <br></br>
          <p style={{ fontSize: '1.5rem' }}>Net Salary (After EPF Deduction): <strong>LKR {payrollData.netSalary.toFixed(2)}</strong></p>

          </div>
        </div>  
      )}
      <button
       disabled={!selectedDoctor || !selectedMonth || !selectedYear}
       className={`btn ${!selectedDoctor || !selectedMonth || !selectedYear ? 'btn-secondary' : 'btn-success'}`}
       onClick={handleDownloadPDF}>
    Download Payroll as PDF
  </button>
      
    </div>
    </div>
</div>
</div>

  );

};



export default PayrollGenerator;
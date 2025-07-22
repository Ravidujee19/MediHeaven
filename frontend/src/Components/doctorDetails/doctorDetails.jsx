import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayDoctor from '../displayDoctor/displayDoctor';
import   "./doctorDetails.css"
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";



const URL = 'http://localhost:5000/doctors'; // Use lowercase 'localhost'

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data); // Log response here
    return response.data;
  } catch (error) {
    console.error("API Error:", error); // Log errors
  }
};

function DoctorDetails() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setDoctors(data.doctors);
      setFilteredDoctors(data.doctors);  // Initialize filteredDoctors with all data
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = doctors.filter((doctor) => {
      const nameMatch = doctor.name?.toLowerCase().includes(query.toLowerCase());
      const specialityMatch = doctor.Speciality?.toLowerCase().includes(query.toLowerCase());
      return nameMatch || specialityMatch;
    });
  
    setFilteredDoctors(filtered);
    setNoResults(filtered.length === 0);
  };
  
  

  const handleSendReport = () => {
    // Construct an automated WhatsApp message from selected doctors
    const selectedDoctors = filteredDoctors.map(doctor => 
      `Dr. ${doctor.name}, Specialty: ${doctor.specialty}, Phone: ${doctor.phone}`
    );

    const message = `Doctor Report: \n\n${selectedDoctors.join('\n')}`;

    // WhatsApp message URL
    const phoneNumber = "+94765294806";  // Replace with dynamic phone number if needed
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(WhatsAppUrl, "_blank");
  };

  const downloadAllDoctorsPDF = () => {
    const doc = new jsPDF();
    const logoPath = `${window.location.origin}/mediheavenlogo.png`; // Use absolute path
    const headerColor = [34, 139, 34];
    const tableColumn = ["ID", "Name", "Speciality", "Email", "Phone"];
    const tableRows = [];
  
    filteredDoctors.forEach((doctor, index) => {
      tableRows.push([
        `D${(index + 1).toString().padStart(2, "0")}`,
        doctor.name,
        doctor.specialty || doctor.Speciality || "N/A",
        doctor.email,
        doctor.phone || doctor.Phone || "N/A",
      ]);
    });
  
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };
  
    const dateStr = new Date().toLocaleString();
    const totalPagesExp = "{total_pages_count_string}";
  
    loadImage(logoPath)
      .then((img) => {
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 40,
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: {
            fillColor: headerColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          didDrawPage: function (data) {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
  
            // Header
            doc.setFillColor(...headerColor);
            doc.rect(0, 0, pageWidth, 25, "F");
            doc.addImage(img, "PNG", 10, 5, 15, 15);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("MediHeaven - Doctor List", 30, 15);
  
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(230);
            doc.text(`Generated on: ${dateStr}`, 32, 22);
  
            // Footer
            doc.setFillColor(...headerColor);
            doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  
            const footerText1 =
              "MediHeaven Pvt Ltd | No. 123, Janithma Med Lab, Nikaweratiya | Hotline: 037-4657329 | Email: mediheaven@gmail.com";
            const footerText2 = "© 2025 MediHeaven. All rights reserved.";
            const centerX1 = (pageWidth - doc.getTextWidth(footerText1)) / 2;
            const centerX2 = (pageWidth - doc.getTextWidth(footerText2)) / 2;
  
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(footerText1, centerX1, pageHeight - 13);
            doc.setFontSize(8);
            doc.text(footerText2, centerX2, pageHeight - 7);
  
            const pageNumber = doc.internal.getNumberOfPages();
            const text = `Page ${pageNumber} of ${totalPagesExp}`;
            const textWidth = doc.getTextWidth(text);
            doc.text(text, pageWidth - textWidth - 14, pageHeight - 7);
  
            // Watermark
            doc.saveGraphicsState();
            doc.setTextColor(180);
            doc.setFontSize(40);
            doc.setFont("helvetica", "bold");
            doc.setGState(new doc.GState({ opacity: 0.3 }));
            doc.text("MediHeaven", pageWidth / 2, pageHeight / 2, {
              angle: 45,
              align: "center",
            });
            doc.restoreGraphicsState();
          },
        });
  
        if (typeof doc.putTotalPages === "function") {
          doc.putTotalPages(totalPagesExp);
        }
  
        doc.save("All_Doctors_List.pdf");
  
        Swal.fire({
          icon: "success",
          title: "PDF Downloaded",
          text: "Doctor list saved successfully!",
          confirmButtonColor: "#228B22",
        });
      })
      .catch((err) => {
        console.error("Logo load failed", err);
        alert("PDF export failed – logo not found or blocked.");
      });
  };
  
  

  return (
    <div>
      <h1>Doctors Details</h1>
    
    <div className="search-center">

    <div className="search-container">
    <input
  className="serach-area"
  onChange={(e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Live filter while typing
  }}
  type="text"
  name="search"
  value={searchQuery}
  placeholder="Search doctor by name"
/>

</div>
    <button className="search-button" onClick={handleSearch}>
    Search
    </button>
    <button 
  onClick={downloadAllDoctorsPDF} 
  style={{
    backgroundColor: "#228B22",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    marginTop: "20px"
  }}
>
  Download Doctor List as PDF
</button>
<br></br>
    </div> 

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="doctor-list-container">
        {filteredDoctors && filteredDoctors.map((doctor, i) => {
          const customDoctor = { ...doctor, customId: `D${(i + 1).toString().padStart(2, '0')}` };
          return (
            <div className="doctor-list" key={customDoctor._id}>
              <DisplayDoctor doctor={customDoctor} />
            </div>
          );
        })}
      </div>
      )}

      <button onClick={handleSendReport}>Send Notification</button>
    </div>
  );
}

export default DoctorDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorDash from '../DoctorDash';
import DisplayDoctors from '../displayDoctor/displayForPatient';
import "../displayDoctor/displayForPatients.css";
import Footer from '../Footer';
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

function DoctorsDetails() {
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

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
  
    const filtered = doctors.filter((doctor) => {
      const nameMatch = doctor.name.toLowerCase().includes(query);
      const specialityMatch = doctor.Speciality.toLowerCase().includes(query);
      return nameMatch || specialityMatch;
    });
  
    setFilteredDoctors(filtered);
    setNoResults(filtered.length === 0);
  }, [searchQuery, doctors]);
  

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
  
    const filteredDoctors = doctors.filter((doctor) => {
      const nameMatch = doctor.name.toLowerCase().includes(query);
      const specialityMatch = doctor.Speciality.toLowerCase().includes(query);
      return nameMatch || specialityMatch;
    });
  
    setFilteredDoctors(filteredDoctors);
    setNoResults(filteredDoctors.length === 0);
  };
  

  const handleSendReport = () => {
    // Construct an automated WhatsApp message from selected doctors
    const selectedDoctors = filteredDoctors.map(doctor => 
      `Dr. ${doctor.name}, Specialty: ${doctor.Specialty}, Phone: ${doctor.Phone}`
    );

    const message = `Doctor Report: \n\n${selectedDoctors.join('\n')}`;

    // WhatsApp message URL
    const phoneNumber = "+94768387476";  // Replace with dynamic phone number if needed
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <>
    <div>
      <DoctorDash/>
      <h1>Doctors Details</h1>

      <div className="background">
        
      <div className="search-center">

      <div className="search-container">
      <input
      className="serach-area"
      onChange={(e) => setSearchQuery(e.target.value)}
      type="text"
      name="search"
     placeholder="Search doctor using name or speciality"
/>
</div>
      <button className="search-button" onClick={handleSearch}>
      Search
      </button>
      </div> 
    <br></br>
      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="doctor-container">
          {filteredDoctors && filteredDoctors.map((doctor, i) => (
            <div className="doctor-list" key={i}>
              <DisplayDoctors doctor={doctor} />
            </div>
          ))}
        </div>
      )}

      <button className="send-whatsapp-button" onClick={handleSendReport}>Send Notification</button>
      <br></br>
      <br></br>
      <br></br>
      </div>
    </div>
    {/* <Footer/>  */}
    </>
  );
}

export default DoctorsDetails;



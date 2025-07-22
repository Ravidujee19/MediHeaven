import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2"; 
import {
  FaFileImage,
  FaFilePdf,
  FaWallet,
  FaUserMd,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaBook,
  FaBox,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const SidebarContainer = styled.div`
  width: 220px;
  min-height: 100vh;
  background-color:rgb(116, 157, 139);
  background-size: cover;
  background-position: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #ecf0f1;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin: 20px 0 10px;
  color: #ecf0f1;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color:rgb(44, 158, 99);
    color: #fff;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const AdminSideNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        Swal.fire(
          "Logged Out!",
          "You have successfully logged out.",
          "success"
        );
        navigate("/login"); // Redirect to login
      }
    });
  };

  return (
    <div className="d-flex">
      <SidebarContainer>
        <LogoContainer>
          <LogoImage src="../mediheavenlogo.png" style={{ width: "50px" }} />
          <span>MediHeaven</span>
        </LogoContainer>
        <Menu>
          {/* Profile */}
          <Link
            to="/admindashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <MdDashboard />
              </Icon>
              Dashboard
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Appointments */}
          <SectionTitle>Appointments</SectionTitle>
          <Link
            to="/viewAppointments"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaCalendarAlt />
              </Icon>
              View Appointments
            </MenuItem>
          </Link>
          <Link
            to="/appointmentsummary"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaChartBar />
              </Icon>
              Appointment Report
            </MenuItem>
          </Link>
          
          <hr></hr>
          {/* Doctors */}
          <SectionTitle>Doctors</SectionTitle>
          <Link
            to="/addDoctors"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaUserMd />
              </Icon>
              Add Doctor
            </MenuItem>
          </Link>
          <Link
            to="/doctorsDetails"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaUserMd />
              </Icon>
              View Doctors
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Patient */}
          <SectionTitle>Patient</SectionTitle>
          <Link
            to="/adminprescrip"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaFileImage />
              </Icon>
              View Prescriptions
            </MenuItem>
          </Link>

          <Link
            to="/view-patients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaFilePdf />
              </Icon>
              View Patient Reports
            </MenuItem>
          </Link>

          <Link
            to="/pdfList"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaFilePdf />
              </Icon>
              View Health Reports
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Inventory */}
          <SectionTitle>Inventory</SectionTitle>
          <Link
            to="/addnewproduct"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaBox/>
              </Icon>
              Add Inventory
            </MenuItem>
          </Link>
          <Link to="/list" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Icon>
                <FaBook />
              </Icon>
              View Inventories
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Finance */}
          <SectionTitle>Finance</SectionTitle>
          <Link
            to="/finance"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaWallet />
              </Icon>
              Finance Management
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Feedback */}
          <SectionTitle>Feedback</SectionTitle>
          <Link
            to="/feedbackDisplay"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaBook />
              </Icon>
              View All Feedback
            </MenuItem>
          </Link>

          <hr></hr>
          {/* Sign Out */}
          <MenuItem onClick={handleLogout}>
            <Icon>
              <FaSignOutAlt />
            </Icon>
            Sign Out
          </MenuItem>
        </Menu>
      </SidebarContainer>
    </div>
  );
};

export default AdminSideNav;

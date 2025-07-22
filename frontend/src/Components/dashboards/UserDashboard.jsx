import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Graph from "../Graph";
import BarGraph from "../BarGraph";
import UserViewPres from "../DashDetails/UserViewPres";
import UserViewAppointment from "../DashDetails/UserViewAppointment";
import OneSuggestion from "../DashDetails/Suggestions";
import Collection from "../Inventory/Collection";
import Usecarousel from "../DashDetails/Usecarousel";
import Swal from "sweetalert2";
import  Title from "../Product/Title";

import {
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
  FaHome,
  FaBook,
  FaUser,
  FaDownload,
  FaPrescriptionBottleAlt,
  FaFileMedical,
  FaHeartbeat,
  FaStore, 
  FaShoppingBag,
} from "react-icons/fa";

// Styled Components
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
  width: 80px;
  height: auto;
  margin-bottom: 10px;
`;

const LogoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ecf0f1;
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

// Main Component
const UserDashboard = () => {
  const { user, setUser } = useUser();

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
      
      {/* Sidebar */}
      <SidebarContainer>
        <LogoContainer>
          <LogoImage src="../mediheavenlogo.png" alt="MediHeaven Logo" />
          <LogoTitle>MediHeaven</LogoTitle>
        </LogoContainer>

        <Menu>
        <hr></hr>
          {/* My compo */}
          <SectionTitle>Health</SectionTitle>

          <Link
            to="/prescrip"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaPrescriptionBottleAlt />
              </Icon>
              Add New Prescription
            </MenuItem>
          </Link>

          <Link
            to="/pdfUpload"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaFileMedical />
              </Icon>
              Add Health Report
            </MenuItem>
          </Link>

          <Link
            to="/add-patient"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaHeartbeat />
              </Icon>
              Add Health Data
            </MenuItem>
          </Link>

          <br></br>

          {/* <Link
            to="/view-patients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaBook />
              </Icon>
              View Progress
            </MenuItem>
          </Link> */}
          <hr></hr>
          {/* Appointments */}
          <SectionTitle>Appointments</SectionTitle>
          <Link
            to="/DoctorDetails4P"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaCalendarAlt />
              </Icon>
              Book Appointments
            </MenuItem>
          </Link>
          <Link
            to="/Status"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaChartBar />
              </Icon>
              Appointment History
            </MenuItem>
          </Link>
          
          <br></br>

          {/* Articles */}
          {/* <SectionTitle>Articles</SectionTitle>
          <Link
            to="/view-resources"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaBook />
              </Icon>
              View Articles
            </MenuItem>
          </Link>
          <Link
            to="/dashboard/user"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaDownload />
              </Icon>
              Download Articles
            </MenuItem>
          </Link> */}
          {/* Inventory */}
          <hr></hr>
          {/* <SectionTitle>Inventory</SectionTitle> */}

          

          <Link to="/card" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Icon>
                <FaStore />
              </Icon>
              View Shop
            </MenuItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Icon>
                <FaShoppingBag />
              </Icon>
              Cart
            </MenuItem>
          </Link>


          <br></br>
          <hr></hr>
          {/* Feedback */}
          <SectionTitle>Feedback</SectionTitle>

          <Link
            to="/addfeedback"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>
              <Icon>
                <FaBook />
              </Icon>
              Add Feedback
            </MenuItem>
          </Link>

          <br></br>
          <hr></hr>
          {/* Home and Sign Out */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Icon>
                <FaHome />
              </Icon>
              Home
            </MenuItem>
          </Link>

          <br></br>

          {/* Sign Out */}
          <MenuItem onClick={handleLogout}>
            <Icon>
              <FaSignOutAlt />
            </Icon>
            Sign Out
          </MenuItem>
        </Menu>
      </SidebarContainer>

      {/* Main Content */}
      <div className="container-fluid">
        <div className="p-4">
          {/* <h3>
            Welcome,{" "}
            <span className="text-success fw-bold">
              {user ? user.username : "User"}
            </span>
          </h3> */}
            <h3>
          <div className="mb-4">
          <Title text1={"WELCOME !"} text2={<span className="text-success fw-bold">
              {user ? user.username : " User"}
            </span>} />
            
        </div>
        </h3>
          <div className="udb-card-container mt-4">
              <div className="flex-fill p-2 border-end">
                <Usecarousel/>
              </div>
          </div>

          <div className="udb-card-container mt-4">
            <div className="udb-card p-3 bg-light border d-flex">
              <div className="flex-fill p-2 border-end">
                <UserViewAppointment />
              </div>
              <div className="flex-fill p-2 ">
                <UserViewPres />
              </div>
            </div>
            <div className="udb-card p-3 bg-light border">
              <Graph />
            </div>
            {/* <div className="udb-card p-3 bg-light border d-flex">
              <div className="flex-fill p-2 border-end"><OneSuggestion/></div>
              <div className="flex-fill p-2 "><BarGraph /></div>
            </div> */}
            <div className="dashboard-container">
              <div className="fixed-card">
                <OneSuggestion />
              </div>
              {/* <div className="fixed-graph">
                <BarGraph />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Footer from "./Footer";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const features = [
    {
      title: "Personalized Health Dashboard",
      image: "/Images/homedashboard.jpg",
      path: "/dashboard/user",
      requiresLogin: true,
    },
    // {
    //   title: "Auto Generated Diet Plans",
    //   image: "/Images/homediet.jpg",
    //   path: "/diet-plans",
    //   requiresLogin: true,
    // },
    {
      title: "Health Activity Tracking",
      image: "/Images/homeworkout.jpg",
      path: "/graph",
      requiresLogin: true,
    },
    {
      title: "Health Product Shop",
      image: "/Images/homeshop.jpg",
      path: "/card",
      requiresLogin: false,
    },
    {
      title: "24/7 Practitioner Appointment",
      image: "/Images/homebooking.jpg",
      path: "/DoctorDetails4P",
      requiresLogin: true,
    },
    {
      title: "Supportive Care Assistants",
      image: "/Images/homessistant.jpg",
      path: "/support",
      requiresLogin: true,
    },
  ];

  const handleClick = (feature) => {
    if (feature.requiresLogin && !isLoggedIn) {
      Swal.fire({
        title: "You must be logged in to access this feature.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } else {
      navigate(feature.path);
    }
  };

  return (
    <>
    <section id="features" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4 text-success">Features</h2>
        <div className="row text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(feature)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="card feature-card shadow-sm p-3 h-100"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="image-container">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="img-fluid feature-img"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <h5 className="mt-2">{feature.title}</h5>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    {/* <Footer/> */}
    </>
  );
};

export default FeaturesSection;

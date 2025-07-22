import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeCarousel from "./HomeCarousel";
import FeaturesSection from "./Features";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import BlogSection from "./BlogSection";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
};

const Home = () => {
  return (
    <div>
      <header className="text-center  bg-light">
        <HomeCarousel />
        <br></br>
        <div className="container">
          <h1>Personalize Your Health & Wellness</h1>
          <p>Expert guidance, diet plans, and support all in one place.</p>
          <a href="/login" className="btn btn-success">
            Get Started
          </a>
        </div>
        <br></br>
      </header>

      <FeaturesSection />


      <div className="about-us-page py-5 bg-light">
      <Container>
        <motion.h2
          className="text-center mb-4 text-success"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-center mb-5 lead text-muted"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          At MediHeaven, we are dedicated to providing accessible and
          personalized healthcare services through innovative digital solutions.
        </motion.p>

        <Row className="mb-5">
          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h4 className="text-primary text-center">Our Mission</h4>
              <p>
                To revolutionize healthcare by offering intuitive digital tools
                that help patients and professionals manage medical records,
                appointments, and wellness efficiently.
              </p>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h4 className="text-primary text-center">Our Vision</h4>
              <p>
                To be the leading digital health platform in the region,
                empowering healthier lives through technology, trust, and care.
              </p>
            </motion.div>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          {[
            {
              title: "Secure & Private",
              desc: "Your health data is encrypted and safe with us."
            },
            {
              title: "Patient First",
              desc: "We design with care and user simplicity in mind."
            },
            {
              title: "Trusted by Professionals",
              desc: "Used by doctors, clinics, and healthcare institutions."
            }
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h5 className="text-success">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
      {/* About Section */}
      {/* <section
        id="about"
        className="py-5 text-center"
        style={{ backgroundColor: "#d4edda" }}
      >
        <div className="container">
          <h2>About Us</h2>
          <p>
            At <strong>MediHeaven</strong>, we’re redefining the way you manage
            health and wellness. Our all-in-one platform helps you track your
            health, receive personalized wellness guidance, consult with
            doctors, and manage prescriptions—all in one secure, easy-to-use
            space. We’re here to empower you to take charge of your well-being
            anytime, anywhere.
          </p>
        </div>
      </section> */}

      <BlogSection/> 
      <Footer />
    </div>
  );
};

export default Home;

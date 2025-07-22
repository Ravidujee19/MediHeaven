import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import Footer from "./Footer";

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
};

const AboutUs = () => {
  return (
    <>
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
    <Footer /></>
  );
};

export default AboutUs;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import logo from "../assets/mediheavenlogo.png";
import "../Css/Footer.css";
import '../Css/header.css';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="cc-footer" style={{ backgroundColor: '#2A4930' }}>

        <div className="cc-footer-content">
          {/* Logo + Name */}
          <div className="cc-brand">
            <Link to="/">
              <img
                src={logo}
                alt="MediHeaven Logo"
                className="cc-footer-logo"
              />
            </Link>
            <h4 className="text-white mt-2">MediHeaven</h4>
          </div>

          {/* Social */}
          <div className="cc-contact">
            <h3>Connect with</h3>
            <div className="cc-social-icons">
              <a href="#" className="cc-social-link" aria-label="Facebook">
                <FaFacebook size={30} color="#3b5998" />
              </a>
              <a href="#" className="cc-social-link" aria-label="WhatsApp">
                <FaWhatsapp size={30} color="#25D366" />
              </a>
              <a href="#" className="cc-social-link" aria-label="Instagram">
                <FaInstagram size={30} color="#E1306C" />
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="cc-location">
            <h3>Locations</h3>
            <p>Janithma Med Lab, Nikaweratiya, Sri Lanka</p>
            <p>Phone: 037-4657329</p>
            <p>Email: mediheaven25@gmail.com</p>
          </div>

          {/* About */}
          <div className="cc-about">
            <h3>Useful Links</h3>
            <p><Link to="/">Home Page</Link></p>
            <p><Link to="/features">Features Section</Link></p>
            <p><Link to="/card">Mediheaven Pharmacy</Link></p>
            <p>
              <a href="#!" onClick={() => setShowTerms(true)}>Terms & Conditions</a> |{" "}
              <a href="#!" onClick={() => setShowPrivacy(true)}>Privacy Policy</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="cc-links">
            <h3>Quick Links</h3>
            <p><Link to="/aboutus">About Us</Link></p>
            <p><Link to="/services">Services</Link></p>
            <p><Link to="/faq">FAQ</Link></p>
            <p><Link to="/contact">Contact Us</Link></p>
          </div>
        </div>
      </footer>

      <div className="text-center py-2 copyright-bar">
        © {new Date().getFullYear()} MediHeaven. All rights reserved.
      </div>

      {/* Terms Modal */}
      <Modal
        show={showTerms}
        onHide={() => setShowTerms(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Your data is secure and encrypted.</li>
            <li>Only accurate info should be submitted.</li>
            <li>We may update our terms periodically.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowTerms(false)}>
            I Accept
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        show={showPrivacy}
        onHide={() => setShowPrivacy(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>No sharing of your data with third parties.</li>
            <li>You may access or delete your data at any time.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowPrivacy(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Footer;

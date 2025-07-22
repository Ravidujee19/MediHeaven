import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const DoctorDash = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/d1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Find the Right Doctor for Your Needs</h3>
          <p> Browse through a wide range of experienced doctors in different specialties. Whether you're seeking general consultation or specialized care, we’ve got you covered.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/d2.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Book Appointments with Ease</h3>
          <p>Scheduling an appointment is now simpler than ever. Choose your preferred doctor, pick a convenient time, and book your appointment in just a few clicks.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/d3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Convenient Online Consultation</h3>
          <p> No need to leave your home! With our online booking system, you can easily schedule consultations with doctors from the comfort of your home.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/d4.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Trusted Medical Professionals</h3>
          <p>Our platform features only verified and trusted doctors with years of experience. Get the best medical advice and treatment from qualified professionals.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default DoctorDash;

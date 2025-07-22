import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../../Css/UserCarousel.css"

const Usecarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/A.png"
          alt="First slide"
        />
        {/* <Carousel.Caption className="center-caption">
          <h3>Welcome to MediHeaven</h3>
          <p>Your all-in-one healthcare companion</p>
        </Carousel.Caption> */}
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/B.png"
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/C.jpg"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/D.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Usecarousel;

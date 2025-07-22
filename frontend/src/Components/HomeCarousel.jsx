import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Css/HomeCarousel.css';

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/homeslide1.png"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/homeslide2.png"
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/homeslide3.png"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Images/homeslide4.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;

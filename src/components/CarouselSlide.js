import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselSlide.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const CarouselSlide = () => {
  const navigate = useNavigate();

  const handleImageClick = (id, event) => {
    event.stopPropagation();
    navigate(`/book/${id}`);
  };

  return (
    <div className="carousel-container">
      <Carousel showArrows={false} infiniteLoop={true} showThumbs={false} showStatus={false} autoPlay={true} interval={3000}>
        <div>
          <img src="/carousel/cr1.png" alt="Slide 1" className="carousel-image" />
        </div>
        <div>
          <img src="/carousel/cr2.png" alt="Slide 2" className="carousel-image" />
        </div>
        <div>
          <img src="/carousel/cr3.png" alt="Slide 3" className="carousel-image" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSlide;

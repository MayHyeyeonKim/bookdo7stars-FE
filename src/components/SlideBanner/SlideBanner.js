import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlideBanner.css';
import Box from '@mui/material/Box';
import { Card, Container } from '@mui/material';

const SlideBanner = ({ bookList }) => {
  const settings = {
    className: 'center',
    center: true,
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Container className="slider-container" sx={{ backgroundColor: '#608020', width: '100%', borderRadius: 2 }}>
      <Slider {...settings}>
        {bookList.map((book, index) => (
          <div key={index}>
            <Box
              sx={{
                width: 217,
                height: 325,
                marginRight: 2,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'space-around',
              }}>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: 300, objectFit: 'contain', borderRadius: 2 }} />
            </Box>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default SlideBanner;

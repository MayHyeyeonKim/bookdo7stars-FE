import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import BookCard from '../BookCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import Carousel from 'react-multi-carousel';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-multi-carousel/lib/styles.css';
import './BookSlider.css';
import CustomRightArrow from './CustomRightArrow';
import CustomLeftArrow from './CustomLeftArrow';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';

const BookSlider = ({ bookList, isMobile }) => {
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.user);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (user) {
      dispatch(favoriteActions.getFavorite());
    }
  }, [dispatch, user]);

  return (
    <Box sx={{ height: 'auto', justifyContent: 'center' }}>
      <Carousel containerClass="carousel-container" responsive={responsive} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />}>
        {bookList.map((book, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <BookCard book={book} favorite={favorite.some((favorite) => favorite._id === book._id)} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
export default BookSlider;

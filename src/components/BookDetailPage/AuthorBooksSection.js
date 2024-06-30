import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import BookCard from '../BookCard';
import BooksCarousel from '../BooksCarousel/BooksCarousel';

const AuthorBooksSection = ({ otherBooksByAuthor }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box id="author" my={4}>
      <Typography variant="h4">저자의 다른 책들</Typography>
      {otherBooksByAuthor.length !== 0 ? (
        isMobile ? (
          <BooksCarousel bookList={otherBooksByAuthor} moreButton={false} />
        ) : (
          <Grid container spacing={2} mt={2}>
            {otherBooksByAuthor.map((otherBook) => (
              <Grid item xs={6} sm={4} md={3} key={otherBook._id}>
                <BookCard book={otherBook} sx={{ width: 120, height: 180 }} />
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '180px',
            backgroundColor: '#DADFCE',
            opacity: '50%',
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography variant="h6" sx={{ textAlign: 'center', mx: 2 }}>
            이 작가의 다른 책이 없습니다.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthorBooksSection;

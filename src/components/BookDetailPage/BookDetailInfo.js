import React from 'react';
import { Typography, Box } from '@mui/material';

const BookDetailInfo = ({ pubDate, isbn, category }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'grey', fontWeight: 'bold', mt: 5 }}>
        Publication Date: {pubDate}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'grey', fontWeight: 'bold', mt: 1 }}>
        ISBN: {isbn}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '0.875rem', color: 'grey', fontWeight: 'bold', mt: 1 }}>
        Category: {category}
      </Typography>
    </Box>
  );
};

export default BookDetailInfo;

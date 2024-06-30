import React from 'react';
import { Paper } from '@mui/material';

const BookImage = ({ cover }) => {
  return (
    <Paper elevation={3} style={{ padding: '10px' }}>
      <img src={cover} alt="Book Cover" style={{ width: '100%' }} />
    </Paper>
  );
};

export default BookImage;

import React from 'react';
import { Fab, Box } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const CircularButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 50,
        left: 50,
        zIndex: 1000,
        '@media (max-width:600px)': {
          bottom: 30, // Adjust position for mobile
          left: 30, // Adjust position for mobile
        },
      }}>
      <Fab
        color="primary"
        onClick={onClick}
        sx={{
          width: 56,
          height: 56,
          '@media (max-width:600px)': {
            width: 40, // Smaller width for mobile
            height: 40, // Smaller height for mobile
          },
        }}>
        <SupportAgentIcon
          sx={{
            '@media (max-width:600px)': {
              fontSize: 20, // Smaller icon size for mobile
            },
          }}
        />
      </Fab>
    </Box>
  );
};

export default CircularButton;

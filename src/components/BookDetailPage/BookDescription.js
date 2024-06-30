import React, { useState } from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BookDescription = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" onClick={handleExpandClick} sx={{ cursor: 'pointer' }}>
        <Typography variant="h4" sx={{ flexGrow: 1, mt: 5, mb: 1, fontSize: '1.75rem', fontWeight: 'bold' }}>
          DESCRIPTION
        </Typography>
        <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>
      {expanded && (
        <Paper elevation={3} sx={{ padding: '10px', marginTop: '20px' }}>
          <Typography variant="body1">{description}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default BookDescription;

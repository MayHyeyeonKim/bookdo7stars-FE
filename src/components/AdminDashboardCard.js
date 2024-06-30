import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const HoverCard = styled(Card)({
  transition: 'transform 0.2s, background-color 0.2s',
  '&:hover': {
    backgroundColor: '#C4D2A7',
    transform: 'scale(1.05)',
  },
});

const AdminDashboardCard = ({ title, content, onClick }) => {
  return (
    <HoverCard onClick={onClick}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
        </Typography>
      </CardContent>
    </HoverCard>
  );
};

export default AdminDashboardCard;

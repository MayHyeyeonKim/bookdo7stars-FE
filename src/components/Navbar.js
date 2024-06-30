import React from 'react';
import AppBar from '@mui/material/AppBar';
import { useMediaQuery, useTheme } from '@mui/material';
import NavToolbar from './NavToolbar/NavToolbar';

function NavBar() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', padding: isMobile ? 1 : 2 }}>
      <NavToolbar />
    </AppBar>
  );
}

export default NavBar;

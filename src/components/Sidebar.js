import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin/product')}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin/order')}>
          <ListItemIcon>
            <OrderIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              marginLeft: '10px', // 왼쪽에서 조금 띄어줌
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // 호버 효과
              },
            }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
          }}
          role="presentation">
          {drawerContent}
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;

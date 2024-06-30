import React, { useEffect } from 'react';
import NavBar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import ToastMessage from '../components/ToastMessage';
import { userActions } from '../action/userActions';
import { bookActions } from '../action/bookActions';
import { cartActions } from '../action/cartActions';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer/Footer';
import CategoryBar from '../components/CategoryBar';
import { Box, Typography, useMediaQuery } from '@mui/material';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user, dispatch]);

  const { bookList, bookGroup } = useSelector((state) => state.book);

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookList({ queryType: bookGroup }));
    } else {
      dispatch(bookActions.getBookList({}));
    }
  }, [bookGroup, dispatch]);

  return (
    <Box>
      <ToastMessage />
      {!location.pathname.includes('member') && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#035036',
            height: '60px',
            p: 1,
            textAlign: 'center',
          }}>
          <Typography sx={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.875rem' : '1rem' }}>
            10만원 이상 주문 시 모든 주문 무료 배송 (Standard Shipping)
          </Typography>
        </Box>
      )}
      {location.pathname.includes('admin') ? (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            {children}
          </Box>
        </Box>
      ) : location.pathname.includes('member') ? (
        <Box sx={{ mt: 2 }}>{children}</Box>
      ) : (
        <Box>
          <NavBar user={user} />
          <CategoryBar bookList={bookList} />
          <Box sx={{ mt: 2 }}>{children}</Box>
        </Box>
      )}
      {!location.pathname.includes('member') && <Footer />}
    </Box>
  );
};

export default AppLayout;

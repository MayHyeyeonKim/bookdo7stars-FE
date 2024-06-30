import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Box, IconButton, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookImage from '../components/BookDetailPage/BookImage';
import BookBasicInfo from '../components/BookDetailPage/BookBasicInfo';
import BookToCart from '../components/BookDetailPage/BookToCart';
import AddressChange from '../components/BookDetailPage/AddressChange';
import DeliveryEstimate from '../components/BookDetailPage/DeliveryEstimate';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import Info3 from '../components/BookDetailPage/Info3';
import { favoriteActions } from '../action/favoriteActions';

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('지역을 선택해주세요');
  const { fullAddress, deliveryInfo } = useSelector((state) => state.order);
  const { selectedBook, getBooksLoading, otherBooksByAuthor } = useSelector((state) => state.book);
  const { bookid } = useParams();
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.user);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (user) {
      dispatch(favoriteActions.getFavorite());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (bookid) {
      dispatch(bookActions.getBookDetail(bookid));
    }
  }, [bookid]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (getBooksLoading || !selectedBook) {
    return <div className="loading"></div>;
  }

  return (
    <Box sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mb: 4 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            {selectedBook.cover && <BookImage cover={selectedBook.cover} />}
          </Grid>
          <Grid item xs={12} md={8}>
            <BookBasicInfo title={selectedBook.title} author={selectedBook.author} publisher={selectedBook.publisher} price={selectedBook.priceStandard} />
            <BookToCart
              favorite={favorite?.some((favorite) => favorite._id === selectedBook._id)}
              selectedBook={selectedBook}
              fullAddress={fullAddress}
              deliveryInfo={deliveryInfo}
              deliveryAddress={address}
              user={user}
            />
            <Box mt={3}>
              <Box display="flex" alignItems="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                <div style={{ marginRight: '14px' }}>배송 정보</div>
                <h6 style={{ margin: 0, marginRight: '13px' }}>{address}</h6>
                <AddressChange setAddress={setAddress} />
              </Box>
              <DeliveryEstimate address={address} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Info3 selectedBook={selectedBook} otherBooksByAuthor={otherBooksByAuthor} />
          </Grid>
        </Grid>
        {!isMobile && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 40,
              right: 40,
              zIndex: 1000,
            }}>
            <IconButton
              onClick={scrollToTop}
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                '&:hover': { backgroundColor: '#d3ddbd' },
                borderRadius: '50%',
                width: 56,
                height: 56,
                '@media (max-width:600px)': {
                  width: 40, // Smaller width for mobile
                  height: 40, // Smaller height for mobile
                },
              }}>
              <ArrowUpwardIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookDetailPage;

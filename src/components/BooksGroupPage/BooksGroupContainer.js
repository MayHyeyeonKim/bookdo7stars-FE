import { Box, Container, Grid, Typography, Button, IconButton, useMediaQuery } from '@mui/material';
import BookCard from '../BookCard';
import React, { useEffect, useState } from 'react';
import { AddCircleOutline, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';

const BooksGroupContainer = ({ bookList, title, subtitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 화면인지 확인
  const [displayCount, setDisplayCount] = useState(isMobile ? 3 : 12); // 초기 표시할 책의 수
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (user) {
      dispatch(favoriteActions.getFavorite());
    }
  }, [dispatch, user]);

  // "더보기" 기능
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + (isMobile ? 3 : 12));
  };

  useEffect(() => {
    setDisplayCount(isMobile ? 3 : 12);
  }, [title, isMobile]);

  const filteredBooks = bookList; // 선택된 카테고리와 무관하게 필터링된 책 리스트

  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexDirection: 'column' }}>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
          {!isMobile && subtitle && (
            <Typography component="span" sx={{ fontSize: '1rem', marginLeft: '8px' }}>
              {subtitle}, ({bookList.length})
            </Typography>
          )}
        </Typography>
        {isMobile && subtitle && (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '4px' }}>
            {subtitle}, ({bookList.length})
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {filteredBooks.slice(0, displayCount).map((book) => (
            <Grid
              key={book._id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={book._id} book={book} favorite={favorite.some((favorite) => favorite._id === book._id)} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
          {filteredBooks.length > displayCount && (
            <Button onClick={handleLoadMore} variant="outlined" endIcon={<AddCircleOutline />}>
              더보기
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BooksGroupContainer;

import React, { useEffect } from 'react';
import { Box, Typography, Link, Container, Grid, useMediaQuery, TableContainer, Paper } from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import BookCard from '../components/BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../action/favoriteActions';

const MyPageWishList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const { bookList } = useSelector((state) => state.book);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(favoriteActions.getFavorite());
  }, [dispatch, user]);

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  };

  return (
    <Container>
      <Box sx={isMobile ? {} : { p: 3 }}>
        <Grid container mb={1} style={{ fontSize: '15px' }}>
          <Link href="/" underline="hover" color="inherit">
            welcome
          </Link>
          <Typography mr={1} ml={1}>{`>`}</Typography>
          <Link href="/mypage" underline="hover" color="primary" fontWeight="medium">
            mypage
          </Link>
        </Grid>

        {/* 마이페이지 */}
        <Grid container>
          <Typography variant="h4" gutterBottom fontWeight="medium">
            <Link href="/mypage" color="primary" sx={{ textDecoration: 'none' }}>
              마이페이지
            </Link>
          </Typography>
        </Grid>
        {isMobile ? (
          <>
            <Grid container mb={1} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="subtitle2"> {user?.userName}님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
            </Grid>

            <Grid container mb={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="subtitle2" display="inline">
                나의 북두칠성 등급:
              </Typography>
              <Box display="inline" ml={1}>
                <Typography variant="subtitle2" border={1} borderRadius={4} borderColor="primary.light" bgcolor="primary.light" color="white" p="2px">
                  {user?.level}
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid container>
            <Typography variant="subtitle1">{user?.userName}님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
          </Grid>
        )}

        <Grid container>
          {/* 마이페이지 좌측 카테고리 */}
          <Grid item xs={12} md={3}>
            <MyPageCategory />
          </Grid>

          {/* 마이페이지 우측 정보 */}
          <Grid item xs={12} md={9}>
            <Box mt={2} sx={isMobile ? {} : { ml: 3, mb: 4 }}>
              {/* 광고 짧은 배너 */}
              <Typography
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  typography: isMobile ? 'subtitle2' : '',
                  mt: isMobile ? 3 : 1,
                }}
                mt={2}
                p={1}
                border={1}
                borderRadius={4}
                align="center">
                구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
              </Typography>

              {/* 위시리스트 */}
              <Typography variant="h6" mt={3}>
                위시리스트
              </Typography>

              {/* 구분선 */}
              <Typography mt={2} mb={2} borderBottom={1} borderColor="grey.400" />

              {/* 찜한 상품 나열 */}
              <Grid container spacing={2} sx={{ mb: isMobile ? 6 : 0 }}>
                {favorite.map((item) => {
                  const book = bookList.find((favBook) => favBook._id === item._id);
                  return (
                    book && (
                      <Grid item key={item._id} xs={12} sm={6} md={4} align="center" mb={1}>
                        <BookCard favorite={true} book={book} />
                      </Grid>
                    )
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageWishList;

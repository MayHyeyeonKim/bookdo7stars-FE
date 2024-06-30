import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, IconButton, Pagination, Drawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookCard from '../BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';
import FilterBar from './FilterBar';

const BooksAllContainer = ({ bookList, title, handleFilterChange, handleShowAllBooks }) => {
  const [page, setPage] = useState(1);
  const booksPerPage = useMediaQuery('(max-width: 600px)') ? 3 : 12; // 모바일 화면에서는 3개, 데스크탑에서는 12개의 책 보이도록 설정
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 드로어 열림 상태
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.favorite);
  const isMobile = useMediaQuery('(max-width: 600px)'); // 현재 화면이 모바일인지 데스크탑인지 확인

  useEffect(() => {
    if (user) {
      dispatch(favoriteActions.getFavorite());
    }
  }, [dispatch, user]);

  // 총 페이지 수 계산
  const pageCount = Math.ceil(bookList.length / booksPerPage);

  // 현재 페이지에 해당하는 책들
  const displayedBooks = bookList.slice((page - 1) * booksPerPage, page * booksPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTop50Click = () => {
    setPage(1); // 첫 번째 페이지로 이동
  };

  const handleTop100Click = () => {
    setPage(3); // 세 번째 페이지로 이동 (3 * 9 = 27)
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px', // 페이지네이션과의 간격 조정
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={handleTop50Click} color={page === 1 ? 'primary' : 'default'}>
            <Typography variant="body1">Top 50</Typography>
          </IconButton>
          <IconButton onClick={handleTop100Click} color={page === 3 ? 'primary' : 'default'}>
            <Typography variant="body1">Top 100</Typography>
          </IconButton>
        </Box>
        <IconButton onClick={toggleDrawer(true)} color="primary" aria-label="filter">
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            justifyContent: 'center',
            '& .MuiPagination-ul': {
              flexWrap: 'nowrap', // 페이지네이션 한 줄로 유지
            },
            '& .MuiPaginationItem-root': {
              minWidth: '32px', // 아이템의 최소 너비 설정
              height: '32px', // 아이템의 높이 설정
            },
          }}
        />
      </Box>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}
          role="presentation">
          <FilterBar
            onFilterChange={handleFilterChange}
            onShowAllBooks={handleShowAllBooks}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer(false)} // toggleDrawer 함수 전달
          />
        </Box>
      </Drawer>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {displayedBooks.map((book) => (
          <Grid
            key={book._id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <BookCard key={book._id} book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BooksAllContainer;

import { Box, Container, Grid, Typography, Tab, Tabs, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { AddCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';

const BookContainer = ({ bookList, categories, sx, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { user } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredBooks = selectedCategory === '전체' ? bookList : bookList.filter((book) => book.categoryName.includes(selectedCategory));
  const bookGroup = bookList[0]?.queryType;
  const onClickMore = (bookGroup) => {
    if (title === '에디터 추천') {
      navigate(`/books/editor-recommend`);
    } else {
      navigate(`/books/group/${bookGroup}`);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(favoriteActions.getFavorite());
    }
  }, [dispatch, user]);

  return (
    <Container
      sx={{
        ...sx,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', margin: 0 }}>
          {title}
        </Typography>

        <Button size="large" endIcon={<AddCircleOutline />} onClick={() => onClickMore(bookGroup)} sx={{ justifyContent: 'flex-end' }}>
          더보기
        </Button>
      </Box>
      {categories && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="category tabs"
            allowScrollButtonsMobile
            variant="scrollable" // 탭 스크롤 가능
            indicatorColor="primary" // 선택된 탭의 인디케이터 색상 설정
            textColor="primary"
            scrollbuttons="auto"
            sx={{
              '& .MuiTabs-scrollable': {
                // 탭의 전체 너비 조정
                maxWidth: '100%', // 전체 너비 사용
                width: 'auto', // 자동으로 너비 설정
              },
            }}>
            // 탭 텍스트 색상 설정
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={category.label}
                value={category.id}
                sx={{
                  fontSize: '1rem', // 폰트 사이즈 설정
                  '&.Mui-selected': {
                    fontWeight: 'bold', // 선택된 탭 폰트 볼드 처리
                    borderBottom: '2px solid #608020', // 선택된 탭에 밑줄 스타일
                    transition: 'border-bottom 0.3s ease', // 밑줄에 트랜지션 적용
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid key={book._id} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <BookCard key={book._id} book={book} favorite={favorite?.some((item) => item._id === book._id)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BookContainer;

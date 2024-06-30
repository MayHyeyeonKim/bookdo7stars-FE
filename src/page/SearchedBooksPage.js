import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@mui/material';
import BookCard from '../components/BookCard';
import Box from '@mui/material/Box';
import NotFoundPage from './NotFoundPage';

const SearchedBooksPage = () => {
  const { bookList } = useSelector((state) => state.book);
  const [searchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 20;

  useEffect(() => {
    // Extract query parameters
    const query = Object.fromEntries([...searchParams.entries()]);

    // Filter bookList based on query parameters
    const filtered = bookList.filter((book) => {
      return Object.keys(query).every((key) => {
        if (key === 'total') {
          return (
            book.isbn.includes(query.total) ||
            book.title.includes(query.total) ||
            book.author.includes(query.total) ||
            book.publisher.includes(query.total) ||
            book.queryType.includes(query.total) ||
            book.categoryId.includes(query.total)
          );
        }
        return book[key] && book[key].includes(query[key]);
      });
    });

    setFilteredBooks(filtered);
    setVisibleBooks(filtered.slice(0, booksPerPage));
  }, [bookList, searchParams]);

  const handleShowMore = () => {
    const nextPage = page + 1;
    const startIndex = booksPerPage * page;
    const endIndex = startIndex + booksPerPage;
    setVisibleBooks([...visibleBooks, ...filteredBooks.slice(startIndex, endIndex)]);
    setPage(nextPage);
  };

  const queryKey = searchParams.keys().next().value;
  const queryValue = searchParams.get(queryKey);
  const count = filteredBooks.length;

  return (
    <Container>
      {count === 0 ? (
        <NotFoundPage />
      ) : (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              margin: '4rem',
              color: 'black',
            }}>
            "{queryValue}"을/를 검색한 결과 {count}개 입니다.
          </Typography>
          <Grid container spacing={2}>
            {visibleBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={book.id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          {visibleBooks.length < filteredBooks.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
              <Button variant="contained" color="primary" onClick={handleShowMore}>
                더보기
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchedBooksPage;

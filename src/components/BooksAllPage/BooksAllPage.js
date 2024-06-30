import React, { useState, useEffect } from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import BooksAllContainer from './BooksAllContainer';
import FilterBar from './FilterBar';

const BooksAllPage = () => {
  const { bookList } = useSelector((state) => state.book);
  const [filteredBooks, setFilteredBooks] = useState(bookList); // 필터된 책 목록
  const [isFilterApplied, setIsFilterApplied] = useState(false); // 필터가 적용되었는지 여부
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 화면 크기 확인

  useEffect(() => {
    setFilteredBooks(bookList);
  }, [bookList]);

  if (!bookList) {
    return null; // 데이터가 로드되지 않았을 경우 예외 처리
  }

  // 필터 적용 함수
  const handleFilterChange = ({ priceRange, sortOrder }) => {
    let filtered = bookList.filter((book) => {
      const isPriceInRange = book.priceStandard >= priceRange[0] && book.priceStandard <= priceRange[1];
      return isPriceInRange;
    });

    if (sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.pubDate) - new Date(b.pubDate);
        } else {
          return new Date(b.pubDate) - new Date(a.pubDate);
        }
      });
    }

    setFilteredBooks(filtered);
    setIsFilterApplied(true); // 필터가 적용되었음을 표시
  };

  // 전체 도서 목록 보여주기
  const handleShowAllBooks = () => {
    setFilteredBooks(bookList);
    setIsFilterApplied(false); // 필터가 적용되지 않음을 표시
  };

  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <BooksAllContainer
        bookList={filteredBooks}
        title="전체 도서"
        isMobile={isMobile}
        handleFilterChange={handleFilterChange}
        handleShowAllBooks={handleShowAllBooks}
      />
    </Container>
  );
};

export default BooksAllPage;

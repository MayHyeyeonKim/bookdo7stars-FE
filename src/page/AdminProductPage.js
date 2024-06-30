import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageSearchBox from '../components/AdminPageSearchBox';
import AdminPageProductTable from '../components/AdminPageProductTable';
import AdminPageProductDialog from '../components/AdminPageProductDialog';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import * as types from '../constants/book.constants';

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const bookTableHead = ['이미지', 'ISBN', '도서명', '저자', '재고', '출판사', '판매가', ''];
  const { bookList } = useSelector((state) => state.book);
  const [query, setQuery] = useSearchParams();
  const fields = ['isbn', 'title', 'author', 'category', 'publisher'];

  const totalField = fields.reduce((total, item) => {
    total[item] = query.get(item) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  useEffect(() => {
    if (searchQuery.isbn === '') delete searchQuery.isbn;
    if (searchQuery.title === '') delete searchQuery.title;
    if (searchQuery.author === '') delete searchQuery.author;
    if (searchQuery.category === '') delete searchQuery.category;
    if (searchQuery.publisher === '') delete searchQuery.publisher;
    const params = new URLSearchParams();
    Object.keys(searchQuery).forEach((key) => {
      const value = searchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    navigate('?' + params.toString());
    dispatch(bookActions.getBookList({ ...searchQuery }));
  }, [searchQuery, navigate, dispatch]);

  // 검색한 값을 리셋하기.
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

  // 도서 생성 다이얼로그 열기.
  const handleOpenNewDialog = () => {
    setEditBook(null);
    setOpenDialog(true);
  };

  // 도서 수정 다이얼로그 열기.
  const handleOpenEditDialog = (book) => {
    setEditBook(book);
    setOpenDialog(true);
    dispatch({ type: types.SET_SELECTED_BOOK, payload: book });
  };

  // 도서 삭제
  const handleDeleteProduct = (bookId) => {
    dispatch(bookActions.deleteBook(bookId));
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12}>
          {/* 검색 박스 */}
          <AdminPageSearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            resetSearch={resetSearch}
            handleOpenNewDialog={handleOpenNewDialog}
          />

          {/* 상품 테이블 */}
          <AdminPageProductTable
            bookList={bookList}
            bookTableHead={bookTableHead}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteProduct={handleDeleteProduct}
          />

          {/* 상품 다이얼로그 */}
          <AdminPageProductDialog open={openDialog} editBook={editBook} setEditBook={setEditBook} setOpenDialog={setOpenDialog} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProductPage;

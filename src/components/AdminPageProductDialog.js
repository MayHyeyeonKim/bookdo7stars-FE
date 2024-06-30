import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import CloudImageUpload from '../utils/CloudImageUpload';
import { currencyFormat } from '../utils/number';

const AdminPageProductDialog = ({ open, editBook, setEditBook, setOpenDialog }) => {
  const initialBookState = {
    isbn: '',
    title: '',
    author: '',
    categoryName: '',
    publisher: '',
    cover: '',
    description: '',
    priceStandard: '',
    priceSales: '',
    stockStatus: '',
  };
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.book);
  const { selectedBook } = useSelector((state) => state.book);
  const [bookForm, setBookForm] = useState(editBook || { ...initialBookState });
  const [imagePreview, setImagePreview] = useState('');

  // 폼 불러오기.
  useEffect(() => {
    if (editBook) {
      setBookForm(editBook);
      setImagePreview(editBook.cover);
    } else {
      setBookForm({ ...initialBookState });
      setImagePreview('');
    }
  }, [editBook]);

  // 폼 필드 변경 핸들러.
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'StockStatus') {
      value === '' ? '정상' : value;
    }
    if (name === 'cover') setImagePreview(value);
    setBookForm((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // 폼 이미지 업로드 핸들러.
  const handleImageUpload = (newUrl) => {
    setBookForm((prevBook) => ({ ...prevBook, cover: newUrl }));
    newUrl ? setImagePreview('') : setImagePreview(editBook.cover);
  };

  // 도서 다이얼로그 닫기.
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditBook(null);
    setBookForm({ ...initialBookState });
    setImagePreview('');
  };

  // 폼 제출 핸들러.
  const handleSubmit = (event) => {
    event.preventDefault();
    const { isbn, title, author, categoryName, publisher, cover, description, priceStandard, priceSales, stockStatus } = bookForm;

    if (isbn?.trim() === '' || title?.trim() === '' || author?.trim() === '' || publisher?.trim() === '') {
      return alert('폼이 비어 있습니다.');
    }
    if (editBook) {
      dispatch(bookActions.updateBook({ ...bookForm }, selectedBook._id));
    } else {
      dispatch(bookActions.createBook({ ...bookForm }));
    }
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>{editBook ? '상품 수정' : '상품 추가'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="isbn"
          label="ISBN"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.isbn || ''}
          onChange={handleChange}
        />
        <TextField margin="dense" name="title" label="도서명" type="text" fullWidth variant="standard" value={bookForm?.title || ''} onChange={handleChange} />
        <TextField
          margin="dense"
          name="author"
          label="저자 외"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.author || ''}
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          multiline
          margin="dense"
          name="description"
          label="도서 설명"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.description || ''}
          onChange={handleChange}
          rows={3}
        />
        <TextField
          margin="dense"
          name="categoryName"
          label="카테고리"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.categoryName || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stockStatus"
          label="도서 재고"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.stockStatus || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="publisher"
          label="출판사"
          type="text"
          fullWidth
          variant="standard"
          value={bookForm?.publisher || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="priceStandard"
          label="정가"
          type="number"
          fullWidth
          variant="standard"
          value={bookForm?.priceStandard || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="priceSales"
          label="판매가"
          type="number"
          fullWidth
          variant="standard"
          value={bookForm?.priceSales || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cover"
          label="커버 이미지"
          type="text"
          fullWidth
          variant="outlined"
          value={bookForm?.cover || ''}
          onChange={handleChange}
        />
        {imagePreview && <img src={imagePreview} alt="cover preview" style={{ width: '30%', height: 'auto', marginTop: '20px' }} />}
        <CloudImageUpload onUpload={handleImageUpload} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPageProductDialog;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { commentActions } from '../action/commentAction';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

const MyPageMyReviewTable = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userComment } = useSelector((state) => state.comment);
  const comments = userComment?.comment || [];

  useEffect(() => {
    dispatch(commentActions.getMyComment());
  }, [dispatch]);

  // 중복된 책을 필터링하여 하나의 책만 포함된 배열을 반환하는 함수
  const getUniqueBooks = (comments) => {
    const uniqueBooks = [];
    const bookIds = new Set(); // 중복 체크를 위한 Set

    comments.forEach((comment) => {
      if (!bookIds.has(comment.bookId._id)) {
        bookIds.add(comment.bookId._id);
        uniqueBooks.push(comment.bookId); // uniqueBooks 배열에 bookId만 추가
      }
    });

    return uniqueBooks;
  };

  const uniqueBooks = getUniqueBooks(comments);

  return (
    <>
      <Box>
        <Typography mt={1} borderBottom={1} borderColor="grey.200" variant="subtitle2" color="primary">
          도서명을 클릭하시면 도서 페이지로 이동하실 수 있습니다.
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={style} />
              <TableCell style={style}>도서명</TableCell>
              <TableCell style={style}>저자</TableCell>
              <TableCell style={style}>출판사</TableCell>
              <TableCell style={style}>리뷰수</TableCell>
              <TableCell style={style}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueBooks.map((book) => (
              <Row style={style} key={book._id} book={book} comments={comments.filter((cmt) => cmt.bookId._id === book._id)} navigate={navigate} />
            ))}
            {comments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography mt={1}>등록한 리뷰가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Row = ({ book, comments, navigate, style }) => {
  const [open, setOpen] = useState(false);
  const handleBookClick = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <>
      <TableRow>
        <TableCell style={style}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={style} component="th" scope="row" onClick={handleBookClick} sx={{ cursor: 'pointer' }}>
          {book.title}
        </TableCell>
        <TableCell style={style}>{book.author}</TableCell>
        <TableCell style={style}>{book.publisher}</TableCell>
        <TableCell style={style}>{comments.length}</TableCell>
        <TableCell style={style}>{new Date(comments[0].createdAt).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography style={style} variant="h6" gutterBottom component="div">
                리뷰내역
              </Typography>
              <Table size="small" aria-label="reviews">
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment._id}>
                      <TableCell style={style} component="th" scope="row">
                        {new Date(comment.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell style={style} colSpan={3}>
                        {comment.content}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

Row.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  navigate: PropTypes.func.isRequired, // navigate 함수 프로퍼티 추가
};

export default MyPageMyReviewTable;

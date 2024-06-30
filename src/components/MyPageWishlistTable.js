import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { favoriteActions } from '../action/favoriteActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MyPageWishlistTable = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteTableHead = ['', '도서명', '저자', '출판사', '출간일'];
  const { favorite } = useSelector((state) => state.favorite);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(favoriteActions.getFavorite());
  }, [dispatch]);

  // 페이지네이션
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* 상품 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          {/* 테이블 헤더 */}
          <TableHead>
            <TableRow>
              {favoriteTableHead.map((head, index) => (
                <TableCell style={style} key={index}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* 테이블 바디 */}
          <TableBody>
            {favorite?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <StyledTableRow key={item?._id}>
                <StyledTableCell style={style}>{index + 1}</StyledTableCell>
                <StyledTableCell style={style}>
                  {item?.title.slice(0, 20)}
                  {item?.title.slice(0, 20).length > 20 ? '...' : ''}
                </StyledTableCell>
                <StyledTableCell style={style}>{item?.author}</StyledTableCell>
                <StyledTableCell style={style}>{item?.publisher}</StyledTableCell>
                <StyledTableCell style={style}>{item?.pubDate.slice(0, 10)}</StyledTableCell>
              </StyledTableRow>
            ))}
            {favorite.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={6} sx={{ height: '30px' }}>
                  <StyledTableCell mt={1}>주문이 존재하지 않습니다.</StyledTableCell>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between">
        {favorite.length > 0 ? (
          <>
            <Button
              onClick={() => {
                navigate('/mypage/wishlist');
              }}>
              더보기
            </Button>{' '}
            <TablePagination
              rowsPerPageOptions={[3, 5, 7]}
              component="div"
              count={favorite?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default MyPageWishlistTable;

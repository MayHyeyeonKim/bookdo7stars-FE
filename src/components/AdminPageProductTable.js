import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { currencyFormat } from '../utils/number';

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

const AdminPageProductTable = ({ bookList, bookTableHead, handleOpenEditDialog, handleDeleteProduct }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // 페이지네이션
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  };

  return (
    <>
      {/* 상품 테이블 */}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
        <TableContainer sx={{ maxHeight: 590 }}>
          {/* maxHeight: 440 */}
          <Table stickyHeader aria-label="sticky table">
            {/* 테이블 헤드 */}
            <TableHead>
              <TableRow>
                {bookTableHead.map((head, index) => (
                  <StyledTableCell key={index}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 테이블 바디 */}
            <TableBody>
              {bookList.length > 0 ? (
                bookList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
                  <StyledTableRow key={book._id}>
                    <StyledTableCell style={cellStyle} component="th" scope="row">
                      <img src={book.cover} alt={book.title} style={{ width: '50px', height: '50px' }} />
                    </StyledTableCell>
                    <StyledTableCell style={cellStyle}>{book.isbn}</StyledTableCell>
                    <StyledTableCell style={cellStyle}>
                      {book?.title.slice(0, 30)}
                      {book.title?.length > 30 ? '...' : ''}
                    </StyledTableCell>
                    <StyledTableCell style={cellStyle}>
                      {book?.author.slice(0, 10)}
                      {book.author?.length > 10 ? '...' : ''}
                    </StyledTableCell>
                    <StyledTableCell style={cellStyle}>
                      {book.stockStatus}
                      {book.stockStatus === '' ? '정상' : book.stockStatus}
                    </StyledTableCell>
                    <StyledTableCell style={cellStyle}>{book.publisher}</StyledTableCell>
                    <StyledTableCell style={cellStyle}>{currencyFormat(book.priceStandard)}</StyledTableCell>

                    {/* EDIT/DELETE 버튼 */}
                    <StyledTableCell style={cellStyle}>
                      <div>
                        <Button onClick={() => handleOpenEditDialog(book)}>Edit</Button>
                        <Button onClick={() => handleDeleteProduct(book._id)}>Delete</Button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableCell style={{ textAlign: 'center' }}>상품 도서가 존재하지 않습니다.</StyledTableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* 테이블 페이지네이션 */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={bookList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AdminPageProductTable;

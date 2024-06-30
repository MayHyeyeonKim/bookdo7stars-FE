import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
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

const AdminPageOrderTable = ({ orderTableHead, orderList, handleOpenOrderDialog }) => {
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
      <TableContainer component={Paper}>
        <Table>
          {/* 테이블 헤더 */}
          <TableHead>
            <TableRow>
              {orderTableHead.map((head, index) => (
                <TableCell style={cellStyle} key={index}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* ex: 이 도서 외 2개 */}

          {/* 테이블 바디 */}
          <TableBody>
            {orderList.length > 0 ? (
              orderList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                <StyledTableRow key={order?._id} onClick={() => handleOpenOrderDialog(order)}>
                  <StyledTableCell style={cellStyle}>{index + 1}</StyledTableCell>
                  <StyledTableCell style={cellStyle}>{order?.orderNum}</StyledTableCell>
                  <StyledTableCell style={cellStyle}>{order?.createdAt.slice(0, 10)}</StyledTableCell>
                  <StyledTableCell style={cellStyle}>{order?.contact?.name}</StyledTableCell>
                  {order.items.length > 0 ? (
                    <StyledTableCell style={cellStyle}>
                      {order.items[0]?.bookId.title}
                      {order.items.length > 1 && `외 ${order.items.length - 1}개`}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell style={cellStyle}></StyledTableCell>
                  )}
                  <StyledTableCell style={cellStyle}>{order?.shipTo?.address1}</StyledTableCell>
                  <StyledTableCell style={cellStyle}>{currencyFormat(order?.totalPrice)}</StyledTableCell>
                  <StyledTableCell style={cellStyle}>{order?.status}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableCell style={{ textAlign: 'center' }}>주문이 존재하지 않습니다.</StyledTableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={orderList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdminPageOrderTable;

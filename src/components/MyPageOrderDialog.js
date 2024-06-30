import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { currencyFormat } from '../utils/number';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const cellStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '150px',
};

const MyPageOrderDialog = ({ open, handleClose }) => {
  const { selectedOrder } = useSelector((state) => state.order);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>주문 상세 정보</DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>주문번호</TableCell>
                <TableCell style={cellStyle}>주문일자</TableCell>
                <TableCell style={cellStyle}>이메일</TableCell>
                <TableCell style={cellStyle}>주소</TableCell>
                <TableCell style={cellStyle}>연락처</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>{selectedOrder?.orderNum}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.createdAt.slice(0, 10)}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.contact?.email}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.shipTo?.address1 + '' + selectedOrder?.shipTo?.address2}</TableCell>
                <TableCell style={cellStyle}>{selectedOrder?.contact?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={cellStyle}>도서명</StyledTableCell>
                <StyledTableCell style={cellStyle}>권당 가격</StyledTableCell>
                <StyledTableCell style={cellStyle}>권수</StyledTableCell>
                <StyledTableCell style={cellStyle}>총 가격</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedOrder?.items?.length > 0 &&
                selectedOrder?.items?.map((item) => (
                  <TableRow key={selectedOrder._id}>
                    <TableCell style={cellStyle}>{item?.bookId?.title}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.price)}</TableCell>
                    <TableCell style={cellStyle}>{item?.qty}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.price * item?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableCell style={cellStyle}>총 주문액: {currencyFormat(selectedOrder?.totalPrice)}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyPageOrderDialog;

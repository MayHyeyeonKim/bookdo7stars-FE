import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { currencyFormat } from '../utils/number';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderActions';
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

const MyPageCancelDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { selectedRequest } = useSelector((state) => state.order);
  const { myOrderList } = useSelector((state) => state.order);
  const [bookTitle, setBookTitle] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [user, dispatch]);

  useEffect(() => {
    if (selectedRequest && myOrderList) {
      const order = myOrderList.find((order) => order._id === selectedRequest._id);
      if (order) {
        order.items.forEach((item) => {
          const BookTitle = item.bookId.title;
          setBookTitle(BookTitle);
        });
      }
    }
  }, [selectedRequest, myOrderList]);

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>취소 상세 내역</DialogTitle>
      <DialogContent dividers>
        {/* 주문정보 */}
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
                <TableCell style={cellStyle}>{selectedRequest?.orderNum}</TableCell>
                <TableCell style={cellStyle}>{selectedRequest?.createdAt.slice(0, 10)}</TableCell>
                <TableCell style={cellStyle}>{selectedRequest?.contact?.email}</TableCell>
                <TableCell style={cellStyle}>{selectedRequest?.shipTo?.address1 + '' + selectedRequest?.shipTo?.address2}</TableCell>
                <TableCell style={cellStyle}>{selectedRequest?.contact?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 요청정보 */}
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>요청일자</TableCell>
                <TableCell style={cellStyle}>처리상태</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>{selectedRequest?.createdAt.slice(0, 10)}</TableCell>
                <TableCell style={cellStyle}>{selectedRequest?.request?.requestType}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <TextField
            label="취소사유"
            value={selectedRequest?.request?.reason}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </TableContainer>
        {/* 상세주문내역 */}

        <TableContainer component={Paper}>
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
              {selectedRequest?.items?.length > 0 &&
                selectedRequest?.items?.map((item) => (
                  <TableRow key={selectedRequest._id}>
                    <TableCell style={cellStyle}>{bookTitle}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.price)}</TableCell>
                    <TableCell style={cellStyle}>{item?.qty}</TableCell>
                    <TableCell style={cellStyle}>{currencyFormat(item?.price * item?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableCell>총 주문액: {currencyFormat(selectedRequest?.totalPrice)}</TableCell>
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

export default MyPageCancelDialog;

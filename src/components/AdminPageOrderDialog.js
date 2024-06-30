import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderActions';
import { currencyFormat } from '../utils/number';

const AdminPageOrderDialog = ({ open, handleClose, orderDialogTableHead }) => {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState(selectedOrder?.status || '');

  // 주문 진행 상태 변경 핸들러.
  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  // 주문 변경 제출 핸들러.
  const handleOrderSubmit = (event) => {
    event.preventDefault();
    dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
      <DialogTitle>주문정보</DialogTitle>

      {/* 주문 정보 */}
      <DialogContent>
        <Typography>예약번호: {selectedOrder?.orderNum}</Typography>
        <Typography>주문날짜: {selectedOrder?.createdAt?.slice(0, 10)}</Typography>
        <Typography>이메일: {selectedOrder?.contact?.email}</Typography>
        <Typography>주소: {selectedOrder?.shipTo?.address1 + ' ' + selectedOrder?.shipTo?.address2}</Typography>
        <Typography>연락처: {`${selectedOrder?.contact?.name} ${selectedOrder?.contact?.phone}`}</Typography>
        <TableContainer>
          <Table>
            {/* 테이블 헤드 */}
            <TableHead>
              <TableRow>
                {orderDialogTableHead.map((head, index) => (
                  <TableCell key={index}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 테이블 바디 */}
            <TableBody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.bookId?.title}</TableCell>
                    <TableCell>{currencyFormat(order?.price)}</TableCell>
                    <TableCell>{order?.qty}</TableCell>
                    <TableCell>{currencyFormat(order?.price * order?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4}>총계: {currencyFormat(selectedOrder?.totalPrice)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 주문 상태 변경 */}
        <form onSubmit={handleOrderSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((status, index) => (
                <MenuItem key={index} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Grid container>
              <Grid item sx={6}>
                <Button onClick={handleClose} color="secondary">
                  닫기
                </Button>
              </Grid>
              <Grid item sx={6}>
                <Button type="submit" color="primary">
                  저장
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPageOrderDialog;

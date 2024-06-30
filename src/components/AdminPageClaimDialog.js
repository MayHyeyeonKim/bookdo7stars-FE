import React, { useState } from 'react';
import {
  Box,
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
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderActions';
import { currencyFormat } from '../utils/number';

const AdminPageClaimDialog = ({ open, handleClose, orderDialogTableHead }) => {
  const dispatch = useDispatch();
  const { selectedRequest } = useSelector((state) => state.order);
  const { selectedOrder } = useSelector((state) => state.order);
  const [requestStatus, setRequestStatus] = useState(selectedRequest?.request.status || '');
  const [isTableVisible, setIsTableVisible] = useState(false);

  // 주문 내역 테이블 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setIsTableVisible(!isTableVisible);
  };

  // 주문 진행 상태 변경 핸들러.
  const handleStatusChange = (event) => {
    setRequestStatus(event.target.value);
  };

  // 주문 문의 변경 제출 핸들러.
  const handleOrderSubmit = (event) => {
    event.preventDefault();
    dispatch(orderActions.updateRequest(selectedRequest._id, requestStatus));
    handleClose();
  };

  const getBookTitle = (bookId) => {
    const item = selectedOrder?.items.find((item) => item.bookId._id === bookId);
    return item ? item.bookId.title : '';
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
      <DialogTitle>문의정보</DialogTitle>

      {/* 주문 정보 */}
      <DialogContent>
        <Box mb={2}>
          <Typography>예약번호: {selectedRequest?.orderNum}</Typography>
          <Typography>주문날짜: {selectedRequest?.createdAt?.slice(0, 10)}</Typography>
          <Typography>이메일: {selectedRequest?.contact?.email}</Typography>
          <Typography>주소: {selectedRequest?.shipTo?.address1 + ' ' + selectedRequest?.shipTo?.address2}</Typography>
          <Typography>연락처: {`${selectedRequest?.contact?.name} ${selectedRequest?.contact?.phone}`}</Typography>
        </Box>

        {/* 요청사항 */}
        <Box mb={2}>
          {/* <Typography color="red">요청사항:{selectedRequest?.request?.requestType} </Typography> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>요청 유형</TableCell>
                  <TableCell>배송 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell color="red">{selectedRequest?.request?.requestType}</TableCell>
                  <TableCell>{selectedRequest?.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TextField
            label="신청사유"
            value={selectedRequest?.request?.reason}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        {/* 주문내역 테이블 */}
        <Button onClick={handleButtonClick}>{isTableVisible ? '숨기기' : '상세주문내역 확인'}</Button>
        {isTableVisible && (
          <div>
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
                  {selectedRequest?.items.length > 0 &&
                    selectedRequest?.items.map((request) => (
                      <TableRow key={request?._id}>
                        <TableCell>{request?._id}</TableCell>
                        <TableCell>{getBookTitle(request.bookId) ? getBookTitle(request.bookId) : '주문관리에서 확인'}</TableCell>
                        <TableCell>{currencyFormat(request?.price)}</TableCell>
                        <TableCell>{request?.qty}</TableCell>
                        <TableCell>{currencyFormat(request?.price * request?.qty)}</TableCell>
                      </TableRow>
                    ))}
                  {/* <TableRow>
                    <TableCell colSpan={4}>총계: {currencyFormat(selectedRequest?.totalPrice)}</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* 주문 문의 상태 변경 */}
        <form onSubmit={handleOrderSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={requestStatus} onChange={handleStatusChange}>
              {REQUEST_STATUS.map((status, index) => (
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

export default AdminPageClaimDialog;

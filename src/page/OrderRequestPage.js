import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/system';
import { orderActions } from '../action/orderActions';
import { useNavigate } from 'react-router';

const OrderRequestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const [orderNum, setOrderNum] = useState('');
  const [requestType, setRequestType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [dispatch, user]);

  const handleSubmit = () => {
    dispatch(orderActions.requestOrder(orderNum, requestType, reason, navigate));
  };

  return (
    <Container>
      <Box p={7}>
        <Typography variant="h6">반품/교환/취소 신청하기</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>주문 번호</InputLabel>
          <Select value={orderNum} onChange={(e) => setOrderNum(e.target.value)}>
            {myOrderList?.length > 0 &&
              myOrderList.map((order) => (
                <MenuItem key={order._id} value={order.orderNum}>
                  {`${order?.orderNum} - ${
                    order.items
                      .map((item) => item.bookId?.title)
                      .join(', ')
                      .slice(0, 30) || '제목 없음'
                  }...`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>신청 유형</InputLabel>
          <Select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
            <MenuItem value="반품">반품</MenuItem>
            <MenuItem value="교환">교환</MenuItem>
            <MenuItem value="취소">취소</MenuItem>
          </Select>
        </FormControl>
        <TextField label="신청 사유" multiline rows={4} fullWidth margin="normal" value={reason} onChange={(e) => setReason(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          신청하기
        </Button>
      </Box>
    </Container>
  );
};

export default OrderRequestPage;

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Divider, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNum } = useSelector((state) => state.order);
  const { shippingInfo, grandTotal, paymentMethod } = location.state || {
    shippingInfo: {},
    grandTotal: 0,
    paymentMethod: '',
  };

  useEffect(() => {
    if (!orderNum) {
      navigate('/');
    }
  }, [orderNum, navigate]);

  const handleViewOrderDetails = () => {
    navigate('/mypage/order-list');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const getDepositDeadline = () => {
    const now = new Date();
    now.setHours(now.getHours() + 12);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return now.toLocaleString('ko-KR', options);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4, border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
      <Box textAlign="center" mb={4}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          주문완료
        </Typography>
        <Typography variant="body1" color="textSecondary">
          주문이 완료되었습니다.
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          주문번호: {orderNum}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleViewOrderDetails}>
            주문상세보기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleContinueShopping}>
            계속 쇼핑하기
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          배송정보
        </Typography>
        <Typography variant="body2">받는 분: {shippingInfo.name}</Typography>
        <Typography variant="body2">
          배송지: {shippingInfo.address1} {shippingInfo.address2}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          결제정보 수신 이메일주소
        </Typography>
        <Typography variant="body2">{shippingInfo.email}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          결제금액
        </Typography>
        <Typography variant="h5" color="primary">
          ₩ {grandTotal}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          결제수단
        </Typography>
        <Typography variant="body2">
          {paymentMethod}
          {paymentMethod === 'transfer' && (
            <Typography variant="body2" color="error" ml={2}>
              {getDepositDeadline()}까지 입금해주세요.
            </Typography>
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderCompletePage;

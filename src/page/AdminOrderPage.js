import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Paper, Tabs, Tab, useMediaQuery } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
import AdminPageOrderDialog from '../components/AdminPageOrderDialog';
import AdminPageClaimTable from '../components/AdminPageClaimTable';
import AdminPageClaimDialog from '../components/AdminPageClaimDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const orderTableHead = ['', '주문번호', '주문일자', '구매자', '도서명', '주소', '총 주문액', '주문상태'];
  const claimTableHead = ['', '주문번호', '주문일자', '구매자', '요청사항', '처리상태'];
  const orderDialogTableHead = ['ID', '도서명', '권당 가격', '권수', '총 가격'];
  const { orderList } = useSelector((state) => state.order);
  const { requestList } = useSelector((state) => state.order);
  const [query, setQuery] = useSearchParams();
  const fields = ['orderNum', 'userName'];
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const totalField = fields.reduce((total, option) => {
    total[option] = query.get(option) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  useEffect(() => {
    if (searchQuery.orderNum === '') delete searchQuery.orderNum;
    if (searchQuery.userName === '') delete searchQuery.userName;
    const params = new URLSearchParams();
    Object.keys(searchQuery).forEach((key) => {
      const value = searchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    navigate('?' + params.toString());
    dispatch(orderActions.getOrderList({ ...searchQuery }));
    dispatch(orderActions.getRequestList({ ...searchQuery }));
  }, [searchQuery]);

  // 검색한 값을 리셋하기.
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

  // 상세 검색 쿼리 필터.
  // const filteredOrders = orderList.filter((order) => {
  //   const orderDate = new Date(order.createdAt);
  //   const startDate = searchQuery.startDate ? new Date(searchQuery.startDate) : null;
  //   const endDate = searchQuery.endDate ? new Date(searchQuery.endDate) : null;
  //   const withinDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
  //   return withinDateRange && orderList;
  // });

  // 주문 수정 다이얼로그 열기.
  const handleOpenOrderDialog = (order) => {
    setOpenDialog(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };
  const handleOpenRequestDialog = (request) => {
    setOpenRequestDialog(true);
    dispatch({ type: types.SET_SELECTED_REQUEST, payload: request });
  };

  // 주문 다이얼로그 닫기.
  const handleCloseOrderDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12}>
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} resetSearch={resetSearch} />

          <Box sx={{ width: '100%' }}>
            <Paper square>
              <Tabs value={tabIndex} indicatorColor="primary" textColor="primary" onChange={handleTabChange} aria-label="admin tabs" variant="fullWidth">
                <Tab label="주문 관리" />
                <Tab label="클레임 관리" />
              </Tabs>
            </Paper>
            <Box mt={3}>
              {tabIndex === 0 && <AdminPageOrderTable orderTableHead={orderTableHead} orderList={orderList} handleOpenOrderDialog={handleOpenOrderDialog} />}
              {tabIndex === 1 && (
                <AdminPageClaimTable claimTableHead={claimTableHead} requestList={requestList} handleOpenRequestDialog={handleOpenRequestDialog} />
              )}
            </Box>
          </Box>

          {openDialog && <AdminPageOrderDialog open={openDialog} handleClose={handleCloseOrderDialog} orderDialogTableHead={orderDialogTableHead} />}
          {openRequestDialog && (
            <AdminPageClaimDialog open={openRequestDialog} handleClose={handleCloseRequestDialog} orderDialogTableHead={orderDialogTableHead} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

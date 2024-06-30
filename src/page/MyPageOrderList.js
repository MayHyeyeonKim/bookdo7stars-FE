import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Container,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  TableContainer,
  Paper,
} from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import MyPageOrderDialog from '../components/MyPageOrderDialog';
import { format, isValid, startOfDay, endOfDay } from 'date-fns';
import DateFilterCondition from '../components/DateFilterCondition';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderActions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as types from '../constants/order.constants';
import { currencyFormat } from '../utils/number';

const MyPageOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);
  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderNum');
  const [searchQuery, setSearchQuery] = useState({});
  const [query, setQuery] = useSearchParams();
  const [sortedOrderList, setSortedOrderList] = useState([]);

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [user, dispatch]);

  useEffect(() => {
    if (searchQuery.orderNum === '') delete searchQuery.orderNum;
    const params = new URLSearchParams(searchQuery);
    navigate('?' + params.toString());
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [searchQuery]);

  useEffect(() => {
    setSortedOrderList(orderList);
  }, [orderList]);

  useEffect(() => {
    if (recentChecked) {
      setSortedOrderList([...orderList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else if (oldChecked) {
      setSortedOrderList([...orderList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    } else {
      setSortedOrderList(orderList);
    }
  }, [recentChecked, oldChecked, orderList]);

  const handleRecentChange = (event) => {
    setRecentChecked(event.target.checked);
    setOldChecked(!event.target.checked);
  };

  const handleOldChange = (event) => {
    setOldChecked(event.target.checked);
    setRecentChecked(!event.target.checked);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (startDate && endDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const formattedStartDate = startOfDay(new Date(startDate));
      const formattedEndDate = endOfDay(new Date(endDate));

      setSearchQuery({
        ...searchQuery,
        startDate: format(formattedStartDate, 'yyyy-MM-dd HH:mm:ss'),
        endDate: format(formattedEndDate, 'yyyy-MM-dd HH:mm:ss'),
      });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  // 검색 리셋
  const resetSearch = () => {
    setSearchQuery({});
    setStartDate(null);
    setEndDate(null);
    setQuery({});
  };

  // 초기 렌더링 시 검색 리셋
  useEffect(() => {
    resetSearch();
  }, []);

  // 주문 상세 다이얼로그 열기
  const handleOpenDialog = (order) => {
    setDialogOpen(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  // 주문 상세 다이얼로그 닫기
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // 테이블 셀 스타일
  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  };

  return (
    <Container>
      <Box sx={isMobile ? {} : { p: 3 }}>
        <Grid container mb={1} style={{ fontSize: '15px' }}>
          <Link href="/" underline="hover" color="inherit">
            welcome
          </Link>
          <Typography mr={1} ml={1}>{`>`}</Typography>
          <Link href="/mypage" underline="hover" color="primary" fontWeight="medium">
            mypage
          </Link>
        </Grid>

        {/* 마이페이지 */}
        <Grid container>
          <Typography variant="h4" gutterBottom fontWeight="medium">
            <Link href="/mypage" color="primary" sx={{ textDecoration: 'none' }}>
              마이페이지
            </Link>
          </Typography>
        </Grid>
        {isMobile ? (
          <>
            <Grid container mb={1} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="subtitle2"> {user?.userName}님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
            </Grid>

            <Grid container mb={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="subtitle2" display="inline">
                나의 북두칠성 등급:
              </Typography>
              <Box display="inline" ml={1}>
                <Typography
                  variant="subtitle2"
                  border={1}
                  borderRadius={2}
                  borderColor="primary.light"
                  bgcolor="primary.light"
                  color="white"
                  sx={{ fontSize: isMobile ? '0.8rem' : '1.3rem', p: '3px' }}>
                  {user?.level}
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid container>
            <Typography variant="subtitle1">{user?.userName}님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
          </Grid>
        )}

        <Grid container>
          {/* 마이페이지 좌측 카테고리 */}
          <Grid item xs={12} md={3}>
            <MyPageCategory />
          </Grid>

          {/* 마이페이지 우측 정보 */}
          <Grid item xs={12} md={9}>
            <Box mt={2} sx={isMobile ? {} : { ml: 3, mb: 4 }}>
              <Typography variant="subtitle2" ml={1} mb={1}>
                최근 10년간 주문내역을 조회하실 수 있습니다.
              </Typography>
              <Grid container border={3} borderRadius={4} sx={{ borderColor: 'primary.main', opacity: '70%' }} p={3}>
                <Grid container>
                  <DateFilterCondition startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                </Grid>
                {/* 상세 조건 검색 */}
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12} md={2}>
                    <Select
                      value={selectedOption || ''}
                      onChange={(event) => {
                        setSelectedOption(event.target.value);
                      }}
                      fullWidth
                      sx={{ height: '40px' }}>
                      <MenuItem value="orderNum">주문번호</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label={selectedOption === 'orderNum' ? '주문번호' : ''}
                      variant="outlined"
                      fullWidth
                      value={searchQuery[selectedOption] || ''}
                      placeholder="내용을 입력해주세요."
                      InputLabelProps={{ shrink: true, style: { top: 0 } }}
                      InputProps={{ style: { height: '40px', padding: '0 14px' } }}
                      sx={{ width: isMobile ? '100%' : '280px', height: '40px' }}
                      onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
                    />
                  </Grid>

                  {/* 검색 버튼 */}
                  <Grid item xs={12} md={8} align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginLeft: isMobile ? 0 : 0, width: '13ch', height: '40px' }}
                      onClick={handleSearch}>
                      조회
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginLeft: isMobile ? 2 : 1, width: '13ch', height: '40px' }}
                      onClick={resetSearch}>
                      초기화
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* 광고 짧은 배너 */}
              <Typography
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  typography: isMobile ? 'subtitle2' : '',
                  mt: isMobile ? 3 : 1,
                }}
                mt={2}
                p={1}
                border={1}
                borderRadius={4}
                align="center">
                구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
              </Typography>

              {/* 정렬기준 */}
              <Box sx={{ mt: isMobile ? 1 : 0 }}>
                <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <FormControlLabel
                    control={<Checkbox checked={recentChecked} onChange={handleRecentChange} />}
                    label={<Typography variant="body2">최근순</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={oldChecked} onChange={handleOldChange} />}
                    label={<Typography variant="body2">오래된순</Typography>}
                  />
                </FormGroup>
              </Box>

              {/* 주문 내역 테이블 */}
              <Typography variant="h6">주문 내역/배송 상태</Typography>
              <TableContainer component={Paper} sx={{ mt: isMobile ? 1 : 0 }}>
                <Table>
                  {/* 테이블 헤드 */}
                  <TableHead>
                    <TableRow>
                      <TableCell style={cellStyle}>주문번호</TableCell>
                      <TableCell style={cellStyle}>주문일자</TableCell>
                      <TableCell style={cellStyle}>주문내역</TableCell>
                      <TableCell style={cellStyle}>총주문액</TableCell>
                      <TableCell style={cellStyle}>주문상태</TableCell>
                    </TableRow>
                  </TableHead>

                  {/* 테이블 바디 */}
                  <TableBody>
                    {sortedOrderList?.length > 0 &&
                      sortedOrderList?.map((item) => (
                        <TableRow key={item._id} onClick={() => handleOpenDialog(item)}>
                          <TableCell style={{ ...cellStyle, cursor: 'pointer' }}>{item.orderNum}</TableCell>
                          <TableCell style={cellStyle}>{item.createdAt.slice(0, 10)}</TableCell>
                          <TableCell style={cellStyle}>
                            {item?.items
                              ?.map((item) => item.bookId?.title)
                              .join(', ')
                              .slice(0, 25)}
                            {item?.items?.map((item) => item.bookId?.title).join(', ').length > 25 ? '...' : ''}
                          </TableCell>
                          <TableCell style={cellStyle}>{currencyFormat(item.totalPrice)}</TableCell>
                          <TableCell style={cellStyle}>{item.status}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle2" sx={{ mt: isMobile ? 3 : 2 }}>
                - 주문번호를 클릭하시면 주문상세내역을 확인하실수 있습니다.
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: isMobile ? 4 : 0 }}>
                - 발송 전 주문은 주문상세내역에서 주문취소, 배송 주소 변경(국내배송만 해당) 이 가능합니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 주문 상세 다이얼로그 */}
      <MyPageOrderDialog open={dialogOpen} handleClose={handleCloseDialog} />
    </Container>
  );
};

export default MyPageOrderList;

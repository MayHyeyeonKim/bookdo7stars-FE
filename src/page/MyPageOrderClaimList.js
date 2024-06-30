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
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  TableContainer,
  Paper,
} from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import MyPageClaimDialog from '../components/MyPageClaimDialog';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';
import { currencyFormat } from '../utils/number';

const MyPageOrderClaimList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { myRequestList } = useSelector((state) => state.order);
  const { myOrderList } = useSelector((state) => state.order);
  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(orderActions.getMyRequest());
    dispatch(orderActions.getMyOrder());
  }, [user, dispatch]);

  const handleClaim = () => {
    navigate('/mypage/order-request');
  };

  const handleRecentChange = (event) => {
    setRecentChecked(event.target.checked);
    setOldChecked(!event.target.value);
    setSortOrder('recent');
  };
  const handleOldChange = (event) => {
    setOldChecked(event.target.checked);
    setRecentChecked(!event.target.value);
    setSortOrder('old');
  };
  const sortedMyOrderList = [...myRequestList].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // // 주문 상세 다이얼로그 열기
  const handleOpenDialog = (request) => {
    setDialogOpen(true);
    dispatch({ type: types.SET_SELECTED_REQUEST, payload: request });
  };

  // 주문 상세 다이얼로그 닫기
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
                <Typography variant="subtitle2" border={1} borderRadius={4} borderColor="primary.light" bgcolor="primary.light" color="white" p="2px">
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
          <Grid item md={9}>
            <Box mt={2} sx={isMobile ? {} : { ml: 3, mb: 4 }}>
              {isMobile ? (
                <Grid container alignItems="center" mb={2}>
                  <Typography ml={1} variant="subtitle2">
                    구매하셨던 상품의 반품 및 교환, 취소신청을 하실 수 있습니다.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ width: '100%', height: '30px', borderRadius: '20px', marginTop: '10px', borderColor: 'primary.main', opacity: '70%' }}
                    onClick={handleClaim}>
                    <Typography variant="subtitle2" color="white">
                      반품/교환/취소 신청하기
                    </Typography>
                  </Button>
                </Grid>
              ) : (
                <Grid container alignItems="center" mb={2}>
                  <Typography variant="subtitle2">구매하셨던 상품의 반품 및 교환, 취소신청 및 내역을 조회하실 수 있습니다.</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ width: '100%', height: '30px', borderRadius: '20px', marginTop: '10px', borderColor: 'primary.main', opacity: '70%' }}
                    onClick={handleClaim}>
                    <Typography variant="subtitle2" color="white">
                      반품/교환/취소 신청하기
                    </Typography>
                  </Button>
                </Grid>
              )}

              {/* 정렬기준 */}
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

              {/* 주문 내역 테이블 */}
              <Typography variant="h6">반품/교환 신청내역</Typography>
              <TableContainer component={Paper} sx={{ mt: isMobile ? 1 : 0, overflowX: 'auto', maxWidth: isMobile ? '400px' : '100%' }}>
                <Table>
                  {/* 테이블 헤드 */}
                  <TableHead>
                    <TableRow>
                      <TableCell style={cellStyle}>접수일자</TableCell>
                      <TableCell style={cellStyle}>주문내역</TableCell>
                      <TableCell style={cellStyle}>총주문액</TableCell>
                      <TableCell style={cellStyle}>요청사항</TableCell>
                      <TableCell style={cellStyle}>처리상태</TableCell>
                    </TableRow>
                  </TableHead>

                  {/* 테이블 바디 */}
                  <TableBody>
                    {sortedMyOrderList?.length > 0 ? (
                      sortedMyOrderList
                        .filter((item) => item.request.requestType == ('반품' || '교환'))
                        .map((item, index) => (
                          <TableRow key={index} onClick={() => handleOpenDialog(item)}>
                            <TableCell style={cellStyle}>{item.createdAt.slice(0, 10)}</TableCell>
                            <TableCell style={{ ...cellStyle, cursor: 'pointer' }}>
                              {`${
                                (myOrderList.length > 0 &&
                                  myOrderList
                                    .find((order) => order.orderNum === item.orderNum)
                                    ?.items.map((orderItem) => orderItem.bookId?.title)
                                    .join(', ')
                                    .slice(0, 25) +
                                    (myOrderList
                                      .find((order) => order.orderNum === item.orderNum)
                                      ?.items.map((orderItem) => orderItem.bookId?.title)
                                      .join(', ').length > 25
                                      ? '...'
                                      : '')) ||
                                '제목 없음'
                              }`}
                            </TableCell>
                            <TableCell style={cellStyle}>{currencyFormat(item.totalPrice)}</TableCell>
                            <TableCell style={cellStyle}>{item.request.requestType}</TableCell>
                            <TableCell style={cellStyle}>{item.request.status}</TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                          주문이 존재하지 않습니다.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* 안내 사항 */}
              <Box mt={3} border={1} borderColor="grey.300" p={2} borderRadius={1} sx={isMobile ? { maxWidth: 400 } : { maxWidth: 800 }}>
                <Typography variant="body1">
                  <Typography variant="subtitle2">1. 신청안내</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">{'출고완료 후 10일 이내 주문 상품에 대해 신청이 가능합니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="red">
                        {'다른 상품으로의 교환은 불가합니다. [반품] 후 새로 주문해주세요.'}
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">2. 유의사항</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">
                        {
                          '사서함, 군부대, 도서산간 지역 등은 지정회사 택배로 반품이 불가능하오니 신청 후 상품을 직접 반품해주시기 바랍니다. (상품파손, 오배송의 경우 반품 배송비는 고객센터로 연락 주시면 환불해 드리겠습니다.)'
                        }
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="red">
                        {'수령 전 부분 반품 접수 시 상품 전체가 반송되오니 수령 후 접수해 주세요.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'반품 신청하신 상품 또는 사은품을 일부라도 반송하지 않는 경우 환불이 보류될 수 있습니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'분철상품의 경우, 물리적 편집 작업 후 출고되는 상품으로 반품/교환이 불가합니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {
                          '세트 상품의 경우 낱권 교환이 불가합니다. 배송 중 반송, 접수 없이 임의 반송된 내역의 처리는 반드시 당사 물류센터 도착 후 일주일 내 연락 부탁드립니다.'
                        }
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">3. 환불안내</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">
                        {'배송비추가 : 무료배송 기준이 아닌 경우 추가 배송비가 청구됩니다. 여러 박스로 반송하는 경우 박스당 배송비가 청구됩니다.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'상품권 소멸 : 유효기간이 지난 상품권은 자동 소멸됩니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {
                          '쿠폰 환불 : 할인 조건에 따라 쿠폰이 복구되며, 유효기간이 지난 경우 소멸됩니다. 궁금하신 사항은 1:1 친절상담을 이용하시면 친절히 답변해드리겠습니다.'
                        }
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">4. 반품, 교환 상품 발송 시 필요사항</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2" color="red">
                        {'박스나 봉투에 포장 후 주문번호, 이름을 기재해주세요.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'반품주소 : (10846) 경기도 파주시 탄현면 월롱산로 294-58 북두칠성 물류센터 내 반송담당자 앞'}</Typography>
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* 추가 문의 사항 */}
              <Typography variant="subtitle2" gutterBottom mt={3} ml={1} color="red">
                {'아래의 경우는 1:1문의나 고객만족센터(1544-3800)로 문의해주세요.'}
              </Typography>

              {isMobile ? (
                <Box border={1} borderColor="grey.300" p={2} sx={{ mb: isMobile ? 5 : 0 }}>
                  <Typography variant="body2">접수한 내역이 취소 또는 변경이 불가능한 경우</Typography>
                  <Typography variant="body2">업체 배송 상품/직수입 외서/ 해외 배송 주문</Typography>
                  <Typography variant="body2">
                    매장에서 픽업 서비스로 수령받은 상품은 매장에서 교환/반품/환불 처리는 불가하며, 고객센터 연락 후 택배사를 이용해야 합니다.
                  </Typography>
                </Box>
              ) : (
                <ul>
                  <li>
                    <Typography variant="body2">{'접수한 내역이 취소 또는 변경이 불가능한 경우'}</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">{'업체 배송 상품/직수입 외서/ 해외 배송 주문'}</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      {'매장에서 픽업 서비스로 수령받은 상품은 매장에서 교환/반품/환불 처리는 불가하며, 고객센터 연락 후 택배사를 이용해야 합니다.'}
                    </Typography>
                  </li>
                </ul>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 반품/교환 상세 다이얼로그 */}
      <MyPageClaimDialog open={dialogOpen} handleClose={handleCloseDialog} />
    </Container>
  );
};

export default MyPageOrderClaimList;

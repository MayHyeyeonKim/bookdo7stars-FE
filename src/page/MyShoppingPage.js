import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Tabs,
  Tab,
  Container,
  Grid,
  TableContainer,
  Paper,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyPageCategory from '../components/MyPageCategory';
import { useDispatch, useSelector } from 'react-redux';
import { contactActions } from '../action/contactActions';
import InquiryTable from '../components/InquiryTable';
import { orderActions } from '../action/orderActions';
import MyPageWishlistTable from '../components/MyPageWishlistTable';
import MyPageMyReviewTable from '../components/MyPageMyReviewTable';

const MyShoppingPage = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const { userContacts } = useSelector((state) => state.contact);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
    dispatch(contactActions.getContactsByUser());
  }, [dispatch]);

  // console.log('user', user);

  const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
  };

  return (
    <Container>
      <Box p={3}>
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
          <Grid item xs={12} md={9} sx={isMobile ? {} : { pl: 3 }}>
            {/* 최근 주문 내역 */}
            <Box mt={2}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6">최근 주문 내역</Typography>
                <Link href="/mypage/order-list" underline="hover" color="inherit" sx={isMobile ? { mt: 1 } : { ml: 1, mt: 1 }}>
                  <Typography variant="subtitle2" color="primary">
                    더보기
                  </Typography>
                </Link>
              </Grid>

              <TableContainer component={Paper} sx={{ mt: isMobile ? 1 : 0 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={cellStyle}>주문번호</TableCell>
                      <TableCell style={cellStyle}>주문일자</TableCell>
                      <TableCell style={cellStyle}>주문내역</TableCell>
                      <TableCell style={cellStyle}>주문상태</TableCell>
                      <TableCell style={cellStyle}>비고</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {myOrderList.length > 0 &&
                      myOrderList.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell style={cellStyle}>{item.orderNum}</TableCell>
                          <TableCell style={cellStyle}>{item.createdAt.slice(0, 10)}</TableCell>
                          <TableCell style={cellStyle}>
                            {item.items
                              ?.map((orderItem) => orderItem.bookId?.title)
                              .join(', ')
                              .slice(0, 20)}
                            {item.items?.map((orderItem) => orderItem.bookId?.title).join(', ').length > 20 ? '...' : ''}
                          </TableCell>
                          <TableCell style={cellStyle}>{item.status}</TableCell>
                          <TableCell style={cellStyle}></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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

            <Box mt={5}>
              <Typography
                variant="h6"
                mt={5}
                sx={{
                  borderBottom: isMobile ? 'none' : '1px solid',
                  borderColor: isMobile ? 'transparent' : 'grey.400',
                }}>
                나의 1:1 문의
              </Typography>{' '}
              <Box mt={2} textAlign="center">
                <TableContainer component={Paper} sx={isMobile ? { mt: 1 } : {}}>
                  {userContacts.length === 0 ? (
                    <Typography variant="subtitle1">문의 사항이 없습니다.</Typography>
                  ) : (
                    <InquiryTable style={cellStyle} inquiries={userContacts} />
                  )}
                </TableContainer>{' '}
              </Box>
            </Box>

            {/* 위시리스트/ 나의 리뷰 */}
            <Box mt={5} sx={{ mb: isMobile ? 3 : 0 }}>
              <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} selectionFollowsFocus>
                <Tab label="위시리스트" />
                <Tab label="마이리뷰" />
              </Tabs>
              {tabIndex === 0 && <MyPageWishlistTable style={cellStyle} />}
              {tabIndex === 1 && <MyPageMyReviewTable style={cellStyle} />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyShoppingPage;

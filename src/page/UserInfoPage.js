import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import { orderActions } from '../action/orderActions';
import useDebouncedResizeObserver from '../hooks/useDebouncedResizeObserver';

const UserInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const [showPassword, setShowPassword] = useState(false);
  const [sensitiveInfo, setSensitiveInfo] = useState(false);
  const [openSensitive, setOpenSensitive] = useState(false);
  // const isMobile = useMediaQuery('(max-width:600px)');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useDebouncedResizeObserver(handleResize, 200);

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const [userInfo, setUserInfo] = useState({
    zipCode: '',
    address1: '',
    address2: '',
    phone: '',
  });

  useEffect(() => {
    if (myOrderList.length > 0) {
      if (user) {
        setUserInfo({
          zipCode: user.address.zipCode || '',
          address1: user.address.address1 || '',
          address2: user.address.address2 || '',
          phone: user.phone || '',
        });
      } else {
        const firstOrder = myOrderList[0];
        setUserInfo({
          zipCode: firstOrder.shipTo.zipCode || '',
          address1: firstOrder.shipTo.address1 || '',
          address2: firstOrder.shipTo.address2 || '',
          phone: firstOrder.contact.phone || '',
        });
      }
    }
  }, [myOrderList]);

  const handleShowPasswordToggle = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleSensitiveInfoToggle = () => {
    setSensitiveInfo(!sensitiveInfo);
    setOpenSensitive(true);
  };

  const handleInfoChange = () => {
    if (openSensitive === false) {
      return alert('[숨은 정보 해제] 버튼을 누르시면 * 표시로 가려져 보이는 정보를 확인 및 회원정보 수정을 하실 수 있습니다.');
    }
    dispatch(userActions.userInfoChange(user._id, userInfo));
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            zipCode: data.zonecode,
            address1: data.address,
          }));
        },
      }).open();
    };
    document.body.appendChild(script);
  };

  const coverName = (value) => {
    if (!value) return '';

    const atIndex = value.indexOf('@');
    if (atIndex === -1) {
      // 이메일 형식이 아닌 경우
      if (value.length <= 7) {
        // 문자열 길이가 7 이하인 경우 전체를 마스킹하지 않고 일부만 보여줌
        return value.replace(/.(?=.{1,}$)/g, '*'); // 첫 글자를 제외한 모든 문자를 '*'로 처리
      } else {
        // 문자열 길이가 5 이상인 경우 첫 1글자 + 마지막 2글자를 제외하고 나머지를 '*'로 처리
        const visiblePart = value.slice(0, 2) + '*'.repeat(value.length - 7);
        return visiblePart + value.slice(-2);
      }
    }

    // 이메일인 경우
    const maskedPart = value.slice(1, atIndex).replace(/./g, '*');
    return value[0] + maskedPart + value.slice(atIndex);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', marginTop: isMobile ? '0' : '10px' }}>
      <Container align="center">
        {/* 상단 */}
        <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '16px' : '0' }}>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" color="primary" sx={{ fontSize: isMobile ? '1.4rem' : '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
              북두칠성
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" sx={{ fontSize: isMobile ? '1rem' : 'h6' }}>
              회원정보
            </Typography>
          </Grid>
          {isMobile ? (
            <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
              <Button variant="contained" color="secondary" onClick={() => navigate('/')} sx={{ fontSize: '0.8rem', padding: '6px 12px', marginLeft: '7px' }}>
                메인페이지
              </Button>
            </Grid>
          ) : (
            <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate('/');
                  dispatch(userActions.logout());
                }}>
                로그아웃
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/mypage')}
                sx={{ fontSize: '0.8rem', padding: '6px 12px', marginLeft: '7px' }}>
                마이페이지
              </Button>
            </Grid>
          )}
        </Grid>

        {/* 하단 */}
        <Grid mt={isMobile ? 2 : 3} p={isMobile ? 2 : 7} border={1} borderRadius={1} borderColor="grey.200" bgcolor="#ffffff">
          {openSensitive ? (
            ''
          ) : (
            <Grid p={1} mb={3} border={1} borderRadius={1} borderColor="grey.200" bgcolor="#f8f9fa" container justifyContent="space-around" alignItems="center">
              <Grid align="left">
                <Typography variant="subtitle2">* 표시로 가려져 보이는 정보를 확인 및 수정하시려면 [숨은 정보 해제] 버튼을 눌러주시기 바랍니다.</Typography>
              </Grid>
              <Button variant="contained" color="secondary" onClick={handleSensitiveInfoToggle}>
                {sensitiveInfo ? '숨은 정보 숨기기' : '숨은 정보 해제'}
              </Button>
            </Grid>
          )}

          <Typography variant="h6" align="left" mb={2}>
            전체정보
          </Typography>
          <Box border={1} borderRadius={1} borderColor="grey.200">
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>이메일</TableCell>
                    <TableCell>
                      <TextField fullWidth value={sensitiveInfo ? user?.email : coverName(user?.email)} InputProps={{ readOnly: true }} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                          <TextField fullWidth value={sensitiveInfo ? user?.userName : coverName(user?.userName)} InputProps={{ readOnly: true }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2">
                            * 이름을 변경하시려면 북두칠성으로
                            <Link href="/contact" color="primary">
                              1:1 문의
                            </Link>
                            를 주시기 바랍니다.
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>비밀번호</TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPasswordToggle}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="비밀번호"
                          name="password"
                          value={userInfo.password}
                          onChange={handleUserInfoChange}
                        />
                      </FormControl>
                      {openSensitive ? (
                        ''
                      ) : (
                        <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={handleInfoChange}>
                          비밀번호 변경
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>주소</TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField fullWidth label="우편번호" name="zipCode" value={userInfo.zipCode} onChange={handleUserInfoChange} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                          <Button variant="contained" color="primary" onClick={handlePostcode} sx={{ height: '56px' }}>
                            주소찾기
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                          <TextField
                            fullWidth
                            label="주소"
                            name="address1"
                            value={userInfo.address1 === '' ? user?.address : userInfo.address1}
                            onChange={handleUserInfoChange}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                          <TextField fullWidth label="상세 주소" name="address2" value={userInfo.address2} onChange={handleUserInfoChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">정확하고 빠른 배송을 위해 입력된 주소를 확인하시고 업데이트해 주시기 바랍니다.</Typography>
                        </Grid>
                      </Grid>
                      {openSensitive ? (
                        ''
                      ) : (
                        <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={handleInfoChange}>
                          주소 변경
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>전화번호</TableCell>
                    <TableCell>
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <TextField fullWidth label="전화번호" name="phone" value={userInfo.phone} onChange={handleUserInfoChange} />
                        </Grid>
                        {openSensitive ? (
                          ''
                        ) : (
                          <Grid item xs={3}>
                            <Button variant="contained" color="secondary" onClick={handleInfoChange}>
                              수정
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid mt={5} sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleInfoChange}>
            회원정보 수정
          </Button>
        </Grid>

        <Typography sx={{ mt: 1, textAlign: 'center' }} variant="body2">
          Copyright © BOOKDO7STARS Corp. All Rights Reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default UserInfoPage;

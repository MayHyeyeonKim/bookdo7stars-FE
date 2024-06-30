import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Grid,
  Link,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';

const PasswordConfirmPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!user) {
      dispatch(userActions.loginWithToken());
    }
  }, [dispatch]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoToLogout = () => {
    navigate('/');
    dispatch(userActions.logout());
  };
  const handleGoToMyPage = () => {
    navigate('/mypage');
  };
  const handleGoToMain = () => {
    navigate('/');
  };

  const handleConfirmPassword = () => {
    dispatch(userActions.confirmPassword(password, navigate));
  };
  const onCheckEnter = (event) => {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      handleConfirmPassword();
    }
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
              비밀번호 재확인
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
        <Grid sx={{ mt: 3, justifyContent: 'center' }}>
          <Box p={isMobile ? 3 : 8} border={1} borderRadius={1} borderColor="grey.400" sx={{ backgroundColor: '#ffffff', width: isMobile ? '100%' : 'auto' }}>
            <Typography variant="subtitle2" mb={2}>
              개인정보보호를 위해 회원님의 비밀번호를 다시 한번 확인합니다.
            </Typography>

            <Box>
              <Box p={3} width={isMobile ? '100%' : '500px'} border={1} borderRadius={1} borderColor="grey.200" sx={{ backgroundColor: '#f8f9fa' }}>
                <Grid>
                  <Grid>
                    <TextField disabled id="outlined-disabled" label={user?.email} type="Email" sx={{ width: '100%', backgroundColor: '#ffffff' }} />
                  </Grid>
                  <FormControl sx={{ mt: 1, width: '100%', backgroundColor: '#ffffff' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onKeyPress={onCheckEnter}
                      label="Password"
                    />
                    <Button
                      sx={{ mt: 2, width: '100%', height: '47px' }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => handleConfirmPassword()}>
                      확인
                    </Button>
                  </FormControl>
                  {error && <Typography color="error">{error}</Typography>}
                </Grid>
              </Box>

              <Typography
                sx={{
                  mt: 2,
                  width: isMobile ? '100%' : '60ch',
                  textAlign: isMobile ? 'center' : 'left',
                }}
                variant="subtitle2">
                {' '}
                외부 연동 계정을 통해 북두칠성에 회원가입하신 경우,
                <Link href="/contact" color="primary">
                  1:1 문의
                </Link>
                를 통해 비밀번호를 확인 후 이용해주시기 바랍니다.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Typography sx={{ mt: 1, textAlign: 'center' }} variant="body2">
          Copyright © BOOKDO7STARS Corp. All Rights Reserved.
        </Typography>
      </Container>
    </div>
  );
};

export default PasswordConfirmPage;

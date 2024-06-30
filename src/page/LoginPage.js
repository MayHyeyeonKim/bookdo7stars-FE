import React, { useEffect, useState } from 'react';
import { Container, Grid, FormControl, Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import GitHubIcon from '@mui/icons-material/GitHub';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset errors
    setEmailError(false);
    setPasswordError(false);

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    }

    if (password === '') {
      setPasswordError(true);
    }
    const payload = { email, password };
    if (emailError || passwordError) {
      return;
    } else {
      dispatch(userActions.loginWithEmail(payload));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (googleData) => dispatch(userActions.loginWithGoogle(googleData.access_token)),
  });

  const handleKakaoLogin = () => {
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const REDIRECT_KAKAO_CALLBACK = process.env.REACT_APP_REDIRECT_KAKAO_CALLBACK;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_KAKAO_CALLBACK}&scope=profile_nickname`;
  };

  const handleGithubLogin = () => {
    const REDIRECT_GITHUB_CALLBACK = process.env.REACT_APP_REDIRECT_GITHUB_CALLBACK;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_GITHUB_CALLBACK}`;
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box
        sx={{
          width: '100%',
          marginTop: '40px',
          marginBottom: '40px',
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          textAlign: 'center',
          borderRadius: '9px',
        }}>
        <Typography variant="h6">북두칠성 서점에 오신 것을 환영합니다.</Typography>
      </Box>
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 }, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: { md: 5, xs: 0 }, marginTop: 0 }}>
            <img style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} src="/image/login.png" alt="Login Illustration" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 3,
              p: 3,
              borderRadius: 2,
              width: '100%',
              maxWidth: '400px',
            }}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  helperText={emailError ? 'Please enter a valid email address.' : ''}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  helperText={passwordError ? 'Please enter your password.' : ''}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} onClick={() => navigate('/register')}>
                Go to Register
              </Button>
              <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
                Sign in with Google
              </Button>
              <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GitHubIcon />} onClick={handleGithubLogin}>
                Sign in with GitHub
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mt: 1, mb: 2 }}
                startIcon={<img width="31" height="31" src="/image/kakao2.png" alt="KaKao" />}
                onClick={handleKakaoLogin}>
                Sign in with KaKao
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          marginTop: '40px',
          marginBottom: '40px',
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          textAlign: 'center',
          borderRadius: '9px',
        }}>
        <Typography variant="body1">Need help? Contact us at support@example.com</Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;

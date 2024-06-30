import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, TextField, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [policy, setPolicy] = useState(false);
  const [policyError, setPolicyError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error === 'User already exists') {
      setUserExistsError(true);
    } else {
      setUserExistsError(false);
    }
  }, [error]);

  const handlePolicyChange = (event) => {
    setPolicy(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset errors
    setUserNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPolicyError(false);
    setUserExistsError(false);

    // Validation
    const userNameRegex = /^[a-zA-Z가-힣\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userNameRegex.test(userName)) {
      setUserNameError(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    if (!password || !confirmPassword) {
      setPasswordError(true);
      return;
    }

    if (!policy) {
      setPolicyError(true);
      return;
    }

    const payload = { userName, email, password, address, phone, policy };
    dispatch(userActions.registerUser(payload, navigate));
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: 4 }}>
      <Box
        sx={{
          width: '100%',
          marginTop: '18px',
          marginBottom: '40px',
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          borderRadius: '9px',
        }}
      />
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} src="/image/register.png" alt="Register Illustration" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 3,
              p: 4,
              borderRadius: 2,
              width: '100%',
              maxWidth: '400px',
            }}>
            <Typography component="h1" variant="h5" gutterBottom>
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="username"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                error={userNameError}
                helperText={userNameError ? 'User name must contain only letters, spaces, and hyphens.' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError || userExistsError}
                helperText={emailError ? 'Email is not valid.' : userExistsError ? 'User already exists.' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Passwords don't match." : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Passwords don't match." : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Address (Optional)"
                name="address"
                autoComplete="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="Phone (Optional)"
                type="tel"
                id="phone"
                autoComplete="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={<Checkbox name="policy" checked={policy} onChange={handlePolicyChange} color="primary" />}
                label="I agree to the terms and conditions."
                sx={{ mt: 2 }}
              />
              {policyError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  You must agree to the terms and conditions.
                </Typography>
              )}
              {userExistsError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  User already exists.
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          borderRadius: 1,
          mt: 3,
          p: 2,
        }}>
        <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;

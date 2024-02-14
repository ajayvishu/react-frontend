import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      setLoading(true);

      // Delay the login attempt for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      const BASE_URL = process.env.REACT_APP_BASEURL;

      const response = await axios.post(BASE_URL + '/userlogin', {
        username: username,
        password: password,
      });

      if (response.data.message === 'success') {
        localStorage.setItem('ModernizeToken', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Stack>
        {error && (
          <Alert severity="error" sx={{ width: '100%', textAlign: 'center' }}>
            {error}
          </Alert>
        )}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
              }
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading && <CircularProgress />}
        {!loading && (
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSignIn}
            disabled={loading}
          >
            Sign In
          </Button>
        )}
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthLogin;

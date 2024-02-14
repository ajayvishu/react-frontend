import React, { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import ApiService from 'src/ApiService';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!username) {
        setError('Username are required.');
        return;
      } else if (!password) {
        setError('Password are required.');
        return;
      } else if (!emailaddress) {
        setError('Email address are required.');
        return;
      }

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await ApiService.post('userregister', {
        username: username,
        password: password,
        emailaddress: emailaddress,
      });

      if (response.status === 200) {
        navigate('/auth/login');
        console.log('successfully register');
      } else {
        setError('something went to wrong!');
      }
    } catch (error) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Stack>
          {error && (
            <Alert severity="error" sx={{ width: '100%', textAlign: 'center' }}>
              {error}
            </Alert>
          )}
          <Box>
            <Stack mb={3}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Name
              </Typography>
              <CustomTextField
                id="username"
                variant="outlined"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />

              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="email"
                mb="5px"
                mt="25px"
              >
                Email Address
              </Typography>
              <CustomTextField
                id="emailaddress"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmailaddress(e.target.value)}
              />

              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
                mt="25px"
              >
                Password
              </Typography>
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            {loading && <CircularProgress />}
            {!loading && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                onClick={handleSignUp}
                //to="/auth/login"
              >
                Sign Up
              </Button>
            )}
          </Box>
          {subtitle}
        </Stack>
      </Box>
    </>
  );
};

export default AuthRegister;

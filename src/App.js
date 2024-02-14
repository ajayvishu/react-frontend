import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes, useNavigate } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from './theme/DefaultColors';

function App() {
  const navigate = useNavigate();
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  
  useEffect(() => {
    const token = localStorage.getItem('ModernizeToken');
    const currentPath = window.location.pathname;

    if(currentPath === '/auth/register'){
      navigate(currentPath);
      return;
    }

    if (token === null || token === '') {
      // Redirect to login if token is null
      navigate('/auth/login');
    }else{
      navigate('dashboard')
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;

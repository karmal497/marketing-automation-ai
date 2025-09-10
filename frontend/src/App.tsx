import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import SplashScreen from './components/SplashScreen/SplashScreen';
import Dashboard from './components/Dashboard/Dashboard';
import CampaignList from './components/Campaigns/CampaignList';
import CreateCampaign from './components/Campaigns/CreateCampaign';

// Types
import { Campaign } from './types';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  if (showSplash) {
    return (
      <Router>
        <SplashScreen />
      </Router>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route 
              path="/dashboard" 
              element={<Dashboard onLogout={handleLogout} />} 
            />
            <Route 
              path="/campaigns" 
              element={<CampaignList />} 
            />
            <Route 
              path="/campaigns/create" 
              element={<CreateCampaign />} 
            />
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
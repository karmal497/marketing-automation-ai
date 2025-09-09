import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container
} from '@mui/material';
import { apiClient } from '../api/client';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@marketing.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/token', {
        username: email,
        password: password
      });
      
      localStorage.setItem('authToken', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Marketing Automation
        </Typography>
        <Typography variant="h6" align="center" gutterBottom color="textSecondary">
          Iniciar Sesión
        </Typography>
        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        
        <Typography variant="body2" align="center" color="textSecondary">
          Usuario: admin@marketing.com / Password: admin123
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
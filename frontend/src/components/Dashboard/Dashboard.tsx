import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const stats = [
    { title: 'Total Campaigns', value: '12', icon: <CampaignIcon />, color: '#1976d2' },
    { title: 'Active Campaigns', value: '5', icon: <AnalyticsIcon />, color: '#2e7d32' },
    { title: 'Total Audience', value: '24.5K', icon: <PeopleIcon />, color: '#ed6c02' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Marketing Automation Dashboard
          </Typography>
          
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Stats Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(33.333% - 16px)' }, minWidth: 250 }}>
              <Card 
                elevation={3} 
                sx={{ 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      borderRadius: '50%',
                      p: 2,
                      mb: 2,
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { fontSize: 30 } })}
                  </Box>
                  <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Quick Actions and AI Assistant */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' }, minWidth: 300 }}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                p: 3,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                height: '100%'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<CampaignIcon />}
                  onClick={() => navigate('/campaigns')}
                  sx={{ 
                    mr: 2, 
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  View Campaigns
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CampaignIcon />}
                  onClick={() => navigate('/campaigns/create')}
                  sx={{ 
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  Create Campaign
                </Button>
              </Box>
            </Card>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' }, minWidth: 300 }}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                p: 3,
                background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                color: 'white',
                height: '100%'
              }}
            >
              <Typography variant="h6" gutterBottom>
                AI Marketing Assistant
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Our AI engine is ready to help you create compelling marketing campaigns. 
                Generate content, optimize strategies, and analyze results with the power of AI.
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Campaigns',
      icon: <CampaignIcon />,
      path: '/campaigns',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Marketing Automation AI
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'action.selected' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      color: isSelected ? 'primary.main' : 'text.primary',
                      fontWeight: isSelected ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
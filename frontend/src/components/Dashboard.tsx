import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { apiClient } from '../api/client';

interface DashboardMetrics {
  total_events: number;
  total_opens: number;
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
}

const Dashboard: React.FC = () => {
  const { data: metrics, isLoading, error } = useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/metrics/summary');
      return response.data;
    },
  });

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Error loading dashboard</div>;

  const metricCards = [
    {
      title: 'Total Events',
      value: metrics?.total_events || 0,
      icon: <CampaignIcon />,
      color: '#1976d2',
    },
    {
      title: 'Email Opens',
      value: metrics?.total_opens || 0,
      icon: <EmailIcon />,
      color: '#2e7d32',
    },
    {
      title: 'Clicks',
      value: metrics?.total_clicks || 0,
      icon: <PeopleIcon />,
      color: '#ed6c02',
    },
    {
      title: 'Revenue',
      value: `$${(metrics?.total_revenue || 0).toFixed(2)}`,
      icon: <MoneyIcon />,
      color: '#d32f2f',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Marketing Dashboard
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {metricCards.map((card, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: card.color, mr: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ color: card.color }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
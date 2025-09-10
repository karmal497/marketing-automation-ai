import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Chip,
  Card,
  CardContent,
  Typography,
  Slide,
  Fade
} from '@mui/material';
import {
  Add as AddIcon,
  AutoAwesome as AutoAwesomeIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Campaign } from '../../types';
import { apiClient } from '../../api/client';

const CampaignList: React.FC = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const { data: campaigns, isLoading, error, refetch } = useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await apiClient.get('/campaigns');
      return response.data;
    },
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'success';
      case 'draft': return 'default';
      case 'scheduled': return 'info';
      case 'paused': return 'warning';
      case 'completed': return 'secondary';
      default: return 'default';
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaigns</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Fade in={true} timeout={500}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Marketing Campaigns
          </Typography>
          
          <Box>
            <IconButton 
              onClick={handleRefresh} 
              disabled={refreshing}
              sx={{ 
                mr: 2,
                transition: 'transform 0.3s ease',
                transform: refreshing ? 'rotate(360deg)' : 'none'
              }}
            >
              <RefreshIcon />
            </IconButton>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/campaigns/create')}
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 3,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                }
              }}
            >
              New Campaign
            </Button>
          </Box>
        </Box>
      </Fade>

      {campaigns?.length === 0 ? (
        <Fade in={true} timeout={700}>
          <Box 
            textAlign="center" 
            py={10} 
            sx={{ 
              background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="textSecondary">
              No campaigns yet
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Create your first marketing campaign to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/campaigns/create')}
              size="large"
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              }}
            >
              Create Your First Campaign
            </Button>
          </Box>
        </Fade>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {campaigns?.map((campaign, index) => (
            <Box key={campaign.id} sx={{ width: { xs: '100%', md: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' }, minWidth: 300 }}>
              <Slide in={true} direction="up" timeout={(index + 1) * 100}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3" fontWeight="bold">
                        {campaign.name}
                      </Typography>
                      <Chip 
                        label={campaign.status} 
                        color={getStatusColor(campaign.status) as any}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {campaign.description}
                    </Typography>
                    
                    <Box mt={2}>
                      <Typography variant="caption" color="textSecondary">
                        Target: {campaign.target_segment}
                      </Typography>
                    </Box>
                    
                    {campaign.schedule_time && (
                      <Box mt={1}>
                        <Typography variant="caption" color="textSecondary">
                          Scheduled: {new Date(campaign.schedule_time).toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Slide>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CampaignList;
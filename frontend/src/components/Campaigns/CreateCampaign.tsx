import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Fade,
  Slide,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AutoAwesome as AutoAwesomeIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { apiClient } from '../../api/client';
import { Campaign } from '../../types';

interface CreateCampaignProps {
  onCampaignCreated?: (campaign: Campaign) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onCampaignCreated }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_segment: '',
    status: 'draft' as 'draft' | 'scheduled' | 'running' | 'completed' | 'paused',
    schedule_time: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateAIContent = async () => {
    if (!formData.name && !formData.target_segment) {
      setError('Please provide at least a campaign name and target segment for AI generation');
      return;
    }

    setAiGenerating(true);
    setError('');

    try {
      const prompt = `Create a marketing campaign for ${formData.name} targeting ${formData.target_segment}. 
      Generate a compelling description and strategy.`;
      
      const response = await apiClient.post('/ai/generate-content', {
        prompt: prompt,
        model: "gpt-4",
        temperature: 0.8,
        max_tokens: 500
      });

      setFormData({
        ...formData,
        description: response.data.content
      });
    } catch (error: any) {
      console.error('AI generation failed:', error);
      setError('Failed to generate AI content. Please try again.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post('/campaigns/', formData);
      
      setSuccess('Campaign created successfully!');
      
      if (onCampaignCreated) {
        onCampaignCreated(response.data);
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/campaigns');
      }, 1500);
    } catch (error: any) {
      console.error('Campaign creation failed:', error);
      setError(error.response?.data?.detail || 'Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Fade in={true} timeout={500}>
        <Box>
          <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={() => navigate('/campaigns')} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Create New Campaign
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: 'calc(66.666% - 16px)' } }}>
              <Slide in={true} direction="up" timeout={600}>
                <Paper 
                  elevation={4} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  }}
                >
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {success}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Campaign Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      margin="normal"
                      variant="outlined"
                    />
                    
                    <TextField
                      fullWidth
                      label="Target Segment"
                      name="target_segment"
                      value={formData.target_segment}
                      onChange={handleChange}
                      required
                      margin="normal"
                      variant="outlined"
                      helperText="Define the target audience for this campaign"
                    />
                    
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={4}
                      helperText="Describe the purpose and strategy of this campaign"
                    />
                    
                    <Box display="flex" gap={2} alignItems="center" mt={2} mb={3}>
                      <Button
                        variant="outlined"
                        startIcon={<AutoAwesomeIcon />}
                        onClick={generateAIContent}
                        disabled={aiGenerating}
                        sx={{
                          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #e55a2a, #e08419)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(247, 147, 30, 0.4)',
                          }
                        }}
                      >
                        {aiGenerating ? 'Generating...' : 'AI Generate Content'}
                      </Button>
                      
                      <Typography variant="body2" color="textSecondary">
                        Let AI help you create compelling campaign content
                      </Typography>
                    </Box>
                    
                    <TextField
                      fullWidth
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      select
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="running">Running</MenuItem>
                      <MenuItem value="paused">Paused</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </TextField>
                    
                    <TextField
                      fullWidth
                      label="Schedule Time"
                      name="schedule_time"
                      type="datetime-local"
                      value={formData.schedule_time}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    
                    <Box mt={4} display="flex" gap={2}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/campaigns')}
                        sx={{ borderRadius: 2 }}
                      >
                        Cancel
                      </Button>
                      
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                        sx={{ 
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                          boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                          }
                        }}
                      >
                        {isLoading ? 'Creating...' : 'Create Campaign'}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Slide>
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: 'calc(33.333% - 16px)' } }}>
              <Slide in={true} direction="up" timeout={800}>
                <Box>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      mb: 3, 
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white'
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        💡 Campaign Tips
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        • Use clear, descriptive names for your campaigns
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        • Define specific target segments for better results
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        • Utilize AI to generate compelling content
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        • Set appropriate status based on your campaign stage
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    elevation={4} 
                    sx={{ 
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                      color: 'white'
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        🚀 AI Power
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Our AI engine can help you create engaging marketing content tailored to your target audience, 
                        increasing conversion rates and campaign effectiveness.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Slide>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default CreateCampaign;